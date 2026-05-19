#!/bin/bash

# Kovai Starter - Setup Verification Script

echo "🔍 Verifying Kovai Starter Project Structure..."
echo ""

# Check frontend structure
echo "✓ Frontend Structure"
test -d "frontend/src/components" && echo "  ✅ components/" || echo "  ❌ components/"
test -d "frontend/src/pages" && echo "  ✅ pages/" || echo "  ❌ pages/"
test -d "frontend/src/hooks" && echo "  ✅ hooks/" || echo "  ❌ hooks/"
test -d "frontend/src/services" && echo "  ✅ services/" || echo "  ❌ services/"
test -d "frontend/src/context" && echo "  ✅ context/" || echo "  ❌ context/"
test -f "frontend/src/App.jsx" && echo "  ✅ App.jsx" || echo "  ❌ App.jsx"
test -f "frontend/tailwind.config.js" && echo "  ✅ tailwind.config.js" || echo "  ❌ tailwind.config.js"

echo ""
echo "✓ Backend Structure"
test -d "backend/src/routes" && echo "  ✅ routes/" || echo "  ❌ routes/"
test -d "backend/src/controllers" && echo "  ✅ controllers/" || echo "  ❌ controllers/"
test -d "backend/src/models" && echo "  ✅ models/" || echo "  ❌ models/"
test -d "backend/src/middleware" && echo "  ✅ middleware/" || echo "  ❌ middleware/"
test -f "backend/src/server.js" && echo "  ✅ server.js" || echo "  ❌ server.js"
test -f "backend/src/config/database.js" && echo "  ✅ database.js" || echo "  ❌ database.js"

echo ""
echo "✓ Documentation"
test -f "README.md" && echo "  ✅ README.md" || echo "  ❌ README.md"
test -f "INSTALLATION.md" && echo "  ✅ INSTALLATION.md" || echo "  ❌ INSTALLATION.md"
test -f "ARCHITECTURE.md" && echo "  ✅ ARCHITECTURE.md" || echo "  ❌ ARCHITECTURE.md"
test -f "DEVELOPER_GUIDE.md" && echo "  ✅ DEVELOPER_GUIDE.md" || echo "  ❌ DEVELOPER_GUIDE.md"
test -f "DEPLOYMENT.md" && echo "  ✅ DEPLOYMENT.md" || echo "  ❌ DEPLOYMENT.md"
test -f "QUICK_REFERENCE.md" && echo "  ✅ QUICK_REFERENCE.md" || echo "  ❌ QUICK_REFERENCE.md"
test -f "START_HERE.md" && echo "  ✅ START_HERE.md" || echo "  ❌ START_HERE.md"

echo ""
echo "✓ Configuration Files"
test -f "frontend/package.json" && echo "  ✅ frontend/package.json" || echo "  ❌ frontend/package.json"
test -f "backend/package.json" && echo "  ✅ backend/package.json" || echo "  ❌ backend/package.json"
test -f "frontend/.env.example" && echo "  ✅ frontend/.env.example" || echo "  ❌ frontend/.env.example"
test -f "backend/.env.example" && echo "  ✅ backend/.env.example" || echo "  ❌ backend/.env.example"

echo ""
echo "🎉 Project Structure Verification Complete!"
echo ""
echo "Next Steps:"
echo "1. cd backend && npm install"
echo "2. cd ../frontend && npm install"
echo "3. Read START_HERE.md for quick start"
echo ""
