package com.appdevg6.yinandyang.claritask.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

/**
 * This class automatically fixes the category table constraint on startup
 * Run this once by starting your Spring Boot application
 */
@Component
public class FixCategoryConstraint {
    
    @Autowired(required = false)
    private JdbcTemplate jdbcTemplate;
    
    @PostConstruct
    public void fixConstraint() {
        if (jdbcTemplate == null) {
            System.out.println("JdbcTemplate not available, skipping constraint fix");
            return;
        }
        
        try {
            String dbName = jdbcTemplate.execute((org.springframework.jdbc.core.ConnectionCallback<String>) connection -> connection.getMetaData().getDatabaseProductName());
            System.out.println("Database product name: " + dbName);
            
            if (dbName == null || !dbName.toLowerCase().contains("mysql")) {
                System.out.println("Not using MySQL, skipping MySQL-specific category constraint fix.");
                return;
            }
            
            System.out.println("Checking category table constraints...");
            
            // Get all indexes on the categories table
            String sql = "SHOW INDEX FROM categories WHERE Key_name != 'PRIMARY'";
            List<Map<String, Object>> indexes = jdbcTemplate.queryForList(sql);
            
            // Find and drop any unique constraint on just 'name'
            boolean droppedAny = false;
            for (Map<String, Object> index : indexes) {
                String keyName = (String) index.get("Key_name");
                String columnName = (String) index.get("Column_name");
                
                // If there's a unique index on just 'name' (not user_id), drop it
                if (columnName != null && columnName.equals("name")) {
                    long nonUnique = ((Number) index.get("Non_unique")).longValue();
                    if (nonUnique == 0) { // 0 means unique
                        System.out.println("Found bad constraint: " + keyName + " on column 'name' - dropping it...");
                        try {
                            jdbcTemplate.execute("ALTER TABLE categories DROP INDEX `" + keyName + "`");
                            System.out.println("Successfully dropped constraint: " + keyName);
                            droppedAny = true;
                        } catch (Exception e) {
                            System.out.println("Could not drop constraint " + keyName + ": " + e.getMessage());
                        }
                    }
                }
            }
            
            // Refresh indexes after dropping (if we dropped any)
            if (droppedAny) {
                indexes = jdbcTemplate.queryForList(sql);
            }
            
            // Check if the correct constraint exists
            boolean correctConstraintExists = false;
            for (Map<String, Object> index : indexes) {
                String keyName = (String) index.get("Key_name");
                if (keyName != null && keyName.equals("UK_categories_user_name")) {
                    correctConstraintExists = true;
                    break;
                }
            }
            
            // Add the correct constraint if it doesn't exist
            if (!correctConstraintExists) {
                System.out.println("Adding correct constraint: UK_categories_user_name on (user_id, name)...");
                try {
                    jdbcTemplate.execute("ALTER TABLE categories ADD CONSTRAINT UK_categories_user_name UNIQUE (user_id, name)");
                    System.out.println("Successfully added correct constraint!");
                } catch (Exception e) {
                    System.out.println("Could not add constraint (might already exist): " + e.getMessage());
                }
            } else {
                System.out.println("Correct constraint already exists!");
            }
            
            System.out.println("Category constraint fix completed!");
            
        } catch (Exception e) {
            System.err.println("Error fixing category constraint: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
