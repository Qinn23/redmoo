# PowerShell script to build and publish Move contract using Sui CLI
# Navigate to the contract directory
cd d:\Projects\redmoo\contracts\ticket_nft

# Build the Move contract
sui move build

# Publish the contract to the Sui network (adjust gas budget as needed)
sui client publish --gas-budget 100000000
