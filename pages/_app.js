import '../styles/globals.css';
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  // Check if the component has a getLayout function
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  
  return (
    <WalletProvider>
      {getLayout(<Component {...pageProps} />)}
    </WalletProvider>
  );
}
