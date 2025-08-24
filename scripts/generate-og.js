const fs = require('fs')
const path = require('path')

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <text x="600" y="200" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="700" fill="white" text-anchor="middle">
    Rubén González Aranda
  </text>
  
  <text x="600" y="260" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="400" fill="#94a3b8" text-anchor="middle">
    Full Stack Developer
  </text>
  
  <text x="600" y="320" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="400" fill="#64748b" text-anchor="middle">
    Clean Architecture • DDD • TypeScript • Next.js
  </text>
  
  <text x="600" y="580" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="400" fill="#475569" text-anchor="middle">
    rubengonzalez.dev
  </text>
</svg>`

const publicDir = path.join(__dirname, '..', 'public')
const ogPath = path.join(publicDir, 'og-default.png')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

fs.writeFileSync(path.join(publicDir, 'og-default.svg'), svgContent)
console.log('OpenGraph SVG generated at public/og-default.svg')
console.log('Note: For production, convert this SVG to PNG using a tool like Inkscape or online converter')
