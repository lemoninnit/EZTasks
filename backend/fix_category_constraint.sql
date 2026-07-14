-- ============================================
-- FIX CATEGORY TABLE CONSTRAINT
-- ============================================
-- This script fixes the bug where different users can't create categories with the same name
-- 
-- INSTRUCTIONS:
-- 1. Make sure you're connected to the 'eztasks' database
-- 2. Copy and paste ALL the SQL commands below into MySQL Workbench
-- 3. Click the Execute button (lightning bolt icon)
-- 4. If you see any errors, that's okay - just continue
-- ============================================

USE eztasks;

-- Step 1: First, let's see what constraints currently exist
-- (This helps us understand what needs to be fixed)
SHOW CREATE TABLE categories;

-- Step 2: Drop old constraints (you might get errors if they don't exist - that's OK!)
-- Try dropping common constraint names one by one
-- If you see "Error Code: 1091. Can't DROP INDEX 'name'", that means it doesn't exist - that's fine!

ALTER TABLE categories DROP INDEX name;
ALTER TABLE categories DROP INDEX UK_categories_name;

-- Step 3: Add the correct composite constraint
-- This allows different users to have categories with the same name
ALTER TABLE categories 
ADD CONSTRAINT UK_categories_user_name UNIQUE (user_id, name);

-- Step 4: Verify it worked - you should see the new constraint in the output
SHOW CREATE TABLE categories;

-- ============================================
-- DONE! Now restart your backend and test
-- ============================================
