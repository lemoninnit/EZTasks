package com.appdevg6.yinandyang.claritask.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Automatically fixes the categories table constraint on application startup.
 * This allows different users to have categories with the same name.
 */
@Component
@Order(1) // Run early on startup
public class DatabaseFixer {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void fixCategoryConstraints() {
        try {
            String dbName = jdbcTemplate.execute((org.springframework.jdbc.core.ConnectionCallback<String>) connection -> connection.getMetaData().getDatabaseProductName());
            if (dbName == null || !dbName.toLowerCase().contains("mysql")) {
                System.out.println("Not using MySQL, skipping MySQL-specific database constraint fix in DatabaseFixer.");
                return;
            }

            // Check what indexes exist
            List<Map<String, Object>> indexes = jdbcTemplate.queryForList(
                "SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS " +
                "WHERE TABLE_SCHEMA = DATABASE() " +
                "AND TABLE_NAME = 'categories' " +
                "AND INDEX_NAME != 'PRIMARY'"
            );

            // Drop any bad constraints (unique on just 'name')
            for (Map<String, Object> index : indexes) {
                String indexName = (String) index.get("INDEX_NAME");
                // Drop if it's a bad constraint (not the composite one we want)
                if (indexName != null && 
                    (indexName.equals("name") || 
                     indexName.equals("UK_categories_name") ||
                     indexName.equals("categories_name_uk") ||
                     indexName.equals("UK_name"))) {
                    try {
                        jdbcTemplate.execute("ALTER TABLE categories DROP INDEX `" + indexName + "`");
                        System.out.println("✓ Dropped bad constraint: " + indexName);
                    } catch (Exception e) {
                        // Index doesn't exist, that's fine
                    }
                }
            }

            // Check if the good constraint exists
            boolean goodConstraintExists = false;
            for (Map<String, Object> index : indexes) {
                String indexName = (String) index.get("INDEX_NAME");
                if ("UK_categories_user_name".equals(indexName)) {
                    goodConstraintExists = true;
                    break;
                }
            }

            // Add the good constraint if it doesn't exist
            if (!goodConstraintExists) {
                try {
                    jdbcTemplate.execute(
                        "ALTER TABLE categories ADD CONSTRAINT UK_categories_user_name UNIQUE (user_id, name)"
                    );
                    System.out.println("✓ Added correct constraint: UK_categories_user_name");
                } catch (Exception e) {
                    // Constraint might already exist, that's fine
                    System.out.println("ℹ Constraint UK_categories_user_name already exists (good!)");
                }
            } else {
                System.out.println("✓ Correct constraint UK_categories_user_name already exists");
            }

            System.out.println("✓ Database constraint fix completed successfully!");
            
        } catch (Exception e) {
            System.err.println("⚠ Warning: Could not automatically fix database constraints: " + e.getMessage());
            System.err.println("   You may need to run the SQL script manually.");
        }
    }
}
