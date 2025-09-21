#!/usr/bin/env node

/**
 * Smoke Test for Fit Map Voyage
 * 
 * This script performs basic functionality checks to ensure
 * the application builds and core features work correctly.
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🏃‍♂️ Starting Fit Map Voyage Smoke Test...\n');

let testsPassed = 0;
let testsFailed = 0;

function logTest(name, passed, message = '') {
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}${message ? ` - ${message}` : ''}`);
  
  if (passed) {
    testsPassed++;
  } else {
    testsFailed++;
  }
}

// Test 1: Check if package.json exists and has required fields
function testPackageJson() {
  try {
    const packageJsonPath = join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const requiredFields = ['name', 'version', 'scripts', 'dependencies'];
    const hasAllFields = requiredFields.every(field => packageJson[field]);
    
    logTest('Package.json structure', hasAllFields);
    
    // Check specific scripts
    const requiredScripts = ['dev', 'build', 'preview'];
    const hasAllScripts = requiredScripts.every(script => packageJson.scripts[script]);
    
    logTest('Required npm scripts', hasAllScripts);
    
    return hasAllFields && hasAllScripts;
  } catch (error) {
    logTest('Package.json structure', false, error.message);
    return false;
  }
}

// Test 2: Check if critical files exist
function testCriticalFiles() {
  const criticalFiles = [
    'index.html',
    'src/main.tsx',
    'src/App.tsx',
    'src/pages/Index.tsx',
    'src/index.css',
    'tailwind.config.ts',
    'vite.config.ts',
    'tsconfig.json'
  ];
  
  let allFilesExist = true;
  
  criticalFiles.forEach(filePath => {
    const fullPath = join(projectRoot, filePath);
    const exists = fs.existsSync(fullPath);
    
    if (!exists) {
      allFilesExist = false;
    }
    
    logTest(`File exists: ${filePath}`, exists);
  });
  
  return allFilesExist;
}

// Test 3: Check TypeScript compilation
function testTypeScriptCompilation() {
  return new Promise((resolve) => {
    console.log('\n📝 Running TypeScript type check...');
    
    const tsc = spawn('npx', ['tsc', '--noEmit'], {
      cwd: projectRoot,
      stdio: 'pipe'
    });
    
    let output = '';
    let error = '';
    
    tsc.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    tsc.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    tsc.on('close', (code) => {
      const passed = code === 0;
      logTest('TypeScript compilation', passed, passed ? 'No type errors' : 'Type errors found');
      
      if (!passed && error) {
        console.log('TypeScript errors:', error);
      }
      
      resolve(passed);
    });
  });
}

// Test 4: Check if build process works
function testBuildProcess() {
  return new Promise((resolve) => {
    console.log('\n🏗️  Testing build process...');
    
    const build = spawn('npm', ['run', 'build'], {
      cwd: projectRoot,
      stdio: 'pipe'
    });
    
    let output = '';
    let error = '';
    
    build.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    build.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    build.on('close', (code) => {
      const passed = code === 0;
      logTest('Build process', passed, passed ? 'Build successful' : 'Build failed');
      
      if (passed) {
        // Check if dist folder was created
        const distExists = fs.existsSync(join(projectRoot, 'dist'));
        logTest('Dist folder created', distExists);
        
        if (distExists) {
          // Check if index.html exists in dist
          const indexExists = fs.existsSync(join(projectRoot, 'dist', 'index.html'));
          logTest('Built index.html exists', indexExists);
        }
      } else if (error) {
        console.log('Build errors:', error);
      }
      
      resolve(passed);
    });
  });
}

// Test 5: Check component imports and structure
function testComponentStructure() {
  try {
    const mainTsxPath = join(projectRoot, 'src', 'main.tsx');
    const appTsxPath = join(projectRoot, 'src', 'App.tsx');
    const indexTsxPath = join(projectRoot, 'src', 'pages', 'Index.tsx');
    
    const mainContent = fs.readFileSync(mainTsxPath, 'utf8');
    const appContent = fs.readFileSync(appTsxPath, 'utf8');
    const indexContent = fs.readFileSync(indexTsxPath, 'utf8');
    
    // Check if main.tsx imports App correctly
    const mainImportsApp = mainContent.includes('import App') && mainContent.includes('<App />');
    logTest('Main.tsx imports App', mainImportsApp);
    
    // Check if App.tsx has routing setup
    const appHasRouting = appContent.includes('BrowserRouter') && appContent.includes('Routes');
    logTest('App.tsx has routing', appHasRouting);
    
    // Check if Index page has core components
    const indexHasComponents = indexContent.includes('AppHeader') && indexContent.includes('BottomNavigation');
    logTest('Index page has core components', indexHasComponents);
    
    return mainImportsApp && appHasRouting && indexHasComponents;
  } catch (error) {
    logTest('Component structure check', false, error.message);
    return false;
  }
}

// Test 6: Check local storage functionality (simulate)
function testLocalStorageSimulation() {
  try {
    // This is a basic check to ensure localStorage-related code won't crash
    const indexContent = fs.readFileSync(join(projectRoot, 'src', 'pages', 'Index.tsx'), 'utf8');
    
    // Check if localStorage is used properly (basic syntax check)
    const hasLocalStorageUsage = indexContent.includes('localStorage.getItem') && 
                                 indexContent.includes('localStorage.setItem');
    
    logTest('LocalStorage usage found', hasLocalStorageUsage);
    
    return hasLocalStorageUsage;
  } catch (error) {
    logTest('LocalStorage check', false, error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Running file structure tests...\n');
  
  testPackageJson();
  testCriticalFiles();
  testComponentStructure();
  testLocalStorageSimulation();
  
  console.log('\nRunning compilation tests...\n');
  await testTypeScriptCompilation();
  
  console.log('\nRunning build tests...\n');
  await testBuildProcess();
  
  // Final results
  console.log('\n' + '='.repeat(50));
  console.log('🏁 Smoke Test Results:');
  console.log(`✅ Tests Passed: ${testsPassed}`);
  console.log(`❌ Tests Failed: ${testsFailed}`);
  console.log(`📊 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
  
  if (testsFailed === 0) {
    console.log('\n🎉 All smoke tests passed! Your app is ready to run.');
    console.log('\nNext steps:');
    console.log('  • Run "npm run dev" to start development server');
    console.log('  • Run "npm run build" to create production build');
    console.log('  • Run "npm run preview" to preview production build');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
    process.exit(1);
  }
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  console.error('❌ Unexpected error during smoke test:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled promise rejection:', reason);
  process.exit(1);
});

// Run the tests
runAllTests().catch((error) => {
  console.error('❌ Error running smoke tests:', error);
  process.exit(1);
});