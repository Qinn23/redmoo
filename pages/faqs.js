import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";

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

export default function FAQs() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#A31D1D] font-chonburi mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 font-domine">
            Find answers to common questions about RedMoo NFT tickets
          </p>
        </div>

        {/* FAQ Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#F8F2DE]">
          <div className="p-8 lg:p-12">
            <div className="space-y-8">
              
              {/* FAQ Item 1 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  How do I view my NFT tickets?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  Your purchased tickets will appear in the "My Tickets" section as NFTs stored in your connected wallet. 
                  Simply navigate to your profile page and click on the "My Tickets" tab to view all your NFT tickets.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  Are tickets transferable?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  Yes! Since tickets are NFTs, you can transfer them to other wallets or sell them on compatible NFT marketplaces. 
                  This gives you full ownership and control over your tickets, allowing for peer-to-peer transfers and resales.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  How do I connect my wallet?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  Click the "Profile" button in the top navigation, then select your preferred wallet provider. 
                  We support various Sui-compatible wallets. Make sure you have a Sui wallet extension installed in your browser.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  What happens after I purchase a ticket?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  After purchase, your NFT ticket will be minted directly to your connected wallet. 
                  You'll receive a confirmation and can view your ticket in the "My Tickets" section with a unique QR code for event entry.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  How do I use my NFT ticket for event entry?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  Each NFT ticket comes with a unique QR code. Simply present this QR code at the venue entrance for verification. 
                  The QR code contains encrypted ticket information that event organizers can verify instantly.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  Can I resell my tickets?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  Yes! You can list your NFT tickets for resale on our platform or any compatible NFT marketplace. 
                  Navigate to the "Resale Tickets" section to list your tickets or browse tickets from other users.
                </p>
              </div>

              {/* FAQ Item 7 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  What blockchain network do you use?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  RedMoo operates on the Sui blockchain network, which offers fast transactions and low fees. 
                  All NFT tickets are minted and stored on the Sui network, ensuring security and true ownership.
                </p>
              </div>

              {/* FAQ Item 8 */}
              <div className="pb-6">
                <h3 className="text-xl font-bold text-[#A31D1D] font-domine mb-3">
                  Need more help?
                </h3>
                <p className="text-gray-700 font-domine leading-relaxed">
                  If you have additional questions or need support, please contact our team at{" "}
                  <a 
                    href="mailto:support@redmoo.com" 
                    className="text-[#D84040] underline hover:text-[#A31D1D] transition-colors"
                  >
                    support@redmoo.com
                  </a>
                  . We're here to help you with any issues or questions about your NFT tickets.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Action Buttons - Same Row */}
        <div className="flex justify-between items-center mt-12">
          <div></div> {/* Empty div for spacing */}
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-[#D84040] to-[#A31D1D] text-white px-8 py-3 rounded-lg font-domine font-medium hover:from-[#A31D1D] hover:to-[#8B1919] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Back to Home
          </button>
          <button
            onClick={scrollToTop}
            className="bg-white text-[#D84040] border-2 border-[#D84040] w-12 h-12 rounded-full font-medium hover:bg-[#D84040] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            title="Scroll to Top"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 -2 24 24">
              <path d="M7 14l5-5 5 5H7z"/>
              <path d="M5 6h14v2H5V6z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}