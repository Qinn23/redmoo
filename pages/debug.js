import { useEffect, useState } from 'react';

export default function Debug() {
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const dynamicEvents = JSON.parse(localStorage.getItem('dynamic_events') || '{}');
      setEvents(dynamicEvents);
      console.log('=== DEBUG: Dynamic Events Data ===');
      console.log('Raw localStorage data:', localStorage.getItem('dynamic_events'));
      console.log('Parsed events:', dynamicEvents);
      
      Object.entries(dynamicEvents).forEach(([id, event]) => {
        console.log(`\n=== EVENT ID: ${id} ===`);
        console.log('Name:', event.name);
        console.log('VIP Seats (totalVipSeats):', event.totalVipSeats);
        console.log('Normal Seats (totalNormalSeats):', event.totalNormalSeats);
        console.log('VIP Price:', event.vipPrice);
        console.log('Normal Price:', event.normalPrice);
        console.log('All fields:', Object.keys(event));
      });
    } catch (error) {
      console.error('Error loading events:', error);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug: Dynamic Events Data</h1>
      <p>Check the browser console for detailed logs</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Events found: {Object.keys(events).length}</h2>
        
        {Object.entries(events).map(([id, event]) => (
          <div key={id} style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '15px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>Event ID: {id}</h3>
            <p><strong>Name:</strong> {event.name}</p>
            <p><strong>VIP Seats:</strong> {event.totalVipSeats}</p>
            <p><strong>Normal Seats:</strong> {event.totalNormalSeats}</p>
            <p><strong>VIP Price:</strong> ${event.vipPrice}</p>
            <p><strong>Normal Price:</strong> ${event.normalPrice}</p>
            <p><strong>Object ID:</strong> {event.objectId}</p>
            
            <details style={{ marginTop: '10px' }}>
              <summary>Full Event Data</summary>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                {JSON.stringify(event, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
