import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";

// Function to add cache-busting parameter to image URLs
const addCacheBuster = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${url}${separator}v=${timestamp}&r=${random}`;
};

// Function to get banner image based on event ID (using home page images)
const getEventBannerImage = (eventId) => {
  const homePageImages = {
    1: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2181107453-20241209114519432.jpg?q=w_3000,c_fill",
    2: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2",
    3: "https://i.ytimg.com/vi/pX___DCt-6g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAz22YiPPDDDQc0ADmQ6r-oNyz5iQ",
    4: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg"
  };
  
  return addCacheBuster(homePageImages[eventId] || homePageImages[1]);
};

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

// Sample events data (in a real app, this would come from an API)
const sampleEvents = [
  {
    id: 1,
    name: "Taylor Swift - The Eras Tour",
    date: "2024-12-15",
    time: "8:00 PM",
    closingTime: "11:30 PM",
    venue: "MetLife Stadium",
    address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    price: "$150",
    image: "🎤",
    description: "Experience the magic of Taylor Swift's The Eras Tour live in concert. This spectacular show features hits from all of Taylor's albums, stunning visuals, and unforgettable performances.",
    category: "Concert",
    availableTickets: 45,
    totalTickets: 100,
    language: "English",
    ageRating: "All Ages",
    genres: ["Pop", "Country", "Alternative"],
    importantNotices: "Please arrive 30 minutes before the show. No cameras or recording devices allowed. Bags must be clear and no larger than 12x12 inches. Food and beverages available for purchase inside the venue.",
    termsAndConditions: "Tickets are non-refundable and non-transferable. The venue reserves the right to refuse entry. All attendees must comply with venue policies and security measures. In case of event cancellation, refunds will be processed within 30 days.",
    seatingImage: "https://www.usatoday.com/gcdn/authoring/images/smg/2024/06/08/USAT/73857881007-AFP_2153868989.jpeg?crop=2999,1687,x0,y0&width=2999&height=1687&format=pjpg&auto=webp&v=2"
  },
  {
    id: 2,
    name: "Ed Sheeran Live in Concert",
    date: "2024-11-20",
    time: "7:30 PM",
    closingTime: "10:45 PM",
    venue: "Madison Square Garden",
    address: "4 Pennsylvania Plaza, New York, NY 10001",
    price: "$120",
    image: "🎸",
    description: "Join Ed Sheeran for an intimate evening of acoustic and electric performances featuring his greatest hits and latest releases.",
    category: "Concert",
    availableTickets: 23,
    totalTickets: 80,
    language: "English",
    ageRating: "All Ages",
    genres: ["Pop", "Folk", "Acoustic"],
    importantNotices: "Doors open at 6:30 PM. No professional cameras allowed. Small personal cameras are permitted. Please check the venue's bag policy before arrival.",
    termsAndConditions: "Tickets are non-refundable. The artist reserves the right to modify the setlist. All sales are final. No outside food or beverages.",
    seatingImage: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2"
  },
  {
    id: 3,
    name: "NBA Finals Game 7",
    date: "2024-06-15",
    time: "8:30 PM",
    closingTime: "11:00 PM",
    venue: "Chase Center",
    address: "1 Warriors Way, San Francisco, CA 94158",
    price: "$200",
    image: "🏀",
    description: "Witness the ultimate showdown in basketball as the NBA Finals reach their thrilling conclusion in Game 7.",
    category: "Sports",
    availableTickets: 12,
    totalTickets: 50,
    language: "English",
    ageRating: "All Ages",
    genres: ["Basketball", "Sports"],
    importantNotices: "Gates open 90 minutes before tip-off. No large bags or backpacks. Clear bag policy in effect. Arrive early for security screening.",
    termsAndConditions: "Tickets are non-refundable. Game time subject to change. No re-entry allowed. Follow all arena policies and security procedures.",
    seatingImage: "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/06/21/USAT/84302193007-shaigilgeousalexandershootsnbafinalsgame-6.jpg?crop=5439,3060,x0,y210&width=660&height=371&format=pjpg&auto=webp&v=2"
  },
  {
    id: 4,
    name: "Comic Con 2024",
    date: "2024-07-25",
    time: "10:00 AM",
    closingTime: "7:00 PM",
    venue: "Convention Center",
    address: "123 Convention Blvd, San Diego, CA 92101",
    price: "$80",
    image: "🎭",
    description: "The biggest comic book and pop culture convention featuring celebrity panels, exclusive merchandise, and cosplay competitions.",
    category: "Convention",
    availableTickets: 156,
    totalTickets: 500,
    language: "English",
    ageRating: "All Ages",
    genres: ["Comics", "Pop Culture", "Gaming"],
    importantNotices: "Cosplay weapons must be peace-bonded. No real weapons allowed. Photography is permitted but respect others' privacy. Food and drinks available for purchase.",
    termsAndConditions: "Tickets are non-refundable. The convention reserves the right to modify the schedule. All attendees must follow convention rules and policies.",
    seatingImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg"
  }
];

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    importantNotices: false,
    termsAndConditions: false
  });

  useEffect(() => {
    if (id) {
      const foundEvent = sampleEvents.find(e => e.id === parseInt(id));
      setEvent(foundEvent);
    }
  }, [id]);

  if (!event) {
    return (
      <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-2">Event Not Found</h1>
          <p className="text-gray-600 font-domine mb-4">The event you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] transition-colors font-medium font-domine"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${chonburi.variable} ${domine.variable}`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="flex items-center text-[#D84040] hover:text-[#A31D1D] font-medium font-domine mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </button>

        {/* Event Banner Image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-110"
              style={{
                backgroundImage: `url('${getEventBannerImage(event.id)}')`,
                animation: 'zoomInOut 8s ease-in-out infinite'
              }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold font-chonburi mb-2 drop-shadow-lg">{event.name}</h1>
                <p className="text-2xl font-domine opacity-90 drop-shadow-lg">{event.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Event Info */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-6">Event Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#D84040] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold font-domine">{event.date}</p>
                        <p className="text-gray-600 text-sm font-domine">{event.time} - {event.closingTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#D84040] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold font-domine">{event.venue}</p>
                        <p className="text-gray-600 text-sm font-domine">{event.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#D84040] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <div>
                        <p className="font-semibold font-domine">Language</p>
                        <p className="text-gray-600 text-sm font-domine">{event.language}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#D84040] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <p className="font-semibold font-domine">Age Rating</p>
                        <p className="text-gray-600 text-sm font-domine">{event.ageRating}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#D84040] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <div>
                        <p className="font-semibold font-domine">Genres</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {event.genres.map((genre, index) => (
                            <span key={index} className="bg-[#ECDCBF] text-[#D84040] px-2 py-1 rounded-full text-xs font-domine">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#D84040] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <div>
                        <p className="font-semibold font-domine">{event.availableTickets} tickets available</p>
                        <p className="text-gray-600 text-sm font-domine">out of {event.totalTickets} total</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-4">Description</h3>
                  <p className="text-gray-700 font-domine leading-relaxed">{event.description}</p>
                </div>

                {/* Important Notices */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-4">Important Notices</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className={`text-gray-700 font-domine leading-relaxed ${!expandedSections.importantNotices && 'line-clamp-3'}`}>
                      {event.importantNotices}
                    </div>
                    {event.importantNotices.length > 150 && (
                      <button 
                        onClick={() => setExpandedSections(prev => ({...prev, importantNotices: !prev.importantNotices}))}
                        className="text-[#D84040] font-semibold font-domine mt-2 hover:underline"
                      >
                        {expandedSections.importantNotices ? 'View Less' : 'View More'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-4">Terms and Conditions</h3>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                    <div className={`text-gray-700 font-domine leading-relaxed ${!expandedSections.termsAndConditions && 'line-clamp-3'}`}>
                      {event.termsAndConditions}
                    </div>
                    {event.termsAndConditions.length > 150 && (
                      <button 
                        onClick={() => setExpandedSections(prev => ({...prev, termsAndConditions: !prev.termsAndConditions}))}
                        className="text-[#D84040] font-semibold font-domine mt-2 hover:underline"
                      >
                        {expandedSections.termsAndConditions ? 'View Less' : 'View More'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Purchase */}
              <div className="bg-gray-50 rounded-lg p-6 h-fit">
                <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-6">Purchase Tickets</h2>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold font-domine">Ticket Price</span>
                      <span className="text-2xl font-bold text-[#D84040] font-domine">{event.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-domine">Original price - no markup</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold font-domine">Booking Fee</span>
                      <span className="text-lg font-bold text-[#D84040] font-domine">4%</span>
                    </div>
                    <p className="text-sm text-gray-600 font-domine">Standard processing fee</p>
                  </div>

                  <div className="bg-[#D84040] rounded-lg p-4 text-white">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold font-domine">Total Price</span>
                      <span className="text-2xl font-bold font-domine">
                        ${(parseFloat(event.price.replace('$', '')) * 1.04).toFixed(0)}
                      </span>
                    </div>
                    <p className="text-sm opacity-90 font-domine">per ticket</p>
                  </div>

                  <button 
                    onClick={() => router.push(`/seat-selection/${event.id}`)}
                    className="w-full bg-[#D84040] text-white py-4 rounded-full hover:bg-[#A31D1D] transition-colors font-bold text-lg font-domine"
                  >
                    Buy Tickets
                  </button>

                  <p className="text-center text-sm text-gray-600 font-domine">
                    You need to sign in to purchase tickets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes zoomInOut {
          0%, 100% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
} 