import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const sectionContent = (active, handleLogout, handleSwitchAccount, address) => {
  if (active === "mytickets") {
    return <div className="text-[#A31D1D] font-domine">You have no tickets yet.</div>;
  }
  if (active === "info") {
    return (
      <div className="text-[#A31D1D] font-domine">
        <div className="mb-4">
          <div className="font-bold mb-1">Wallet Address:</div>
          <div className="font-mono text-sm bg-[#F8F2DE] rounded px-3 py-2 inline-block text-[#D84040] border border-[#D84040]">{address}</div>
        </div>
        <div>Profile info will appear here.</div>
      </div>
    );
  }
  if (active === "settings") {
    return (
      <div className="flex flex-col gap-4">
        <button
          className="bg-[#F8F2DE] text-[#A31D1D] px-5 py-3 rounded-lg font-domine font-medium hover:bg-[#ECDCBF] transition-all text-left border border-[#A31D1D]"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <div className="bg-[#F8F2DE] text-[#A31D1D] px-5 py-3 rounded-lg font-domine font-medium border border-[#A31D1D]">
          <div className="font-bold mb-2">FAQs</div>
          <ul className="list-disc pl-5 text-sm">
            <li>How do I log out? Click 'Log Out' to disconnect your wallet and return to the homepage.</li>
            <li>Need more help? Contact support at <a href="mailto:support@redmoo.com" className="text-[#D84040] underline">support@redmoo.com</a>.</li>
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default function Profile() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [active, setActive] = useState("mytickets");
  useEffect(() => {
    setAddress(localStorage.getItem("walletAddress") || "");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    router.push("/");
  };
  const handleSwitchAccount = () => {
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    router.push("/connect-wallet");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-7xl min-h-[700px] border border-[#F8F2DE]">
        {/* Left column: buttons */}
        <div className="bg-gradient-to-b from-[#F8F2DE] to-white p-12 flex flex-col gap-4 w-72 border-r border-[#F8F2DE]">
          <button
            className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${active === "mytickets" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"}`}
            onClick={() => setActive("mytickets")}
          >
            My Tickets
          </button>
          <button
            className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${active === "info" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"}`}
            onClick={() => setActive("info")}
          >
            Info
          </button>
          <button
            className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${active === "settings" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"}`}
            onClick={() => setActive("settings")}
          >
            Settings
          </button>
        </div>
        {/* Right column: content */}
        <div className="flex-1 p-16 flex flex-col bg-white">
          <div className="flex-1">
            {sectionContent(active, handleLogout, handleSwitchAccount, address)}
          </div>
        </div>
      </div>
    </div>
  );
}