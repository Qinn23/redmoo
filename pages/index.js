import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AuroraText } from "@/components/magicui/aurora-text";

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

// Sample events data - moved outside component to avoid initialization issues
const sampleEvents = [
  {
    id: 1,
    name: "Taylor Swift - The Eras Tour",
    date: "2025-11-15",
    venue: "MetLife Stadium",
    price: "$25",
    image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2181107453-20241209114519432.jpg?q=w_3000,c_fill" 
  },
  {
    id: 2,
    name: "Ed Sheeran Live in Concert",
    date: "2025-12-20",
    venue: "Madison Square Garden",
    price: "$20",
    image: "https://media.cnn.com/api/v1/images/stellar/prod/221003115525-ed-sheeran-file-2021.jpg?c=16x9&q=h_833,w_1480,c_fill" 
  },
  {
    id: 3,
    name: "Jay Chou - Carnival World Tour",
    date: "2026-01-10",
    venue: "Bukit Jalil National Stadium",
    price: "$30",
    image: "https://r2.myc.my/5adec6968135820189a9717cdfa1bba963415498bdf3c741284342ac1dd5de92"
  },
  {
    id: 4,
    name: "BIGBANG - 2025 World Tour",
    date: "2026-02-15",
    venue: "Seoul Olympic Stadium",
    price: "$15",
    image: "https://sbsstar.net/newsnet/etv/upload/2025/04/28/30000988627_1280.webp"
  }
];

