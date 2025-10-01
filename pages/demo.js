import { useEffect } from 'react';

export default function Demo() {
  useEffect(() => {
    // Redirect to the static demo HTML file
    window.location.href = '/lokus-demo/index-web.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Loading Lokus Demo...</h1>
        <p>Redirecting to the interactive demo...</p>
        <p>
          <a href="/lokus-demo/index-web.html" style={{ color: '#0066cc' }}>
            Click here if not redirected automatically
          </a>
        </p>
      </div>
    </div>
  );
}