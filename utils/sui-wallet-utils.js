/**
 * Sui Wallet Transaction Utilities for @suiet/wallet-kit
 * 
 * This module provides helper functions for interacting with the Sui blockchain
 * using the Suiet wallet-kit.
 */

import { Transaction } from "@mysten/sui/transactions";

/**
 * Execute a transaction using the connected Suiet wallet
 * @param {Object} wallet - The wallet object from useWallet() hook
 * @param {Function} txBuilderFn - A function that builds and returns a Transaction object
 * @returns {Promise<Object>} - The transaction result
 */
export async function executeTransaction(wallet, txBuilderFn) {
  if (!wallet.connected) {
    throw new Error("Wallet not connected");
  }
  
  try {
    // Build the transaction
    const tx = txBuilderFn();
    
    // Sign and execute the transaction
    const result = await wallet.signAndExecuteTransaction({
      transaction: tx,
    });
    
    return result;
  } catch (error) {
    console.error("Transaction execution failed:", error);
    throw error;
  }
}

/**
 * Sign a personal message using the connected Suiet wallet
 * @param {Object} wallet - The wallet object from useWallet() hook
 * @param {string} message - The message to sign
 * @returns {Promise<Object>} - The signature result
 */
export async function signMessage(wallet, message) {
  if (!wallet.connected) {
    throw new Error("Wallet not connected");
  }
  
  try {
    const result = await wallet.signPersonalMessage({
      message: new TextEncoder().encode(message),
    });
    
    return result;
  } catch (error) {
    console.error("Message signing failed:", error);
    throw error;
  }
}

/**
 * Helper to create a simple Move call transaction
 * @param {string} packageId - The package object ID
 * @param {string} moduleName - The module name
 * @param {string} functionName - The function name
 * @param {Array} args - Array of arguments for the function
 * @returns {Transaction} - A Transaction object ready for signing
 */
export function createMoveCallTransaction(packageId, moduleName, functionName, args = []) {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${packageId}::${moduleName}::${functionName}`,
    arguments: args,
  });
  
  return tx;
}

/**
 * Executes a Move call transaction using the connected wallet
 * @param {Object} wallet - The wallet object from useWallet() hook
 * @param {string} packageId - The package object ID
 * @param {string} moduleName - The module name
 * @param {string} functionName - The function name
 * @param {Array} args - Array of arguments for the function
 * @returns {Promise<Object>} - The transaction result
 */
export async function executeMoveCall(wallet, packageId, moduleName, functionName, args = []) {
  return executeTransaction(wallet, () => {
    return createMoveCallTransaction(packageId, moduleName, functionName, args);
  });
}
