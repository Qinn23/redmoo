import '../styles/globals.css';
import { WalletProvider, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';

// Define full set of networks
const networks = {
  devnet: getFullnodeUrl('devnet'),
  testnet: getFullnodeUrl('testnet'),
  mainnet: getFullnodeUrl('mainnet'),
  localnet: 'http://127.0.0.1:9000',
};

// Create a React Query client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  // Check if the component has a getLayout function
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>
          {getLayout(<Component {...pageProps} />)}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
