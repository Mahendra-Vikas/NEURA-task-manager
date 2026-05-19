#!/bin/bash

# UX Enhancements Verification Script
# This script verifies all UX enhancement files are in place

echo "🔍 Verifying UX Enhancements Implementation..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
FILES_CHECKED=0
FILES_OK=0

# Function to check file
check_file() {
  local file=$1
  local description=$2
  FILES_CHECKED=$((FILES_CHECKED + 1))
  
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $description"
    FILES_OK=$((FILES_OK + 1))
    return 0
  else
    echo -e "${RED}✗${NC} $description - FILE NOT FOUND: $file"
    return 1
  fi
}

# Function to check directory
check_dir() {
  local dir=$1
  local description=$2
  FILES_CHECKED=$((FILES_CHECKED + 1))
  
  if [ -d "$dir" ]; then
    echo -e "${GREEN}✓${NC} $description"
    FILES_OK=$((FILES_OK + 1))
    return 0
  else
    echo -e "${RED}✗${NC} $description - DIRECTORY NOT FOUND: $dir"
    return 1
  fi
}

echo "📁 Checking Frontend Files..."
check_file "frontend/src/components/tasks/DeleteConfirmModal.jsx" "Delete Confirmation Modal"
check_file "frontend/src/components/tasks/TaskCard.jsx" "Updated TaskCard with Edit button"
check_file "frontend/src/components/tasks/TaskModal.jsx" "Updated TaskModal with status field"
check_file "frontend/src/components/tasks/TaskList.jsx" "Updated TaskList with better UX"
check_file "frontend/src/pages/Tasks.jsx" "Updated Tasks page"
check_file "frontend/src/components/tasks/index.js" "Task components barrel export"

echo ""
echo "🔧 Checking Backend Files..."
check_file "backend/src/controllers/taskController.js" "Task controller with updateTask"
check_file "backend/src/routes/taskRoutes.js" "Task routes with PATCH endpoint"

echo ""
echo "📚 Checking Documentation..."
check_file "UX_ENHANCEMENTS.md" "UX Enhancements documentation"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Verification Results: ${GREEN}$FILES_OK/${FILES_CHECKED}${NC} checks passed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FILES_OK -eq $FILES_CHECKED ]; then
  echo -e "${GREEN}✓ All UX enhancements are properly installed!${NC}"
  echo ""
  echo "📋 Next Steps:"
  echo "  1. cd backend && npm run dev"
  echo "  2. cd frontend && npm run dev (in new terminal)"
  echo "  3. Visit http://localhost:5173"
  echo "  4. Test the new features:"
  echo "     - Create a task"
  echo "     - Hover over task card to see Edit button"
  echo "     - Click Edit to modify task and status"
  echo "     - Click Delete to see confirmation modal"
  echo "     - Use search and filters"
  exit 0
else
  echo -e "${RED}✗ Some files are missing. Check the paths and try again.${NC}"
  exit 1
fi
