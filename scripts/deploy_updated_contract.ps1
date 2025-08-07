# PowerShell script to build and deploy the updated Sui contract

Write-Host "🚀 Building and deploying updated Sui contract..." -ForegroundColor Green

# Navigate to the contract directory
Set-Location "d:\printx\redmoo\contracts\ticket_nft"

Write-Host "📦 Building contract..." -ForegroundColor Yellow
sui move build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

Write-Host "🌐 Publishing to Sui devnet..." -ForegroundColor Yellow
$publishOutput = sui client publish --gas-budget 100000000 --json

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Contract deployed successfully!" -ForegroundColor Green

# Parse the JSON output to extract important information
$publishResult = $publishOutput | ConvertFrom-Json

# Extract package ID
$packageId = $publishResult.objectChanges | Where-Object { $_.type -eq "published" } | Select-Object -ExpandProperty packageId

# Extract treasury object ID
$treasuryId = $publishResult.objectChanges | Where-Object { $_.objectType -like "*Treasury*" } | Select-Object -ExpandProperty objectId

# Extract wallet tracker object ID
$walletTrackerId = $publishResult.objectChanges | Where-Object { $_.objectType -like "*WalletTracker*" } | Select-Object -ExpandProperty objectId

Write-Host "📋 Deployment Results:" -ForegroundColor Cyan
Write-Host "Package ID: $packageId" -ForegroundColor White
Write-Host "Treasury ID: $treasuryId" -ForegroundColor White
Write-Host "Wallet Tracker ID: $walletTrackerId" -ForegroundColor White

Write-Host ""
Write-Host "🔧 Please update your contract-config.js with these values:" -ForegroundColor Yellow
Write-Host "packageId: '$packageId'," -ForegroundColor White
Write-Host "treasuryId: '$treasuryId'," -ForegroundColor White
Write-Host "objects: {" -ForegroundColor White
Write-Host "  walletTracker: '$walletTrackerId'," -ForegroundColor White
Write-Host "}" -ForegroundColor White

# Navigate back to project root
Set-Location "d:\printx\redmoo"

Write-Host ""
Write-Host "🎉 Contract deployment complete! Update your config file and test event creation." -ForegroundColor Green
