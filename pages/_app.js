import "@/styles/globals.css";
import Layout from "../components/Layout";
import { SuiClientProvider, WalletProvider as DappKitWalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from '../contexts/WalletContext';

const networks = {
  devnet: getFullnodeUrl('devnet'),
};

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <DappKitWalletProvider>
          <WalletProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WalletProvider>
        </DappKitWalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
