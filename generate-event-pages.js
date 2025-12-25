// generate-event-pages.js
// Run this with: node generate-event-pages.js

const fs = require('fs');
const path = require('path');

// Import your events (adjust the path as needed)
const events = require('./events-data.js');

const SITE_URL = 'https://mobilitytrajectories.netlify.app'; // Change this to your actual Netlify domain
const OUTPUT_DIR = './event';

// Helper function to strip HTML tags
function stripHTML(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Helper function to truncate text
function truncate(text, length) {
  if (text.length <= length) return text;
  return text.substr(0, length - 3) + '...';
}

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate a page for each event
events.forEach(event => {
  const eventDir = path.join(OUTPUT_DIR, event.slug);
  
  // Create event directory
  if (!fs.existsSync(eventDir)) {
    fs.mkdirSync(eventDir, { recursive: true });
  }

  // Prepare meta content
  const title = event.title;
  const description = truncate(stripHTML(event.description), 200);
  const image = event.image || 'https://raw.githubusercontent.com/gkankia/The-History-of-Urban-Mobility-Governance-in-Tbilisi/refs/heads/main/img/%E1%83%99%E1%83%95%E1%83%98%E1%83%A0%E1%83%98%E1%83%A1%20%E1%83%9E%E1%83%90%E1%83%9A%E1%83%98%E1%83%A2%E1%83%A0%E1%83%90%20-3%202004.png';
  const eventUrl = `${SITE_URL}/event/${event.slug}/`;
  const mainUrl = `${SITE_URL}/index.html#${event.slug}`;

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Event-specific meta tags -->
  <title>${title} | პოსტრევოლუციური მმართველობა</title>
  
  <!-- Open Graph -->
  <meta property="og:site_name" content="Urban Mobility Timeline" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${eventUrl}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${eventUrl}" />
  
  <!-- Redirect to main timeline with hash -->
  <meta http-equiv="refresh" content="0; url=${mainUrl}">
  <script>
    // Immediate redirect
    window.location.replace("${mainUrl}");
  </script>
  
  <style>
    body {
      font-family: 'IBM Plex Mono', monospace;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .loading {
      text-align: center;
    }
    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #d32121;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="loading">
    <div class="spinner"></div>
    <p>Loading timeline...</p>
    <p><small>თუ არ გადაიტანეთ ავტომატურად, <a href="${mainUrl}">დააჭირეთ აქ</a></small></p>
  </div>
  
  <noscript>
    <meta http-equiv="refresh" content="0; url=${mainUrl}">
  </noscript>
</body>
</html>`;

  // Write the file
  const filePath = path.join(eventDir, 'index.html');
  fs.writeFileSync(filePath, html);
  console.log(`✓ Generated: ${filePath}`);
});

console.log(`\n✅ Successfully generated ${events.length} event pages!`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
console.log(`\n🚀 Deploy to Netlify to see the results.`);