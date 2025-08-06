import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConnectButton, useWallet, useAccountBalance } from '@suiet/wallet-kit';
import { Chonburi, Domine } from "next/font/google";
import QRCode from 'react-qr-code';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { useWalletInfo } from '../wallet/useWallet';
import * as contractUtils from '../utils/contract-interactions';

const chonburi = Chonburi({
  variable: "--font-chonburi",
  subsets: ["latin"],
  weight: "400",
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// NFT Ticket Card Component
function TicketCard({ ticket, onViewDetails }) {
  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="relative h-36 bg-gradient-to-r from-[#D84040] to-[#A31D1D]">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4 pt-10">
          <div className="text-center text-white">
            <h3 className="text-xl font-bold font-chonburi mb-1 drop-shadow-lg">{ticket.eventName}</h3>
            <p className="text-sm opacity-95 font-domine drop-shadow">🎫 NFT TICKET 🎫</p>
          </div>
        </div>
        <div className={`absolute top-1 right-1 rounded-lg px-3 py-1.5 shadow-lg ${
          ticket.seatType === 1 
            ? 'bg-yellow-400 border border-yellow-600' 
            : 'bg-blue-500 border border-blue-700'
        }`}>
          <span className={`text-xs font-bold font-domine ${
            ticket.seatType === 1 
              ? 'text-yellow-900' 
              : 'text-white'
          }`}>
            {ticket.seatType === 1 ? 'VIP' : 'STANDARD'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 font-domine">Venue</p>
            <p className="font-semibold text-[#A31D1D] font-domine h-16 flex items-start">{ticket.venue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-domine">Seat</p>
            <p className="font-semibold text-[#A31D1D] font-domine">{ticket.seatId}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 font-domine">Event Date</p>
            <p className="font-semibold text-[#A31D1D] font-domine">{formatDate(ticket.eventDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-domine">Price Paid</p>
            <p className="font-semibold text-[#A31D1D] font-domine">{contractUtils.mistToSui(ticket.pricePaid).toFixed(2)} SUI</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-domine">Purchased</p>
            <p className="text-sm font-medium text-gray-700 font-domine">{formatDate(ticket.purchaseDate)}</p>
          </div>
          <div className="ml-6">
            <button 
              onClick={() => onViewDetails(ticket)}
              className="bg-gradient-to-r from-[#D84040] to-[#A31D1D] text-white px-6 py-2.5 rounded-lg text-sm font-domine hover:from-[#A31D1D] hover:to-[#8B1919] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
            >
              Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function TicketSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-32 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate unique QR code data for ticket
function generateTicketQRData(ticket) {
  // Create a unique identifier combining ticket info with random elements
  const randomId = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now();
  
  const qrData = {
    ticketId: ticket.id,
    eventName: ticket.eventName,
    venue: ticket.venue,
    seat: ticket.seatId,
    eventDate: ticket.eventDate,
    randomId: randomId,
    generatedAt: timestamp,
    verification: `REDMOO-${randomId.toUpperCase()}-${timestamp.toString(36).toUpperCase()}`
  };
  
  return JSON.stringify(qrData);
}

// Account Selector Component with Enhanced Discovery
function AccountSelector({ wallet, currentAddress, onSwitch, onClose }) {
  const [accounts, setAccounts] = useState(wallet.getAccounts());
  const [loading, setLoading] = useState(false);
  
  console.log('AccountSelector Debug:', {
    accountsLength: accounts.length,
    accounts: accounts,
    currentAddress: currentAddress,
    walletConnected: wallet.connected
  });

  // Enhanced account discovery function (same as in main component but localized)
  const discoverAccounts = async () => {
    setLoading(true);
    console.log('🔍 AccountSelector: Discovering accounts...');
    
    try {
      let allAccounts = [];
      
      // Method 1: Standard getAccounts()
      const standardAccounts = wallet.getAccounts();
      allAccounts = [...standardAccounts];
      
      // Method 2: Try adapter directly
      if (wallet.adapter && wallet.adapter.getAccounts) {
        try {
          const adapterAccounts = await wallet.adapter.getAccounts();
          adapterAccounts.forEach(acc => {
            if (!allAccounts.find(existing => existing.address === acc.address)) {
              allAccounts.push(acc);
            }
          });
        } catch (err) {
          console.log('Adapter method failed:', err);
        }
      }
      
      // Method 3: Check window.suiet if available
      if (window.suiet && window.suiet.getAccounts) {
        try {
          const windowAccounts = await window.suiet.getAccounts();
          windowAccounts.forEach(acc => {
            if (!allAccounts.find(existing => existing.address === acc.address)) {
              allAccounts.push(acc);
            }
          });
        } catch (err) {
          console.log('Window suiet method failed:', err);
        }
      }
      
      console.log('🎯 AccountSelector: Total accounts found:', allAccounts.length);
      setAccounts(allAccounts);
      return allAccounts;
      
    } catch (error) {
      console.error('❌ AccountSelector: Error discovering accounts:', error);
      return accounts;
    } finally {
      setLoading(false);
    }
  };

  if (accounts.length <= 1) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[#A31D1D] font-domine">Enhanced Account Discovery</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 font-domine text-sm font-semibold mb-1">
              📊 Current Status:
            </p>
            <p className="text-blue-700 font-domine text-sm">
              • Accounts detected: {accounts.length}
            </p>
            <p className="text-blue-700 font-domine text-sm">
              • Current account: {currentAddress?.slice(0, 8)}...{currentAddress?.slice(-6)}
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 font-domine text-sm font-semibold mb-2">
              🔍 Try Enhanced Discovery:
            </p>
            <p className="text-green-700 font-domine text-sm mb-3">
              We can try multiple methods to discover additional accounts in your wallet.
            </p>
            <button
              onClick={discoverAccounts}
              disabled={loading}
              className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors font-domine disabled:opacity-50"
            >
              {loading ? '🔄 Discovering...' : '🔍 Discover More Accounts'}
            </button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 font-domine text-sm font-semibold mb-2">
              📝 Manual Method:
            </p>
            <ol className="text-yellow-700 font-domine text-sm space-y-1 list-decimal list-inside">
              <li>Open your Suiet wallet extension</li>
              <li>Add more accounts if you haven't</li>
              <li>Make sure accounts are enabled for dApps</li>
              <li>Switch to desired account</li>
              <li>Refresh this page</li>
            </ol>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                console.log('Refreshing page to detect account changes...');
                window.location.reload();
              }}
              className="flex-1 px-3 py-2 bg-[#D84040] text-white rounded text-sm hover:bg-[#A31D1D] transition-colors font-domine"
            >
              🔄 Refresh Page
            </button>
            <button
              onClick={() => {
                console.log('=== WALLET DEBUG INFO ===');
                console.log('Wallet connected:', wallet.connected);
                console.log('Current account:', wallet.account);
                console.log('All accounts from getAccounts():', wallet.getAccounts());
                console.log('Available wallet methods:', Object.keys(wallet));
                console.log('Window.suiet:', window.suiet);
                alert('Check the browser console for detailed wallet account information.');
              }}
              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors font-domine"
            >
              🐛 Debug
            </button>
          </div>
          
          <p className="text-xs text-gray-500 font-domine">
            💡 Note: Wallet extensions control account exposure for security. Some wallets only show one account at a time to dApps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#A31D1D] font-domine">Choose Account ({accounts.length} found)</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2">
        {accounts.map((acc, index) => (
          <div 
            key={acc.address} 
            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
              acc.address === currentAddress 
                ? 'bg-[#F8F2DE] border-[#D84040] border-2' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 font-domine">
                  Account #{index + 1}
                </span>
                {acc.address === currentAddress && (
                  <span className="px-2 py-1 bg-[#D84040] text-white rounded text-xs font-domine">
                    Active
                  </span>
                )}
              </div>
              <span className={`font-mono text-sm ${
                acc.address === currentAddress ? "text-[#D84040] font-bold" : "text-gray-600"
              }`}>
                {acc.address.slice(0, 8)}...{acc.address.slice(-6)}
              </span>
            </div>
            
            {acc.address !== currentAddress && (
              <button
                className="px-3 py-1 bg-[#D84040] text-white rounded text-sm hover:bg-[#A31D1D] transition-colors font-domine"
                onClick={() => onSwitch(acc.address)}
              >
                Switch
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <p className="text-xs text-gray-500 font-domine">
          Click "Switch" to change accounts
        </p>
        <button
          onClick={discoverAccounts}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors font-domine disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Find More'}
        </button>
      </div>
    </div>
  );
}

// Ticket Details Modal Component
function TicketDetailsModal({ ticket, isOpen, onClose }) {
  if (!isOpen || !ticket) return null;

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const qrCodeData = generateTicketQRData(ticket);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D84040] to-[#A31D1D] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold font-chonburi">{ticket.eventName}</h2>
              <p className="text-sm opacity-90 font-domine mt-1">🎫 NFT TICKET DETAILS</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* QR Code Section */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-[#A31D1D] font-domine mb-4">Your Ticket QR Code</h3>
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
              <QRCode
                value={qrCodeData}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 200 200`}
              />
            </div>
            <p className="text-sm text-gray-600 font-domine mt-2">
              Present this QR code at the venue for entry
            </p>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-domine">Event</p>
                <p className="font-bold text-[#A31D1D] font-domine text-lg">{ticket.eventName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Venue</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{ticket.venue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Seat</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{ticket.seatId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Ticket Type</p>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  ticket.seatType === 1 
                    ? 'bg-yellow-400 text-yellow-900 border border-yellow-600' 
                    : 'bg-blue-500 text-white border border-blue-700'
                }`}>
                  {ticket.seatType === 1 ? 'VIP' : 'STANDARD'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-domine">Event Date</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{formatDate(ticket.eventDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Event Time</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{formatTime(ticket.eventDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Price Paid</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{contractUtils.mistToSui(ticket.pricePaid).toFixed(2)} SUI</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Purchase Date</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{formatDate(ticket.purchaseDate)}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#F8F2DE] rounded-lg p-4 border border-[#D84040]">
            <h4 className="font-bold text-[#A31D1D] font-domine mb-2">Important Information</h4>
            <ul className="text-sm text-[#A31D1D] font-domine space-y-1">
              <li>• Please arrive at least 30 minutes before the event</li>
              <li>• Present this QR code at the entrance for verification</li>
              <li>• This is a blockchain NFT ticket - transferable and tradeable</li>
              <li>• Keep your QR code secure and don't share it publicly</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#D84040] text-white rounded hover:bg-[#A31D1D] transition-colors font-domine"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const sectionContent = (active, handleLogout, handleSwitchAccount, walletInfo, tickets, loadingTickets, showPurchaseSuccess, clearDemoPurchases, onViewDetails, showAccountSelector, handleSwitchToAccount, wallet, setShowAccountSelector) => {
  if (active === "mytickets") {
    return (
      <div className="space-y-6">
        {/* Purchase Success Banner */}
        {showPurchaseSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-semibold text-green-800 font-domine">🎉 Purchase Successful!</span>
            </div>
            <p className="text-green-700 text-sm font-domine mt-1">
              Your demo NFT tickets have been added to your collection. In production, these would be real blockchain NFTs!
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">My NFT Tickets</h2>
          <div className="text-sm text-gray-600 font-domine">
            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} owned
          </div>
        </div>

        {loadingTickets ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <TicketSkeleton key={i} />
            ))}
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <TicketCard key={`${ticket.id}-${index}`} ticket={ticket} onViewDetails={onViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-2">No Tickets Yet</h3>
            <p className="text-gray-600 font-domine mb-6">
              Purchase tickets from events to see your NFT tickets here.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] transition-colors font-medium font-domine"
            >
              Browse Events
            </button>
          </div>
        )}
      </div>
    );
  }
  
  if (active === "info") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">Wallet Information</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Wallet Address</label>
            <div className="bg-white rounded-lg p-3 border border-gray-200 font-mono text-sm break-all">
              {walletInfo.address || 'Not connected'}
            </div>
          </div>
          
          {walletInfo.suinsName && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Sui Name Service</label>
              <div className="bg-white rounded-lg p-3 border border-gray-200 font-mono text-sm">
                {walletInfo.suinsName}
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Balance</label>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                {balanceLoading ? (
                  <div className="flex items-center">
                    <div className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-[#D84040]"></div>
                    <span className="text-gray-500">Loading balance...</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-[#D84040] font-domine">
                    {getFormattedBalance()}
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Network</label>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-domine">Sui Devnet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (active === "settings") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">Settings</h2>
        
        <div className="space-y-4">
          {/* Debug Button - for testing wallet accounts */}
          <button
            className="w-full bg-yellow-50 text-yellow-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-yellow-100 transition-all text-left border border-yellow-200"
            onClick={async () => {
              debugWalletAccounts();
              const allAccounts = await discoverAllAccounts();
              alert(`Found ${allAccounts.length} accounts. Check the browser console (F12) for detailed information.`);
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">🐛 Enhanced Account Discovery</div>
                <div className="text-sm opacity-75">Discover all accounts using multiple methods</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </button>

          <button
            className="w-full bg-[#F8F2DE] text-[#A31D1D] px-6 py-4 rounded-lg font-domine font-medium hover:bg-[#ECDCBF] transition-all text-left border border-[#A31D1D]"
            onClick={handleSwitchAccount}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Switch Account</div>
                <div className="text-sm opacity-75">Switch to another account in your wallet</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </button>

          {/* Account Selector Modal/Dropdown */}
          {showAccountSelector && (
            <div className="mt-4">
              <AccountSelector
                wallet={wallet}
                currentAddress={wallet.account?.address}
                onSwitch={handleSwitchToAccount}
                onClose={() => setShowAccountSelector(false)}
              />
            </div>
          )}

          <button
            className="w-full bg-red-50 text-red-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-red-100 transition-all text-left border border-red-200 hover:border-red-300"
            onClick={handleLogout}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Disconnect Wallet</div>
                <div className="text-sm opacity-75">Sign out and return to homepage</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </button>

          <button
            className="w-full bg-blue-50 text-blue-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-blue-100 transition-all text-left border border-blue-200"
            onClick={clearDemoPurchases}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Clear Demo Purchases</div>
                <div className="text-sm opacity-75">Reset all demo ticket purchases for testing</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default function Profile() {
  const router = useRouter();
  const [active, setActive] = useState("mytickets");
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const [walletLoading, setWalletLoading] = useState(true);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showAccountSelector, setShowAccountSelector] = useState(false);

  // Initialize the SuiClient for blockchain interactions
  const [suiClient] = useState(new SuiClient({ url: getFullnodeUrl('devnet') }));
  
  // Get wallet info from Suiet wallet-kit directly
  const wallet = useWallet();
  const { connected, account } = wallet;
  
  // Use our custom wallet info hook for consistent access
  const { isConnected, address } = useWalletInfo();
  
  // Use the Suiet useAccountBalance hook instead of manually fetching balance
  const { error: balanceError, loading: balanceLoading, balance: walletBalance } = useAccountBalance();
  
  // Function to format the balance for display
  const getFormattedBalance = () => {
    if (balanceLoading) return 'Loading...';
    if (balanceError) return 'Error loading balance';
    if (!walletBalance) return '0';
    
    try {
      // Convert to SUI (1 SUI = 10^9 MIST)
      const balanceInSui = Number(walletBalance) / 1000000000;
      return `${balanceInSui.toFixed(2)} SUI`;
    } catch (err) {
      console.error('Error formatting balance:', err);
      return walletBalance;
    }
  };

  // Give wallet state time to initialize before checking connection
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔄 Wallet loading completed. Connection status:', isConnected);
      setWalletLoading(false);
    }, 1000); // Give 1 second for wallet state to load

    return () => clearTimeout(timer);
  }, [isConnected]);

  // Check if user came from a successful purchase
  useEffect(() => {
    if (router.query.purchase === 'success') {
      setShowPurchaseSuccess(true);
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowPurchaseSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [router.query]);

  // Continue with authenticated view - redirect if not connected
  useEffect(() => {
    if (!walletLoading && !isConnected) {
      console.log('🔄 Wallet not connected, redirecting to connect page...');
      router.replace('/connect-wallet');
    }
  }, [isConnected, router, walletLoading]);

  // Fetch NFT tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (!address) {
        console.log('⚠️ No wallet address available');
        setLoadingTickets(false);
        return;
      }
      
      setLoadingTickets(true);
      try {
        console.log('🎫 Fetching tickets for address:', address);
        
        // Validate that we have a proper address
        if (!address.startsWith('0x')) {
          throw new Error('Invalid wallet address format');
        }
        
        // Validate that suiClient is available
        if (!suiClient) {
          throw new Error('Sui client not available');
        }
        
        // Since the smart contract isn't deployed yet, we'll skip the actual query
        // and use mock data for demonstration purposes
        
        // TODO: Uncomment this when smart contract is deployed
        /*
        const ownedObjects = await suiClient.getOwnedObjects({
          owner: address,
          filter: {
            StructType: `${0x0fc2ca8d04ca3335e241aef5d6895d2c1c41d8eac092efaa4580b092e608b13c}::ticket_nft::TicketNFT`
          },
          options: {
            showContent: true,
            showType: true,
          }
        });
        */

        // Read actual purchases from localStorage
        const purchasedTickets = [];
        const userBalance = parseInt(walletBalance || '0');
        
        console.log('💰 User balance:', userBalance, 'MIST');
        
        try {
          // Get user's actual purchases from localStorage
          const demoPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
          console.log('📦 Raw purchases from localStorage:', demoPurchases);
          
          // Filter purchases for current wallet address
          const userPurchases = demoPurchases.filter(purchase => 
            purchase.walletAddress === address
          );
          
          console.log('👤 Purchases for current wallet:', userPurchases);
          
          // Convert purchases to ticket format
          userPurchases.forEach(purchase => {
            purchase.seats.forEach((seat, index) => {
              purchasedTickets.push({
                id: `${purchase.id}-seat-${index}`,
                eventName: purchase.eventName,
                venue: purchase.venue,
                seatId: seat.seatId,
                seatType: seat.seatType, // 1 = VIP, 2 = Standard
                eventDate: purchase.eventDate,
                pricePaid: (seat.price * 1000000000).toString(), // Convert SUI to MIST
                purchaseDate: purchase.purchaseDate,
                purchaseId: purchase.id
              });
            });
          });
          
        } catch (error) {
          console.error('❌ Error reading purchases from localStorage:', error);
          // Fallback to empty array
        }

        console.log('🎫 Final tickets to display:', purchasedTickets.length, purchasedTickets);
        setTickets(purchasedTickets);
      } catch (error) {
        console.error("❌ Error fetching tickets:", error);
        console.error("Error details:", {
          message: error.message,
          account: account,
          address: address,
          balance: walletBalance,
          isConnected: isConnected,
          suiClientExists: !!suiClient
        });
        // Set empty tickets array on error
        setTickets([]);
      } finally {
        setLoadingTickets(false);
      }
    };

    if (isConnected && address && suiClient) {
      fetchTickets();
    }
  }, [account, address, isConnected, walletBalance, suiClient]);

  // Add debug function to print account info
  const printAccountInfo = () => {
    if (!isConnected) return;
    console.log('Wallet Address:', account?.address);
    console.log('Sui Name:', account?.suinsName);
    console.log('Public Key:', account?.publicKey);
  };

  // Call once to log wallet info for debugging
  useEffect(() => {
    if (isConnected && account) {
      printAccountInfo();
    }
  }, [isConnected, account]);

  // Debug wallet accounts function
  const debugWalletAccounts = () => {
    console.log('=== WALLET DEBUG INFO ===');
    console.log('Wallet connected:', wallet.connected);
    console.log('Current account:', wallet.account);
    console.log('All accounts from getAccounts():', wallet.getAccounts());
    console.log('Number of accounts:', wallet.getAccounts().length);
    console.log('Available wallet methods:', Object.keys(wallet));
    
    try {
      const accounts = wallet.getAccounts();
      accounts.forEach((acc, index) => {
        console.log(`Account ${index + 1}:`, {
          address: acc.address,
          publicKey: acc.publicKey,
          chains: acc.chains
        });
      });
    } catch (error) {
      console.error('Error getting accounts:', error);
    }

    // Try to access additional wallet methods that might expose more accounts
    if (wallet.adapter) {
      console.log('Wallet adapter:', wallet.adapter);
      console.log('Adapter methods:', Object.keys(wallet.adapter));
    }
    
    // Check if there are other ways to access accounts
    if (window.suiet) {
      console.log('Window suiet object:', window.suiet);
    }
  };

  // Enhanced account discovery function
  const discoverAllAccounts = async () => {
    console.log('🔍 Discovering all available accounts...');
    let allAccounts = [];
    
    try {
      // Method 1: Standard getAccounts()
      const standardAccounts = wallet.getAccounts();
      console.log('Method 1 - Standard getAccounts():', standardAccounts);
      allAccounts = [...standardAccounts];
      
      // Method 2: Try adapter directly if available
      if (wallet.adapter && wallet.adapter.getAccounts) {
        try {
          const adapterAccounts = await wallet.adapter.getAccounts();
          console.log('Method 2 - Adapter getAccounts():', adapterAccounts);
          // Merge unique accounts
          adapterAccounts.forEach(acc => {
            if (!allAccounts.find(existing => existing.address === acc.address)) {
              allAccounts.push(acc);
            }
          });
        } catch (err) {
          console.log('Adapter getAccounts failed:', err);
        }
      }
      
      // Method 3: Try requesting additional permissions
      if (wallet.requestPermissions) {
        try {
          console.log('Method 3 - Requesting additional permissions...');
          await wallet.requestPermissions(['viewAccount']);
          const permissionAccounts = wallet.getAccounts();
          console.log('Method 3 - After permissions:', permissionAccounts);
          permissionAccounts.forEach(acc => {
            if (!allAccounts.find(existing => existing.address === acc.address)) {
              allAccounts.push(acc);
            }
          });
        } catch (err) {
          console.log('Request permissions failed:', err);
        }
      }
      
      // Method 4: Try connecting to get all accounts
      if (allAccounts.length <= 1) {
        try {
          console.log('Method 4 - Re-connecting to discover accounts...');
          await wallet.disconnect();
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          await wallet.connect();
          const reconnectAccounts = wallet.getAccounts();
          console.log('Method 4 - After reconnect:', reconnectAccounts);
          reconnectAccounts.forEach(acc => {
            if (!allAccounts.find(existing => existing.address === acc.address)) {
              allAccounts.push(acc);
            }
          });
        } catch (err) {
          console.log('Reconnect method failed:', err);
        }
      }
      
      console.log('🎯 Total unique accounts discovered:', allAccounts.length);
      return allAccounts;
      
    } catch (error) {
      console.error('❌ Error discovering accounts:', error);
      return wallet.getAccounts(); // Fallback to standard method
    }
  };

  const handleLogout = async () => {
    try {
      console.log('🔌 Disconnecting wallet...');
      await wallet.disconnect();
      console.log('✅ Wallet disconnected successfully');
      // Clear any local storage data
      localStorage.removeItem('walletConnected');
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("❌ Disconnect error:", error);
      // Even if there's an error, try to redirect
      router.push("/");
    }
  };

  const handleSwitchAccount = async () => {
    // First, try to discover all available accounts
    console.log('🔄 Attempting to discover all accounts...');
    const allAccounts = await discoverAllAccounts();
    
    console.log('Switch Account clicked - Available accounts:', allAccounts.length);
    
    if (allAccounts.length <= 1) {
      // Try one more method: Force account selection
      try {
        console.log('🔍 Trying to force account selection...');
        
        // Method: Disconnect and connect with explicit account selection
        const userWantsToTry = confirm(`
🔄 Enhanced Account Switching

Currently ${allAccounts.length} account detected. Let's try to discover more accounts:

Option 1: Reconnect with Account Selection
- This will disconnect and reconnect your wallet
- You may be prompted to select which accounts to connect
- This can help expose multiple accounts to the dApp

Option 2: Manual Extension Switch (Current Method)
- Switch accounts in your Suiet extension
- Then refresh this page

Try Option 1 (Reconnect with Account Selection)?
        `);
        
        if (userWantsToTry) {
          try {
            console.log('🔌 Disconnecting wallet...');
            await wallet.disconnect();
            
            // Wait a moment
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('� Reconnecting wallet...');
            await wallet.connect();
            
            // Check if we now have more accounts
            const newAccounts = wallet.getAccounts();
            console.log('🎯 Accounts after reconnect:', newAccounts.length);
            
            if (newAccounts.length > 1) {
              setShowAccountSelector(true);
              return;
            } else {
              alert('Still only 1 account detected. You may need to enable multiple accounts in your Suiet wallet extension settings, or add more accounts to your wallet first.');
            }
          } catch (error) {
            console.error('Reconnection failed:', error);
            alert('Reconnection failed. Please try the manual method: switch accounts in your wallet extension and refresh the page.');
          }
        } else {
          // Manual method instructions
          const userResponse = confirm(`
🔄 Manual Account Switching Guide

To switch accounts:

1. 📱 Open your Suiet wallet extension
2. 🔄 Switch to the account you want to use
3. � Refresh this page (F5)
4. ✅ The dApp will connect to your newly selected account

Would you like to refresh the page now to detect account changes?
          `);
          
          if (userResponse) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Account switching attempt failed:', error);
        alert('Account switching failed. Please try switching accounts in your wallet extension and refresh the page.');
      }
      return;
    }
    
    // If multiple accounts are available, show the selector
    setShowAccountSelector(!showAccountSelector);
  };

  // Switch account handler
  const handleSwitchToAccount = async (accountAddress) => {
    try {
      console.log('Switching to account:', accountAddress);
      await wallet.switchAccount(accountAddress);
      setShowAccountSelector(false);
      console.log('Account switched successfully');
    } catch (error) {
      console.error('Failed to switch account:', error);
      alert('Failed to switch account. Please try again.');
    }
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleCloseModal = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  // Debug function to clear demo purchases
  const clearDemoPurchases = () => {
    localStorage.removeItem('demo_purchases');
    console.log('🗑️ Cleared all demo purchases');
    
    // Trigger storage event for other tabs/pages to refresh
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'demo_purchases',
      oldValue: localStorage.getItem('demo_purchases'),
      newValue: null,
      url: window.location.href,
      storageArea: localStorage
    }));
    
    alert('Demo purchases cleared! Seat availability has been reset.');
    window.location.reload();
  };
  
  const walletInfo = {
    address: address,
    publicKey: account?.publicKey,
    suinsName: account?.suinsName,
    formattedBalance: getFormattedBalance(),
  };

  // Show loading screen while wallet state is initializing
  if (walletLoading) {
    return (
      <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-2">Loading Profile...</h1>
          <p className="text-gray-600 font-domine">Please wait while we load your wallet information.</p>
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#D84040]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show connecting screen if wallet state loaded but not connected
  if (!isConnected) {
    return (
      <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-2">Wallet Disconnected</h1>
          <p className="text-gray-600 font-domine mb-6">Your wallet has been disconnected. Please connect again to continue.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] transition-colors font-medium font-domine"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-[#F8F2DE]">
          {/* Left column: navigation */}
          <div className="bg-gradient-to-b from-[#F8F2DE] to-white p-8 lg:p-12 flex flex-row lg:flex-col gap-4 lg:w-72 border-b lg:border-b-0 lg:border-r border-[#F8F2DE]">
            <button
              className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                active === "mytickets" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
              }`}
              onClick={() => setActive("mytickets")}
            >
              <div className="flex items-center">
                <span className="mr-2">🎫</span>
                My Tickets
              </div>
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                active === "info" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
              }`}
              onClick={() => setActive("info")}
            >
              <div className="flex items-center">
                <span className="mr-2">💼</span>
                Wallet Info
              </div>
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                active === "settings" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
              }`}
              onClick={() => setActive("settings")}
            >
              <div className="flex items-center">
                <span className="mr-2">⚙️</span>
                Settings
              </div>
            </button>
          </div>

          {/* Right column: content */}
          <div className="flex-1 p-8 lg:p-16 bg-white">
            {sectionContent(
              active,
              handleLogout,
              handleSwitchAccount,
              walletInfo,
              tickets,
              loadingTickets,
              showPurchaseSuccess,
              clearDemoPurchases,
              handleViewDetails,
              showAccountSelector,
              handleSwitchToAccount,
              wallet,
              setShowAccountSelector
            )}
          </div>
        </div>
      </div>
      
      {/* Ticket Details Modal */}
      <TicketDetailsModal 
        ticket={selectedTicket}
        isOpen={showTicketModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}