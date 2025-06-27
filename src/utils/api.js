// Simulated API functions
export const shortenUrl = (longUrl, validity, customShortcode) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate URL
        try {
          new URL(longUrl);
        } catch {
          reject(new Error('Invalid URL format'));
          return;
        }
        
        // Generate shortcode if not provided
        const shortcode = customShortcode || generateRandomShortcode();
        
        // Calculate expiry (default 30 minutes)
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + (validity || 30));
        
        resolve({
          shortcode,
          shortUrl: `http://localhost:3000/${shortcode}`,
          longUrl,
          createdAt: new Date().toISOString(),
          expiry: expiry.toISOString(),
          clicks: 0
        });
      }, 500);
    });
  };
  
  export const trackClick = (shortcode, source, location) => {
    const stats = JSON.parse(localStorage.getItem('urlStats') || '{}');
    const entry = stats[shortcode];
    
    if (entry) {
      entry.clicks += 1;
      entry.clickData.push({
        timestamp: new Date().toISOString(),
        source,
        location
      });
      localStorage.setItem('urlStats', JSON.stringify(stats));
    }
  };
  
  export const getStats = () => {
    return JSON.parse(localStorage.getItem('urlStats') || '{}');
  };
  
  const generateRandomShortcode = () => {
    return Math.random().toString(36).substring(2, 8);
  };