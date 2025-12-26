// clear-linkedin-cache.js
// This script helps you clear LinkedIn's cache for your event URLs
// Run with: node clear-linkedin-cache.js

const events = require('./events-data.js');

const SITE_URL = 'https://mobilitytrajectories.gkankia.xyz'; // Your actual domain

console.log('\n📋 LinkedIn Post Inspector URLs\n');
console.log('Copy and paste these URLs into LinkedIn Post Inspector to refresh cache:');
console.log('https://www.linkedin.com/post-inspector/\n');
console.log('━'.repeat(80) + '\n');

events.forEach((event, index) => {
  const eventUrl = `${SITE_URL}/event/${event.slug}/`;
  console.log(`${index + 1}. ${event.title}`);
  console.log(`   ${eventUrl}\n`);
});

console.log('━'.repeat(80) + '\n');
console.log('📌 Instructions:');
console.log('1. Go to: https://www.linkedin.com/post-inspector/');
console.log('2. Paste each URL above and click "Inspect"');
console.log('3. LinkedIn will fetch fresh meta tags');
console.log('4. Wait a few seconds, then test sharing again\n');

console.log('💡 Pro tip: You only need to refresh cache for URLs you want to share right now.\n');