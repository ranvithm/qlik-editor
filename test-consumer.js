// Test script to verify package can be consumed properly
// Run with: node test-consumer.js

import { readFileSync } from 'fs';
import { resolve } from 'path';

console.log('🧪 Testing qlik-script-editor package consumption...\n');

// Test 1: Check if package.json is valid
try {
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
  console.log('✅ package.json is valid');
  console.log(`   - Name: ${packageJson.name}`);
  console.log(`   - Version: ${packageJson.version}`);
  console.log(`   - Main: ${packageJson.main}`);
  console.log(`   - Module: ${packageJson.module}`);
  console.log(`   - Types: ${packageJson.types}`);
} catch (error) {
  console.log('❌ package.json is invalid:', error.message);
}

// Test 2: Check if built files exist
import { existsSync } from 'fs';

const requiredFiles = [
  'dist/index.es.js',
  'dist/index.cjs.js', 
  'dist/index.d.ts',
  'dist/style.css'
];

requiredFiles.forEach(file => {
  if (existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Test 3: Test ES Module import
try {
  const esModule = await import('./dist/index.es.js');
  console.log(`✅ ES Module import successful`);
  console.log(`   - Exports: ${Object.keys(esModule).length} items`);
  console.log(`   - Main exports: ${Object.keys(esModule).slice(0, 5).join(', ')}...`);
} catch (error) {
  console.log('❌ ES Module import failed:', error.message);
}

// Test 4: Test CommonJS require
try {
  const cjsModule = await import('./dist/index.cjs.js');
  console.log(`✅ CommonJS import successful`);
} catch (error) {
  console.log('❌ CommonJS import failed:', error.message);
}

// Test 5: Check bundle size
try {
  const stats = await import('fs').then(fs => fs.statSync('./dist/index.es.js'));
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`📦 Bundle size: ${sizeKB}KB`);
  
  if (sizeKB > 100) {
    console.log('⚠️  Bundle size is quite large, consider optimizing');
  } else {
    console.log('✅ Bundle size is reasonable');
  }
} catch (error) {
  console.log('❌ Could not check bundle size:', error.message);
}

console.log('\n🎉 Package consumption test completed!');