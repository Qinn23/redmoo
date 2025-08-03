#!/usr/bin/env node

/**
 * Smart Contract Deployment Script for Ticket NFT Platform
 * 
 * This script deploys the Move smart contract to Sui devnet
 * and sets up the necessary objects for the ticket platform.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const NETWORK = 'devnet';
const CONTRACT_PATH = './contracts/ticket_nft';
const CONFIG_FILE = './contract-config.json';

// ANSI color codes for better console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function executeCommand(command, description) {
  try {
    log(`Executing: ${command}`, 'blue');
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    return result;
  } catch (error) {
    logError(`Failed to ${description}: ${error.message}`);
    process.exit(1);
  }
}

async function checkPrerequisites() {
  logStep('1', 'Checking Prerequisites');
  
  // Check if Sui CLI is installed
  try {
    executeCommand('sui --version', 'check Sui CLI version');
    logSuccess('Sui CLI is installed');
  } catch (error) {
    logError('Sui CLI is not installed. Please install it first.');
    log('Install instructions: https://docs.sui.io/build/install', 'blue');
    process.exit(1);
  }

  // Check if we're on the correct network
  try {
    const activeEnv = executeCommand('sui client active-env', 'check active environment');
    if (!activeEnv.includes(NETWORK)) {
      logWarning(`Current environment is not ${NETWORK}. Switching...`);
      executeCommand(`sui client switch --env ${NETWORK}`, `switch to ${NETWORK}`);
      logSuccess(`Switched to ${NETWORK}`);
    } else {
      logSuccess(`Already connected to ${NETWORK}`);
    }
  } catch (error) {
    logError('Failed to check/switch Sui environment');
    process.exit(1);
  }

  // Check if wallet has gas
  try {
    const gas = executeCommand('sui client gas', 'check gas objects');
    if (gas.trim() === '' || gas.includes('No gas objects')) {
      logWarning('No gas objects found. Requesting from faucet...');
      executeCommand('sui client faucet', 'request gas from faucet');
      logSuccess('Gas requested from faucet');
      
      // Wait a bit for the transaction to be processed
      log('Waiting 10 seconds for faucet transaction...', 'yellow');
      await new Promise(resolve => setTimeout(resolve, 10000));
    } else {
      logSuccess('Sufficient gas available');
    }
  } catch (error) {
    logWarning('Could not check gas status, continuing anyway...');
  }
}

function buildContract() {
  logStep('2', 'Building Smart Contract');
  
  if (!fs.existsSync(CONTRACT_PATH)) {
    logError(`Contract path ${CONTRACT_PATH} does not exist`);
    process.exit(1);
  }

  try {
    process.chdir(CONTRACT_PATH);
    executeCommand('sui move build', 'build the Move contract');
    logSuccess('Smart contract built successfully');
    process.chdir('../../'); // Go back to root
  } catch (error) {
    logError('Failed to build smart contract');
    process.exit(1);
  }
}

function deployContract() {
  logStep('3', 'Deploying Smart Contract');
  
  try {
    process.chdir(CONTRACT_PATH);
    const deployResult = executeCommand(
      'sui client publish --gas-budget 100000000 --json',
      'deploy the contract'
    );
    
    const deployData = JSON.parse(deployResult);
    process.chdir('../../'); // Go back to root
    
    if (deployData.effects && deployData.effects.status && deployData.effects.status.status === 'success') {
      logSuccess('Smart contract deployed successfully!');
      
      // Extract important object IDs
      const created = deployData.effects.created || [];
      const packageId = created.find(obj => obj.owner === 'Immutable')?.reference?.objectId;
      
      const configData = {
        network: NETWORK,
        packageId: packageId,
        deploymentTx: deployData.digest,
        deployedAt: new Date().toISOString(),
        objects: {
          organizerCap: null,
          walletTracker: null,
          events: []
        }
      };

      // Look for shared objects (WalletTicketCount should be shared)
      const shared = deployData.effects.shared || [];
      if (shared.length > 0) {
        configData.objects.walletTracker = shared[0].objectId;
      }

      // Look for created objects (OrganizerCap should be transferred to deployer)
      const transferred = deployData.effects.created || [];
      const organizerCap = transferred.find(obj => obj.owner && typeof obj.owner === 'object' && obj.owner.AddressOwner);
      if (organizerCap) {
        configData.objects.organizerCap = organizerCap.reference.objectId;
      }

      // Save configuration
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(configData, null, 2));
      logSuccess(`Configuration saved to ${CONFIG_FILE}`);
      
      return configData;
    } else {
      logError('Deployment failed');
      log(JSON.stringify(deployData, null, 2), 'red');
      process.exit(1);
    }
  } catch (error) {
    logError(`Deployment error: ${error.message}`);
    process.exit(1);
  }
}

function createSampleEvent(config) {
  logStep('4', 'Creating Sample Event');
  
  if (!config.packageId || !config.objects.organizerCap) {
    logError('Missing package ID or organizer capability');
    return;
  }

  try {
    const moveCallCommand = `sui client call --package ${config.packageId} --module ticket_nft --function create_event --args ${config.objects.organizerCap} "Taylor Swift - The Eras Tour" "Experience the magic of Taylor Swift's The Eras Tour live in concert." "MetLife Stadium" ${Date.now() + 7 * 24 * 60 * 60 * 1000} 225000000000 150000000000 4 50 150 --gas-budget 10000000 --json`;
    
    const result = executeCommand(moveCallCommand, 'create sample event');
    const resultData = JSON.parse(result);
    
    if (resultData.effects && resultData.effects.status && resultData.effects.status.status === 'success') {
      // Find the created event object
      const created = resultData.effects.created || [];
      const eventObject = created.find(obj => obj.owner === 'Shared');
      
      if (eventObject) {
        config.objects.events.push({
          id: 1,
          objectId: eventObject.reference.objectId,
          name: "Taylor Swift - The Eras Tour",
          createdAt: new Date().toISOString()
        });
        
        // Update config file
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
        logSuccess(`Sample event created with ID: ${eventObject.reference.objectId}`);
      }
    } else {
      logWarning('Sample event creation may have failed');
      log(JSON.stringify(resultData, null, 2), 'yellow');
    }
  } catch (error) {
    logWarning(`Could not create sample event: ${error.message}`);
  }
}

function displayResults(config) {
  logStep('5', 'Deployment Complete!');
  
  log('\n' + '='.repeat(60), 'green');
  log('🎉 DEPLOYMENT SUCCESSFUL! 🎉', 'green');
  log('='.repeat(60), 'green');
  
  log('\n📋 Contract Information:', 'bold');
  log(`   Network: ${config.network}`, 'cyan');
  log(`   Package ID: ${config.packageId}`, 'cyan');
  log(`   Deployment TX: ${config.deploymentTx}`, 'cyan');
  
  log('\n🔧 Contract Objects:', 'bold');
  log(`   Organizer Cap: ${config.objects.organizerCap || 'Not found'}`, 'cyan');
  log(`   Wallet Tracker: ${config.objects.walletTracker || 'Not found'}`, 'cyan');
  
  if (config.objects.events.length > 0) {
    log('\n🎫 Sample Events:', 'bold');
    config.objects.events.forEach(event => {
      log(`   ${event.name}: ${event.objectId}`, 'cyan');
    });
  }
  
  log('\n📁 Configuration saved to: contract-config.json', 'yellow');
  log('\n🚀 Next Steps:', 'bold');
  log('   1. Update your frontend with the deployed contract addresses', 'green');
  log('   2. Test the ticket purchase flow', 'green');
  log('   3. Create additional events using the organizer capability', 'green');
  
  log('\n🔍 Useful Commands:', 'bold');
  log(`   View package: sui client object ${config.packageId}`, 'blue');
  log(`   View organizer cap: sui client object ${config.objects.organizerCap}`, 'blue');
  log(`   View wallet tracker: sui client object ${config.objects.walletTracker}`, 'blue');
  
  log('\n' + '='.repeat(60) + '\n', 'green');
}

async function main() {
  log('🚀 Starting Ticket NFT Smart Contract Deployment', 'bold');
  log(`Target Network: ${NETWORK}`, 'cyan');
  
  try {
    await checkPrerequisites();
    buildContract();
    const config = deployContract();
    createSampleEvent(config);
    displayResults(config);
    
    logSuccess('Deployment process completed successfully!');
    process.exit(0);
  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle async execution
main().catch(error => {
  logError(`Unexpected error: ${error.message}`);
  process.exit(1);
});