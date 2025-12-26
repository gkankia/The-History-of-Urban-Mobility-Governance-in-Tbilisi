// generate-event-pages.js
// Run this with: node generate-event-pages.js

const fs = require('fs');
const path = require('path');

// Import your events (adjust the path as needed)
const events = require('./events-data.js');

const SITE_URL = 'https://mobilitytrajectories.gkankia.xyz';
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

  // Escape quotes in descriptions for HTML attributes
  const escapedDescription = description.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const escapedTitle = title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="ka" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${escapedTitle} | პოსტრევოლუციური მმართველობა</title>
  <meta name="title" content="${escapedTitle}">
  <meta name="description" content="${escapedDescription}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${eventUrl}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDescription}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:secure_url" content="${image}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Urban Mobility Timeline">
  <meta property="og:locale" content="ka_GE">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${eventUrl}">
  <meta property="twitter:title" content="${escapedTitle}">
  <meta property="twitter:description" content="${escapedDescription}">
  <meta property="twitter:image" content="${image}">
  
  <!-- LinkedIn specific -->
  <meta property="article:published_time" content="${event.date}T00:00:00+00:00">
  <meta property="article:section" content="Urban Governance">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${eventUrl}">
  
  <!-- Redirect to main app (which will read the /event/slug/ path) -->
  <meta http-equiv="refresh" content="0; url=/">
  <script>
    // Immediate redirect to home, which will parse the current URL path
    // Only redirect for human users, not crawlers
    if (!/bot|crawler|spider|crawling|facebookexternalhit|linkedinbot/i.test(navigator.userAgent)) {
      window.location.replace("/");
    }
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
      padding: 2rem;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      text-align: center;
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .loading {
      text-align: center;
      margin-top: 2rem;
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
    .cta {
      display: inline-block;
      background: #d32121;
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 1rem;
      font-weight: 600;
    }
    .cta:hover {
      background: #b01d1d;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1rem 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${escapedTitle}</h1>
    ${image && image.startsWith('http') ? `<img src="${image}" alt="${escapedTitle}">` : ''}
    <p>${escapedDescription}</p>
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading interactive timeline...</p>
    </div>
    <a href="/" class="cta">View on Timeline</a>
  </div>
  
  <noscript>
    <meta http-equiv="refresh" content="0; url=/">
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