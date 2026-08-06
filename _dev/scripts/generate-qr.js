#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════
// QR Code Generator for Wedding Photo Upload Page
// ═══════════════════════════════════════════════════════════════════
//
// USAGE:
//   1. Install the dependency:  npm install qrcode
//   2. Run the script:          node generate-qr.js
//
// The QR code PNG will be saved to ./wedding-qr.png
// ═══════════════════════════════════════════════════════════════════

const QRCode = require('qrcode');
const path   = require('path');

// ── Configuration ──────────────────────────────────────────────────
const TARGET_URL  = 'https://stonesphotos.com/wedding-upload.html';
const OUTPUT_FILE = path.join(__dirname, 'wedding-qr.png');

const QR_OPTIONS = {
  type:   'png',
  width:  1024,                 // High-res for print (1024×1024 px)
  margin: 2,                    // Quiet zone modules around the code
  color: {
    dark:  '#1a1a2eFF',         // Matches site's --text-dark
    light: '#FFFFFFFF'          // White background
  },
  errorCorrectionLevel: 'H'    // Highest error correction (30%)
};

// ── Generate ───────────────────────────────────────────────────────
async function main() {
  try {
    await QRCode.toFile(OUTPUT_FILE, TARGET_URL, QR_OPTIONS);
    console.log('✅  QR code saved to:', OUTPUT_FILE);
    console.log('    URL encoded:     ', TARGET_URL);
    console.log('    Dimensions:      ', QR_OPTIONS.width + '×' + QR_OPTIONS.width + ' px');
  } catch (err) {
    console.error('❌  Failed to generate QR code:', err.message);
    process.exit(1);
  }
}

main();
