import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConnectButton, useWallet, useAccountBalance } from '@suiet/wallet-kit';
import { Chonburi, Domine } from "next/font/google";
import QRCode from 'react-qr-code';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { useWalletInfo } from '../wallet/useWallet';
import * as contractUtils from '../utils/contract-interactions';
import { CONTRACT_CONFIG } from '../utils/contract-config';

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

// Account Selector Component - Now just shows instructions for manual switching
function AccountSelector({ wallet, currentAddress, onClose }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#A31D1D] font-domine">Account Switching</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 font-domine text-sm font-semibold mb-1">
            Current Account:
          </p>
          <p className="text-blue-700 font-domine text-sm font-mono">
            {currentAddress?.slice(0, 8)}...{currentAddress?.slice(-6)}
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 font-domine text-sm font-semibold mb-2">
            To Switch Accounts:
          </p>
          <ol className="text-yellow-700 font-domine text-sm space-y-1 list-decimal list-inside">
            <li>Open your Suiet wallet extension</li>
            <li>Click on the account dropdown</li>
            <li>Select the account you want to use</li>
            <li>Refresh this page to see the new account</li>
          </ol>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-3 py-2 bg-[#D84040] text-white rounded text-sm hover:bg-[#A31D1D] transition-colors font-domine"
          >
            🔄 Refresh Page
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors font-domine"
          >
            Close
          </button>
        </div>
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

const sectionContent = (active, handleLogout, walletInfo, tickets, loadingTickets, showPurchaseSuccess, clearDemoPurchases, onViewDetails, showAccountSelector, wallet, setShowAccountSelector, balanceLoading, getFormattedBalance, eventForm, setEventForm, handleCreateEvent, isCreatingEvent) => {
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
  
  if (active === "organizer") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">Organizer Dashboard</h2>
        
        {/* Event Creation Section */}
        <div className="bg-gradient-to-r from-[#F8F2DE] to-[#ECDCBF] rounded-lg p-6 border border-[#A31D1D]">
          <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-4">Create New Event</h3>
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-800 font-domine text-sm">
                <strong>Enhanced Event Creation:</strong> All event details will be stored on-chain with the updated Move contract.
              </p>
            </div>
            
            {/* Basic Event Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Event Name *</label>
                <input
                  type="text"
                  value={eventForm.name}
                  onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="Taylor Swift - The Eras Tour"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Category *</label>
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Concert">Concert</option>
                  <option value="Sports">Sports</option>
                  <option value="Theater">Theater</option>
                  <option value="Conference">Conference</option>
                  <option value="Festival">Festival</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Description *</label>
              <textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                rows="3"
                placeholder="Experience the magic of Taylor Swift's The Eras Tour live in concert..."
                required
              />
            </div>

            {/* Venue Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Venue Name *</label>
                <input
                  type="text"
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({...eventForm, venue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="MetLife Stadium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Venue Address *</label>
                <input
                  type="text"
                  value={eventForm.address}
                  onChange={(e) => setEventForm({...eventForm, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="1 MetLife Stadium Dr, East Rutherford, NJ 07073"
                  required
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Event Date *</label>
                <input
                  type="datetime-local"
                  value={eventForm.eventDate}
                  onChange={(e) => setEventForm({...eventForm, eventDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Start Time *</label>
                <input
                  type="text"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="8:00 PM"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">End Time *</label>
                <input
                  type="text"
                  value={eventForm.closingTime}
                  onChange={(e) => setEventForm({...eventForm, closingTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="11:30 PM"
                  required
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">VIP Price (SUI) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={eventForm.vipPrice}
                  onChange={(e) => setEventForm({...eventForm, vipPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="25.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Normal Price (SUI) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={eventForm.normalPrice}
                  onChange={(e) => setEventForm({...eventForm, normalPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="15.00"
                  required
                />
              </div>
            </div>

            {/* Seating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">VIP Seats *</label>
                <input
                  type="number"
                  min="1"
                  value={eventForm.vipSeats}
                  onChange={(e) => setEventForm({...eventForm, vipSeats: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Normal Seats *</label>
                <input
                  type="number"
                  min="1"
                  value={eventForm.normalSeats}
                  onChange={(e) => setEventForm({...eventForm, normalSeats: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="500"
                  required
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Language</label>
                <input
                  type="text"
                  value={eventForm.language}
                  onChange={(e) => setEventForm({...eventForm, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="English"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Age Rating</label>
                <select
                  value={eventForm.ageRating}
                  onChange={(e) => setEventForm({...eventForm, ageRating: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                >
                  <option value="">Select Age Rating</option>
                  <option value="All Ages">All Ages</option>
                  <option value="18+">18+</option>
                  <option value="21+">21+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Genres</label>
                <input
                  type="text"
                  value={eventForm.genres}
                  onChange={(e) => setEventForm({...eventForm, genres: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="Pop, Country, Alternative"
                />
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Event Image URL</label>
                <input
                  type="url"
                  value={eventForm.imageUrl}
                  onChange={(e) => setEventForm({...eventForm, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="https://example.com/event-image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Seating Chart URL</label>
                <input
                  type="url"
                  value={eventForm.seatingImageUrl}
                  onChange={(e) => setEventForm({...eventForm, seatingImageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                  placeholder="https://example.com/seating-chart.jpg"
                />
              </div>
            </div>

            {/* Notices and Terms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Important Notices</label>
              <textarea
                value={eventForm.importantNotices}
                onChange={(e) => setEventForm({...eventForm, importantNotices: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                rows="2"
                placeholder="Please arrive 30 minutes before the show. No cameras or recording devices allowed..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Terms and Conditions</label>
              <textarea
                value={eventForm.termsAndConditions}
                onChange={(e) => setEventForm({...eventForm, termsAndConditions: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                rows="2"
                placeholder="Tickets are non-refundable and non-transferable. The venue reserves the right to refuse entry..."
              />
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 font-domine text-sm">
                <strong>Enhanced Storage:</strong> All event details including name, description, venue, images, and policies will be stored on-chain.
              </p>
            </div>
            
            <button
              className="w-full bg-[#D84040] text-white px-6 py-3 rounded-lg font-domine font-semibold hover:bg-[#A31D1D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCreateEvent}
              disabled={isCreatingEvent}
            >
              {isCreatingEvent ? 'Creating Event...' : 'Create Event on Blockchain'}
            </button>
          </div>
        </div>

        {/* Current Events Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-4">Current Events</h3>
          <div className="space-y-3">
            {Object.entries(CONTRACT_CONFIG.eventObjectIds).map(([eventId, objectId]) => (
              <div key={eventId} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800 font-domine">Event #{eventId}</div>
                    <div className="text-sm text-gray-600 font-mono">{objectId}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-domine hover:bg-blue-200">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-domine hover:bg-green-200">
                      Withdraw Funds
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {Object.keys(CONTRACT_CONFIG.eventObjectIds).length === 0 && (
            <div className="text-center py-8 text-gray-500 font-domine">
              No events created yet. Create your first event above!
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></div>
            <div>
              <h4 className="font-semibold text-yellow-800 font-domine">Important Instructions</h4>
              <p className="text-yellow-700 text-sm font-domine mt-1">
                When you create an event, you'll receive an event object ID from the blockchain. 
                You need to update the contract configuration file with this object ID so buyers can purchase tickets.
                Each event should only be created once by the organizer.
              </p>
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
          <button
            className="w-full bg-[#F8F2DE] text-[#A31D1D] px-6 py-4 rounded-lg font-domine font-medium hover:bg-[#ECDCBF] transition-all text-left border border-[#A31D1D]"
            onClick={() => setShowAccountSelector(!showAccountSelector)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Switch Account Instructions</div>
                <div className="text-sm opacity-75">Learn how to switch accounts in your wallet</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </button>

          {/* Account Instructions Modal/Dropdown */}
          {showAccountSelector && (
            <div className="mt-4">
              <AccountSelector
                wallet={wallet}
                currentAddress={wallet.account?.address}
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
  
  // Organizer event creation state
  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    venue: '',
    address: '',
    eventDate: '',
    time: '',
    closingTime: '',
    vipPrice: '',
    normalPrice: '',
    vipSeats: '',
    normalSeats: '',
    category: '',
    language: '',
    ageRating: '',
    genres: '',
    imageUrl: '',
    seatingImageUrl: '',
    importantNotices: '',
    termsAndConditions: ''
  });
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

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
            StructType: `${0x0fc2ca8d04ca3335e241aef5d6895d2c1c41d8eac092efaa4580b092e608b13c}::ticketing::TicketNFT`
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
  
  // Handle event creation (organizer only)
  const handleCreateEvent = async () => {
    if (!wallet?.connected || !address) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (address !== CONTRACT_CONFIG.organizerAddress) {
      alert('Only the organizer can create events');
      return;
    }
    
    // Validate required form data
    if (!eventForm.name || !eventForm.description || !eventForm.venue || !eventForm.address ||
        !eventForm.eventDate || !eventForm.time || !eventForm.closingTime ||
        !eventForm.vipPrice || !eventForm.normalPrice || 
        !eventForm.vipSeats || !eventForm.normalSeats || !eventForm.category) {
      alert('Please fill in all required fields marked with *');
      return;
    }
    
    setIsCreatingEvent(true);
    
    try {
      // Initialize contract utilities
      contractUtils.initializeContract(CONTRACT_CONFIG);
      
      // Convert form data to proper format
      const eventDateTime = new Date(eventForm.eventDate).getTime();
      const vipPriceInMist = BigInt(Math.floor(parseFloat(eventForm.vipPrice) * 1_000_000_000));
      const normalPriceInMist = BigInt(Math.floor(parseFloat(eventForm.normalPrice) * 1_000_000_000));
      
      // Create event transaction with all fields
      const txb = contractUtils.createEventTransaction({
        name: eventForm.name,
        description: eventForm.description,
        venue: eventForm.venue,
        address: eventForm.address,
        eventDate: eventDateTime,
        time: eventForm.time,
        closingTime: eventForm.closingTime,
        vipPriceInMist: vipPriceInMist,
        normalPriceInMist: normalPriceInMist,
        totalVipSeats: parseInt(eventForm.vipSeats),
        totalNormalSeats: parseInt(eventForm.normalSeats),
        category: eventForm.category,
        language: eventForm.language || 'English',
        ageRating: eventForm.ageRating || 'All Ages',
        genres: eventForm.genres || '',
        imageUrl: eventForm.imageUrl || '',
        seatingImageUrl: eventForm.seatingImageUrl || '',
        importantNotices: eventForm.importantNotices || '',
        termsAndConditions: eventForm.termsAndConditions || ''
      });
      
      // Sign and execute transaction
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        options: {
          showEffects: true,
          showEvents: true,
          showObjectChanges: true,
        },
      });
      
      console.log('Event creation result:', result);
      
      // Enhanced extraction logic with comprehensive debugging
      console.log('🔍 FULL TRANSACTION RESULT DEBUG:', {
        digest: result.digest,
        effects: result.effects,
        objectChanges: result.objectChanges,
        events: result.events,
        balanceChanges: result.balanceChanges,
        fullResult: result
      });
      
      // Check if transaction was successful
      if (result.effects?.status?.status !== 'success') {
        console.error('❌ Transaction failed:', result.effects?.status);
        throw new Error(`Transaction failed: ${result.effects?.status?.error || 'Unknown error'}`);
      }
      
      // Check if objectChanges exists
      if (!result.objectChanges || result.objectChanges.length === 0) {
        console.error('❌ No objectChanges in transaction result');
        throw new Error('Transaction succeeded but no objects were created. This might indicate a contract execution issue.');
      }
      
      // Log all created objects for debugging
      const allCreatedObjects = result.objectChanges.filter(change => change.type === 'created');
      console.log('🔍 ALL CREATED OBJECTS:', allCreatedObjects.map(obj => ({
        objectId: obj.objectId,
        objectType: obj.objectType,
        owner: obj.owner,
        digest: obj.digest
      })));
      
      // Try multiple methods to extract the event object ID
      let eventObjectId = null;
      let extractionMethod = 'unknown';
      
      // Method 1: Look for EventData in objectType (case-insensitive)
      eventObjectId = result.objectChanges?.find(
        change => change.type === 'created' && 
        change.objectType?.toLowerCase().includes('eventdata')
      )?.objectId;
      if (eventObjectId) extractionMethod = 'EventData pattern match';
      
      // Method 2: Look for full package path with correct module name
      if (!eventObjectId) {
        eventObjectId = result.objectChanges?.find(
          change => change.type === 'created' && 
          change.objectType?.includes(`${CONTRACT_CONFIG.packageId}::ticketing::EventData`)
        )?.objectId;
        if (eventObjectId) extractionMethod = 'Full package path match';
      }
      
      // Method 3: Look for any object containing our package ID
      if (!eventObjectId) {
        const packageObjects = result.objectChanges?.filter(
          change => change.type === 'created' && 
          change.objectType?.includes(CONTRACT_CONFIG.packageId)
        );
        console.log('🔍 Objects from our package:', packageObjects);
        
        if (packageObjects && packageObjects.length === 1) {
          eventObjectId = packageObjects[0].objectId;
          extractionMethod = 'Single package object';
        } else if (packageObjects && packageObjects.length > 1) {
          // Multiple objects created - try to find the EventData one
          const eventObject = packageObjects.find(obj => 
            obj.objectType?.toLowerCase().includes('event') ||
            obj.objectType?.toLowerCase().includes('data')
          );
          if (eventObject) {
            eventObjectId = eventObject.objectId;
            extractionMethod = 'Multiple objects - event pattern';
          }
        }
      }
      
      // Method 4: Look for objects created in events (Sui events)
      if (!eventObjectId && result.events && result.events.length > 0) {
        console.log('🔍 Checking transaction events for object creation:', result.events);
        for (const event of result.events) {
          if (event.parsedJson && event.parsedJson.event_id) {
            eventObjectId = event.parsedJson.event_id;
            extractionMethod = 'Transaction event';
            break;
          }
        }
      }
      
      // Method 5: Fallback - use the first created object if it's the only one
      if (!eventObjectId && allCreatedObjects.length === 1) {
        eventObjectId = allCreatedObjects[0].objectId;
        extractionMethod = 'Single created object fallback';
        console.log('⚠️ Using fallback method - single created object');
      }
      
      console.log('🔍 EVENT OBJECT EXTRACTION RESULT:', {
        found: !!eventObjectId,
        objectId: eventObjectId,
        method: extractionMethod,
        totalCreatedObjects: allCreatedObjects.length
      });
      
      if (eventObjectId) {
        console.log(`✅ Successfully extracted event object ID: ${eventObjectId} (method: ${extractionMethod})`);
        
        // Auto-generate next event ID
        const existingEventIds = Object.keys(CONTRACT_CONFIG.eventObjectIds).map(Number);
        const nextEventId = existingEventIds.length > 0 ? Math.max(...existingEventIds) + 1 : 1;
        
        // Automatically add to runtime configuration
        CONTRACT_CONFIG.eventObjectIds[nextEventId] = eventObjectId;
        
        // Save to localStorage for persistence across sessions
        const dynamicEvents = JSON.parse(localStorage.getItem('dynamic_events') || '{}');
        dynamicEvents[nextEventId] = {
          objectId: eventObjectId,
          name: eventForm.name,
          description: eventForm.description,
          venue: eventForm.venue,
          address: eventForm.address,
          eventDate: eventDateTime,
          time: eventForm.time,
          closingTime: eventForm.closingTime,
          vipPrice: parseFloat(eventForm.vipPrice),
          normalPrice: parseFloat(eventForm.normalPrice),
          totalVipSeats: parseInt(eventForm.vipSeats),
          totalNormalSeats: parseInt(eventForm.normalSeats),
          category: eventForm.category,
          language: eventForm.language || 'English',
          ageRating: eventForm.ageRating || 'All Ages',
          genres: eventForm.genres || '',
          imageUrl: eventForm.imageUrl || '',
          seatingImageUrl: eventForm.seatingImageUrl || '',
          importantNotices: eventForm.importantNotices || '',
          termsAndConditions: eventForm.termsAndConditions || '',
          createdAt: Date.now(),
          transactionHash: result.digest
        };
        localStorage.setItem('dynamic_events', JSON.stringify(dynamicEvents));
        
        alert(`🎉 Event created successfully and automatically configured!

Event Name: ${eventForm.name}
Event ID: ${nextEventId}
Event Object ID: ${eventObjectId}
Extraction Method: ${extractionMethod}

✅ The event is now immediately available for ticket purchases!
✅ Buyers can now visit: /seat-selection/${nextEventId}

Transaction Hash: ${result.digest}`);
        
        // Reset form with all fields
        setEventForm({
          name: '',
          description: '',
          venue: '',
          address: '',
          eventDate: '',
          time: '',
          closingTime: '',
          vipPrice: '',
          normalPrice: '',
          vipSeats: '',
          normalSeats: '',
          category: '',
          language: '',
          ageRating: '',
          genres: '',
          imageUrl: '',
          seatingImageUrl: '',
          importantNotices: '',
          termsAndConditions: ''
        });
      } else {
        // Enhanced error message with debugging info
        const debugInfo = {
          transactionStatus: result.effects?.status?.status,
          objectChangesCount: result.objectChanges?.length || 0,
          createdObjectsCount: allCreatedObjects.length,
          allObjectTypes: allCreatedObjects.map(obj => obj.objectType),
          packageId: CONTRACT_CONFIG.packageId,
          extractionMethods: [
            'EventData pattern match',
            'Full package path match', 
            'Single package object',
            'Multiple objects - event pattern',
            'Transaction event',
            'Single created object fallback'
          ]
        };
        
        console.error('❌ EVENT OBJECT EXTRACTION FAILED:', debugInfo);
        
        throw new Error(`Could not extract event object ID from transaction result.

DEBUG INFO:
- Transaction Status: ${debugInfo.transactionStatus}
- Objects Created: ${debugInfo.createdObjectsCount}
- Object Types: ${debugInfo.allObjectTypes.join(', ') || 'None'}
- Package ID: ${debugInfo.packageId}

This usually means:
1. The contract function didn't create an EventData object
2. The object type doesn't match expected patterns
3. Multiple objects were created and we couldn't identify the event

Check browser console for full transaction details.`);
      }
      
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`Failed to create event: ${error.message}`);
    } finally {
      setIsCreatingEvent(false);
    }
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
            {/* Show Organizer tab only if current wallet is the organizer */}
            {address === CONTRACT_CONFIG?.organizerAddress && (
              <button
                className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                  active === "organizer" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
                }`}
                onClick={() => setActive("organizer")}
              >
                <div className="flex items-center">
                  <span className="mr-2">🎭</span>
                  Organizer
                </div>
              </button>
            )}
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
              walletInfo,
              tickets,
              loadingTickets,
              showPurchaseSuccess,
              clearDemoPurchases,
              handleViewDetails,
              showAccountSelector,
              wallet,
              setShowAccountSelector,
              balanceLoading,
              getFormattedBalance,
              eventForm,
              setEventForm,
              handleCreateEvent,
              isCreatingEvent
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