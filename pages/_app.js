import "@/styles/globals.css";
import { WalletKitProvider } from '@mysten/wallet-kit';

export default function App({ Component, pageProps }) {
  return (
    <WalletKitProvider>
      <Component {...pageProps} />
    </WalletKitProvider>
  );
}
