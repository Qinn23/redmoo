# 🎫 RedMoo - NFT Ticket Marketplace on Sui

A decentralized event ticketing platform built on Sui blockchain, featuring NFT tickets, wallet integration, and smart contract-powered transactions.

## ✨ Features

- 🎯 **NFT Tickets**: Each ticket is a unique NFT stored on Sui blockchain
- 💼 **Suiet Wallet Integration**: Connect with Suiet wallet in devnet mode
- 🏟️ **Interactive Seat Selection**: Visual seat selection with VIP and standard sections
- 💰 **Blockchain Payments**: Pay with SUI tokens directly from your wallet
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔒 **Secure Transactions**: All purchases secured by Sui smart contracts
- 👤 **User Profiles**: View owned NFT tickets in your profile
- 🚰 **Devnet Faucet**: Request test SUI tokens for development

## 🚀 Quick Start

### Prerequisites

1. **Install Sui CLI**
   ```bash
   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui
   ```

2. **Install Suiet Wallet**
   - Visit [https://suiet.app/](https://suiet.app/)
   - Install the browser extension
   - Create a wallet and switch to Devnet

3. **Node.js & npm**
   - Node.js 18+ required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/redmoo.git
   cd redmoo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Deploy the smart contract**
   ```bash
   # Make the deploy script executable
   chmod +x scripts/deploy.js
   
   # Run deployment
   node scripts/deploy.js
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Connect your Suiet wallet
   - Request test SUI from the faucet
   - Start buying NFT tickets!

## 📋 Smart Contract Architecture

### Core Components

1. **TicketNFT**: Individual ticket NFTs with event and seat information
2. **Event**: Shared objects representing events with seat management
3. **WalletTicketCount**: Tracks ticket limits per wallet
4. **OrganizerCap**: Capability for event organizers

### Key Functions

- `create_event()`: Create new events (organizer only)
- `purchase_ticket()`: Buy tickets with SUI tokens
- `withdraw_funds()`: Withdraw event revenue (organizer only)
- `toggle_event_status()`: Enable/disable ticket sales

## 🎮 User Guide

### For Ticket Buyers

1. **Connect Wallet**
   - Click "Connect Wallet" on the homepage
   - Select Suiet wallet
   - Approve the connection

2. **Get Test SUI**
   - Go to your profile
   - Click "Request Test SUI (Faucet)"
   - Wait for funds to arrive

3. **Browse Events**
   - View available events on the homepage
   - Click on an event to see details

4. **Select Seats**
   - Choose your preferred seats
   - VIP seats have premium pricing
   - Maximum 4 tickets per wallet

5. **Purchase Tickets**
   - Review your selection
   - Click "Purchase with Wallet"
   - Approve the transaction in Suiet
   - View your NFT tickets in your profile

### For Event Organizers

1. **Deploy Contract** (if not done)
   - Run the deployment script
   - Note the organizer capability object ID

2. **Create Events**
   - Use the smart contract functions
   - Set pricing, capacity, and details

3. **Manage Sales**
   - Toggle event status
   - Withdraw collected funds

## 🛠️ Development

### Project Structure

```
redmoo/
├── contracts/ticket_nft/          # Move smart contract
│   ├── sources/ticket_nft.move    # Main contract code
│   └── Move.toml                  # Contract configuration
├── pages/                         # Next.js pages
│   ├── index.js                   # Homepage
│   ├── connect-wallet.js          # Wallet connection
│   ├── profile.js                 # User profile
│   ├── event/[id].js             # Event details
│   └── seat-selection/[id].js     # Seat selection
├── wallet/useWallet.js            # Wallet utilities
├── utils/contract-interactions.js # Smart contract utilities
├── scripts/deploy.js              # Deployment script
└── components/                    # React components
```

### Key Technologies

- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Sui, Move language
- **Wallet**: Suiet wallet integration
- **State Management**: React hooks

### Environment Configuration

The application automatically connects to Sui Devnet. For production deployment:

1. Update RPC endpoints in `wallet/useWallet.js`
2. Deploy contracts to mainnet
3. Update contract addresses in configuration

## 🔧 Smart Contract Deployment

### Manual Deployment

1. **Build the contract**
   ```bash
   cd contracts/ticket_nft
   sui move build
   ```

2. **Deploy to devnet**
   ```bash
   sui client publish --gas-budget 100000000
   ```

3. **Note important object IDs**
   - Package ID
   - Organizer Capability
   - Wallet Tracker (shared object)

4. **Update frontend configuration**
   - Update object IDs in the frontend code
   - Test the integration

### Automated Deployment

The included deployment script handles everything automatically:

```bash
node scripts/deploy.js
```

This script will:
- Check prerequisites
- Build the contract
- Deploy to devnet
- Create a sample event
- Save configuration to `contract-config.json`

## 🎯 Usage Examples

### Purchase a Ticket

```javascript
import { useSuiWallet, contractUtils } from './wallet/useWallet';

const { executeTransaction } = useSuiWallet();

// Create purchase transaction
const tx = contractUtils.createPurchaseTransaction({
  eventObjectId: "0x123...",
  walletTrackerObjectId: "0x456...",
  suiAmount: contractUtils.suiToMist("150"), // 150 SUI
  seatId: "A12",
  seatType: 1, // VIP
  imageUrl: "https://...",
  metadataUrl: "https://...",
  clockObjectId: "0x6",
  packageId: "0x789..."
});

// Execute transaction
const result = await executeTransaction(tx);
```

### Query User Tickets

```javascript
import { getUserTickets } from './utils/contract-interactions';

const tickets = await getUserTickets(suiClient, userAddress);
console.log('User tickets:', tickets);
```

## 🧪 Testing

### Local Testing

1. **Start local Sui network** (optional)
   ```bash
   sui start --with-faucet
   ```

2. **Run tests**
   ```bash
   npm test
   ```

### Devnet Testing

1. Ensure you're connected to devnet
2. Request test SUI from faucet
3. Test all user flows
4. Verify NFT ownership in wallet

## 🚀 Deployment

### Frontend Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   ```bash
   npm run start
   ```

### Smart Contract Deployment

For mainnet deployment:

1. Switch to mainnet environment
2. Ensure sufficient SUI for gas
3. Update Move.toml addresses
4. Deploy with higher gas budget

## 🔒 Security Considerations

- ✅ Seat availability validation
- ✅ Ticket limit enforcement (4 per wallet)
- ✅ Payment verification
- ✅ Organizer capability protection
- ✅ Event status controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: Open a GitHub issue
- **Sui Documentation**: [https://docs.sui.io/](https://docs.sui.io/)
- **Suiet Wallet**: [https://suiet.app/](https://suiet.app/)

## 🎉 Demo

Try the live demo at: [https://redmoo-demo.vercel.app](https://redmoo-demo.vercel.app)

1. Connect your Suiet wallet (devnet)
2. Request test SUI from the faucet
3. Browse events and purchase tickets
4. View your NFT tickets in your profile

---

**Built with ❤️ for the Sui ecosystem**