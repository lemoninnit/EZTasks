-- ============================================
-- SIMPLE SCRIPT TO CHECK AND FIX CATEGORIES
-- ============================================
-- Just copy and paste this ENTIRE block into MySQL Workbench and click Execute
-- ============================================

USE eztasks;

-- Step 1: Show me what constraints exist RIGHT NOW
SHOW CREATE TABLE categories;

-- Step 2: Try to find and drop ANY constraint on just the 'name' column
-- (This is the bad one that prevents different users from having same category names)

-- Check what indexes exist
SHOW INDEX FROM categories;

-- Try to drop the bad constraint (ignore errors if it doesn't exist)
ALTER TABLE categories DROP INDEX name;
ALTER TABLE categories DROP INDEX UK_categories_name;

-- Step 3: Make sure the good constraint exists (user_id + name together)
-- The warning you saw means it already exists, which is GOOD!
ALTER TABLE categories 
ADD CONSTRAINT UK_categories_user_name UNIQUE (user_id, name);

-- Step 4: Show the final result
SHOW CREATE TABLE categories;
