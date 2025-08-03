/**
 * Smart Contract Deployment Script
 * 
 * This script helps deploy the NFT ticket smart contract and set up events
 * Run with: node scripts/deploy-contract.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting NFT Ticket Contract Deployment...\n');

// Check if in correct directory
const contractDir = 'contracts/ticket_nft';
if (!fs.existsSync(contractDir)) {
  console.error('❌ Contract directory not found!');
  console.error('Make sure you are in the project root directory.');
  process.exit(1);
}

try {
  console.log('📋 Step 1: Building contract...');
  process.chdir(contractDir);
  
  // Build the contract
  execSync('sui move build', { stdio: 'inherit' });
  console.log('✅ Contract built successfully!\n');

  console.log('📋 Step 2: Deploying to devnet...');
  console.log('💰 Make sure you have SUI in your wallet for gas fees!\n');
  
  // Deploy the contract
  const deployOutput = execSync('sui client publish --gas-budget 20000000', { 
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'inherit']
  });

  console.log('✅ Contract deployed successfully!\n');
  console.log('📄 Deployment output:');
  console.log(deployOutput);

  // Extract package ID and object IDs from output
  console.log('\n📝 IMPORTANT: Please update utils/contract-config.js with the following values:');
  console.log('1. Find the "Package ID" in the output above');
  console.log('2. Find the "Created Objects" section');
  console.log('3. Look for OrganizerCap and WalletTicketCount object IDs');
  console.log('\n⚠️  Save this information - you will need it!');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

// Go back to project root
process.chdir('../../');

console.log('\n🎉 Deployment Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Update utils/contract-config.js with your deployed contract IDs');
console.log('2. Create events using the create_event function');
console.log('3. Update your frontend to use real-contract-interactions.js');
console.log('4. Test with small amounts first!');
console.log('\n💡 Your smart contract is now live and will process REAL payments!');