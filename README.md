# 🎫 RedMoo - NFT Ticket Marketplace on Sui

A decentralized event ticketing platform built on the Sui blockchain, featuring NFT tickets, wallet integration, and smart contract-powered transfers.

Our platform uses a secure identity-linked ticketing system where each ticket is tied to a user's SUI wallet address. Users can buy up to 4 tickets per event (not per transaction). We also offer a controlled resale process, allowing each ticket to be resold only once, with a maximum 10% price increase, preventing scalping and ensuring fairness.

## 💡 Inspiration: How We Came Up With This Idea

We noticed that many people struggle to buy tickets for popular events because large groups of scalpers purchase bulk quantities to resell at extremely high prices. As fans ourselves, we experienced the frustration of waiting in line online, only to see tickets sold out within minutes.

This inspired us to think:

    "What if there was a platform that not only made it easy to resell tickets legally but also guaranteed that each ticket truly belonged to the buyer?"

Other key reasons behind our idea:

   - 🎯 Personal Experience: Several team members missed concerts and sports events they were passionate about because tickets were instantly bought up and resold for 3–5 times the original price.

   - 🕵️ Lack of Transparency: Many people end up buying tickets through Xiaohongshu, Instagram, or WhatsApp sellers who often disappear after taking payment, leaving buyers scammed with no way to recover their money.

   - 🛡️ No Buyer Protection: If a resold ticket turned out to be fake or duplicated, buyers usually lost their money and had no support.

   - 🌍 Growing Scalper Problem: As automated bots have become more advanced, ticket scalping has turned into a global issue, harming fans and performers alike.

   - 🪪 Weak Identity Verification: Most ticketing systems rely only on email addresses or printed PDFs, making it easy to forge or resell the same ticket multiple times.

## 🚨 The Problem

Current ticketing systems often allow scalpers to buy dozens or even hundreds of tickets using bots or multiple accounts. These tickets are then resold on unofficial marketplaces, sometimes at prices 200–500% higher than the original. This creates two big problems:

   - Unfair access: Real fans often miss out or are forced to pay exorbitant prices.

   - Fraud and uncertainty: Buyers risk purchasing invalid or duplicated tickets.

## ✅ The Solution

Redmoo Ticket Platform introduces multiple safeguards and innovations:

   - Purchase Limits per Person: Each user can buy up to 4 tickets per event in total, regardless of how many transactions they attempt, stopping scalpers from bypassing limits.

   - SUI Wallet Integration: Each ticket is linked to the buyer's unique SUI wallet address, which serves as proof of ownership. At event entry, staff can verify that the person presenting the ticket is the original purchaser.

   - Controlled Resale: If a buyer can no longer attend, they may resell their ticket one time only on our platform. The resale price is capped at 10% above the original price to keep tickets affordable.

   - Secure Transfers: When a resale payment is successful, the ticket is automatically and instantly transferred to the new owner's SUI wallet. This eliminates fraud and guarantees the authenticity of every resale.

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

## 👥 Our Team

- Chia Jing Yuen
- Lee Zi Qinn
- Low Wen Kai
- Te Yuen Bing

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
