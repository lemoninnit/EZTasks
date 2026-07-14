-- ============================================
-- COPY AND PASTE THIS ENTIRE BLOCK INTO MYSQL WORKBENCH
-- Then click the Execute button (lightning bolt)
-- IGNORE ANY ERRORS - just run all of it
-- ============================================

USE eztasks;

-- Step 1: Show what indexes exist (so we can see what to remove)
SHOW INDEX FROM categories;

-- Step 2: Try to remove bad constraints (you'll get errors - THAT'S OK!)
-- Just run all of these, errors are fine
ALTER TABLE categories DROP INDEX name;
ALTER TABLE categories DROP INDEX UK_categories_name;
ALTER TABLE categories DROP INDEX categories_name_uk;
ALTER TABLE categories DROP INDEX UK_name;

-- Step 3: Add the CORRECT constraint (this is what we need)
ALTER TABLE categories ADD CONSTRAINT UK_categories_user_name UNIQUE (user_id, name);

-- Step 4: Check it worked
SHOW INDEX FROM categories;
