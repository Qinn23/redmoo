import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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

export default function Layout({ children }) {
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // NEW STATE

  useEffect(() => {
    setWalletConnected(typeof window !== 'undefined' && localStorage.getItem('walletConnected') === 'true');
    const onStorage = () => setWalletConnected(localStorage.getItem('walletConnected') === 'true');
    window.addEventListener('storage', onStorage);
    // Listen for changes from logout or switch account (in-page)
    const interval = setInterval(() => {
      setWalletConnected(localStorage.getItem('walletConnected') === 'true');
    }, 500);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex flex-col`}>
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#D84040] animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}> 
              <div className="w-10 h-10 bg-[#D84040] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-chonburi">R</span>
              </div>
              <span className="text-2xl font-bold text-[#D84040] font-chonburi">RedMoo</span>
            </div>
            {/* Navigation + Connect Wallet */}
            <div className="flex items-center space-x-4">
              <nav className="flex items-center space-x-4">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                      type="button"
                    >
                      Buy Tickets
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    sideOffset={8}
                    className="bg-white border border-gray-200 rounded shadow-lg py-1 w-44 animate-fade-in z-50"
                  >
                    <DropdownMenu.Item
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer font-domine"
                      onSelect={() => { router.push('/original'); }}
                    >
                      Original Tickets
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer font-domine"
                      onSelect={() => { router.push('/resale'); }}
                    >
                      Resale Tickets
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </nav>
              {!walletConnected ? (
                <button
                  onClick={() => router.push('/connect-wallet')}
                  className="bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={() => router.push('/profile')}
                  className="bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg"
                >
                  Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex-1">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-[#D84040] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-chonburi">R</span>
                </div>
                <span className="text-xl font-bold font-chonburi">RedMoo</span>
              </div>
              <p className="text-gray-300 mb-4 font-domine">
                Your trusted platform for secure ticket reselling with blockchain technology.
              </p>
              <p className="text-sm text-gray-400 font-domine">
                © 2025 RedMoo. All rights reserved.
              </p>
            </div>
            {/* Partners */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-domine">Our Partners</h3>
              <div className="flex items-center space-x-3">
              <img src="/sui-logo.svg" alt="SUI Blockchain" className="w-6 h-6" />
                <span className="text-gray-300 font-domine text-lg">SUI Blockchain</span>
              </div>
            </div>
            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-domine">About Us</h3>
              <ul className="space-y-2 text-gray-300 font-domine">
                <li>Our Mission</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Our Media</li>
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-domine">Contact Us</h3>
              <ul className="space-y-2 text-gray-300 font-domine">
                <li>Support</li>
                <li>Sales</li>
                <li>Partnerships</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
}