// Define the Home component as a proper React component
const Home = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showEvents, setShowEvents] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [allEvents, setAllEvents] = useState([]); // Only dynamic events

  // Load dynamic events from localStorage (ignore hardcoded sample events)
  const loadAllEvents = () => {
    try {
      const dynamicEvents = JSON.parse(localStorage.getItem('dynamic_events') || '{}');
      const dynamicEventsList = Object.entries(dynamicEvents).map(([id, eventData]) => ({
        id: parseInt(id),
        name: eventData.name,
        date: new Date(eventData.eventDate).toISOString().split('T')[0],
        venue: eventData.venue,
        price: `$${eventData.normalPrice}`,
        image: eventData.imageUrl || `https://api.placeholder.com/600x400/D84040/FFFFFF?text=${encodeURIComponent(eventData.name)}`,
        isDynamic: true, // Flag to identify dynamic events
        description: eventData.description,
        vipPrice: eventData.vipPrice,
        normalPrice: eventData.normalPrice,
        eventDateTime: eventData.eventDate,
        time: eventData.time,
        closingTime: eventData.closingTime,
        category: eventData.category,
        totalVipSeats: eventData.totalVipSeats,
        totalNormalSeats: eventData.totalNormalSeats
      }));
      
      // Only use dynamic events (ignore hardcoded sample events)
      setAllEvents(dynamicEventsList);
      console.log('🎫 Loaded dynamic events:', dynamicEventsList.length, 'events created by organizers');
      
      // If no dynamic events exist, show a placeholder
      if (dynamicEventsList.length === 0) {
        console.log('ℹ️ No dynamic events found. Events will appear here when organizers create them.');
      }
    } catch (error) {
      console.error('❌ Error loading dynamic events:', error);
      setAllEvents([]); // Empty array if error
    }
  };

  // Load events on component mount and when localStorage changes
  useEffect(() => {
    loadAllEvents();
    
    // Listen for storage changes to update events in real-time
    const handleStorageChange = (e) => {
      if (e.key === 'dynamic_events') {
        loadAllEvents();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowEvents(e.target.value.length > 0);
  };

  // NEW: Carousel navigation
  const handleNextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % allEvents.length);
  };

  const currentEvent = allEvents[currentEventIndex];

  return (
    <div>
      {/* Event Showcase Carousel (shadcn/ui style) */}
      <div className="flex justify-center items-center mb-8 animate-fade-in-up">
        {allEvents.length > 0 ? (
          <Carousel className="w-full max-w-6xl rounded-2xl overflow-hidden">
            <CarouselContent>
              {allEvents.map((event, index) => (
                <CarouselItem key={event.id} className="p-0 h-full">
                  <Card className="rounded-none border-none bg-transparent shadow-lg h-full">
                    <CardContent className="flex p-0 aspect-[21/9] relative h-full w-full overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="object-cover w-full h-full"
                        style={{ aspectRatio: '21/6', objectPosition: 'center 30%' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pl-12 pr-6 pb-6 pt-6 z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white font-chonburi mb-2">{event.name}</h2>
                        <div className="text-gray-200 font-domine mb-1">{event.date} &bull; {event.venue}</div>
                        <div className="text-[#FFD700] font-bold font-domine text-lg">{event.price}</div>
                        <button
                          onClick={() => router.push(`/event/${event.id}`)}
                          className="absolute bottom-6 right-6 bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all shadow-lg z-20"
                        >
                          View Details
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 z-20 bg-[#D84040] text-white hover:bg-[#A31D1D]" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 z-20 bg-[#D84040] text-white hover:bg-[#A31D1D]" />
          </Carousel>
        ) : (
          <div className="w-full max-w-6xl">
            <Card className="rounded-2xl border-2 border-dashed border-gray-300 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center p-12 aspect-[21/9] bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]">
                <div className="text-6xl mb-4">🎭</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#A31D1D] font-chonburi mb-4">No Events Available</h2>
                <p className="text-gray-600 font-domine text-center max-w-lg mb-6">
                  Events created by organizers will appear here. Organizers can create events through their profile dashboard.
                </p>
                <button
                  onClick={() => router.push('/connect-wallet')}
                  className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all shadow-lg"
                >
                  Connect as Organizer
                </button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      {/* Hero Section */}
      <div className="text-center mb-8 animate-fade-in-up">
        <section id="header">
          <BlurFade delay={0.25} inView>
            <h2 className="text-5xl md:text-6xl font-bold text-[#A31D1D] mb-6 font-chonburi">
              Buy your ticket <AuroraText colors={["#A31D1D", "#FFE5B4"]}>Now</AuroraText>
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <span className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-domine">
          Buy and sell verified tickets here. No scams, No PDFs, just you and your wallet.
            </span>
          </BlurFade>
        </section>
      </div>

      {/* Search Bar - Moved below subtitle */}
      <div className="text-center mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            placeholder={allEvents.length > 0 ? "Search for your favourite event..." : "No events available to search"}
            value={searchQuery}
            onChange={handleSearch}
            disabled={allEvents.length === 0}
            className={`w-full px-6 py-4 rounded-full bg-white text-[#D84040] font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040] focus:ring-opacity-50 placeholder-[#A31D1D] shadow-lg border-2 border-[#D84040] ${
              allEvents.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </div>

      {/* Events Display Section - Moved below search bar */}
      {showEvents && (
        <div className="mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-3xl font-bold text-center text-[#A31D1D] mb-8 font-chonburi">
            {allEvents.length > 0 ? 'Available Events' : 'No Events Created Yet'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(() => {
              if (allEvents.length === 0) {
                return (
                  <div className="col-span-full text-center py-16">
                    <div className="text-6xl mb-4">🎪</div>
                    <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-2">No Events Available</h3>
                    <p className="text-gray-600 font-domine mb-6">
                      Events created by organizers will appear here. Connect as an organizer to start creating events!
                    </p>
                    <button
                      onClick={() => router.push('/connect-wallet')}
                      className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all shadow-lg"
                    >
                      Become an Organizer
                    </button>
                  </div>
                );
              }
              
              const filteredEvents = allEvents
                .filter(event =>
                  searchQuery.length === 0 ||
                  event.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
              if (filteredEvents.length === 0) {
                return (
                  <div className="col-span-full text-center text-gray-500 font-domine text-lg py-8">
                    No events found matching "{searchQuery}".
                  </div>
                );
              }
              return filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up flex flex-col h-full transform hover:-translate-y-1"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                  <div className="aspect-[21/9] w-full mb-4 text-center flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.name}
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-domine line-clamp-2">{event.name}</h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-gray-600 text-sm font-domine flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.venue}
                    </p>
                    <p className="text-gray-600 text-sm font-domine flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-[#D84040] font-bold text-lg font-domine">{event.price}</span>
                  <button 
                    onClick={() => router.push(`/event/${event.id}`)}
                    className="bg-[#D84040] text-white px-4 py-2 rounded-full hover:bg-[#A31D1D] transition-colors font-medium text-sm font-domine"
                  >
                    View Details
                  </button>
                </div>
              </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <h2 className="text-3xl font-bold text-left text-[#A31D1D] mb-8 mt-16 font-chonburi">Platform Features</h2>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="scroll-m-20 text-xl font-semibold tracking-tight text-[#A31D1D] hover:text-[#D84040] transition-colors">One Wallet, One Account</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg md:text-xl" style={{color: '#423632'}}>Your blockchain wallet is your identity. No more complicated sign-ups or forgotten passwords.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="scroll-m-20 text-xl font-semibold tracking-tight text-[#A31D1D] hover:text-[#D84040] transition-colors">Fair Ticket Distribution</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg md:text-xl" style={{color: '#423632'}}>Each wallet can purchase up to <b>4 tickets</b> per event, preventing scalping and ensuring fair access for all fans.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="scroll-m-20 text-xl font-semibold tracking-tight text-[#A31D1D] hover:text-[#D84040] transition-colors">Resale is Allowed Only on Our Platform</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg md:text-xl" style={{color: '#423632'}}>Resell your tickets securely here — tickets can’t be sold outside our marketplace, protecting you from fraud and scams.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="scroll-m-20 text-xl font-semibold tracking-tight text-[#A31D1D] hover:text-[#D84040] transition-colors">Resale Rules & Anti-Scalping</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg md:text-xl" style={{color: '#423632'}}>
                All resale tickets on RedMoo can only be sold for a maximum of <b>110% of their original price</b> — no scalper tickets allowed!<br/>
                Users who attempt to resell tickets more than <b>10 times</b> will be automatically banned from the our website.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <h2 className="text-3xl font-bold text-center text-[#A31D1D] mb-8 font-chonburi">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">1</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Connect Your Wallet</h3>
            <p className="text-gray-600 text-sm font-domine">Link your Sui blockchain wallet to the platform to authenticate your identity instantly.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">2</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Browse & Select Tickets</h3>
            <p className="text-gray-600 text-sm font-domine">Explore upcoming concerts, shows, and events. Choose up to 4 tickets per event per wallet and proceed to checkout.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">3</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Make Payment</h3>
            <p className="text-gray-600 text-sm font-domine">Pay securely using SUI tokens. All transactions are recorded on-chain for transparency.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">4</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Receive Tickets</h3>
            <p className="text-gray-600 text-sm font-domine">Your tickets will be automatically assigned to your wallet address — no PDFs or physical tickets needed. Show your tickets at the event. Enjoy!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Home component
const Home_Component = Home;

// Do not specify a custom getLayout
// This will make the page use the default Layout from _app.js

// Export the enhanced component
export default Home_Component;
