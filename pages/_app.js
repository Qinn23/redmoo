import "@/styles/globals.css";
import Layout from "../components/Layout";
import { WalletProvider as SuietWalletProvider } from '@suiet/wallet-kit';
import { SuiClientProvider, WalletProvider as DappKitWalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from '../contexts/WalletContext';
import '@suiet/wallet-kit/style.css';

const networks = {
  devnet: getFullnodeUrl('devnet'),
};

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <SuietWalletProvider defaultWallets={["Suiet"]} autoConnect={true}>
          <DappKitWalletProvider>
            <WalletProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </WalletProvider>
          </DappKitWalletProvider>
        </SuietWalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
