const fs = require('fs');
const path = require('path');

const DEFAULT_PASSWORD = 'aeshash-projects';

async function encrypt() {
  const password = process.argv[2] || DEFAULT_PASSWORD;
  const sourcePath = path.join(__dirname, '..', 'projects', 'source.html');
  const targetPath = path.join(__dirname, '..', 'projects', 'index.html');

  if (!fs.existsSync(sourcePath)) {
    console.error('Error: projects/source.html not found.');
    process.exit(1);
  }

  const plaintext = fs.readFileSync(sourcePath, 'utf8');

  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  const payload = {
    salt: Buffer.from(salt).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    ciphertext: Buffer.from(ciphertextBuffer).toString('base64'),
    updatedAt: new Date().toISOString()
  };

  const payloadJson = JSON.stringify(payload, null, 2);

  let targetHtml = fs.readFileSync(targetPath, 'utf8');
  const payloadRegex = /<script id="encrypted-payload" type="application\/json">[\s\S]*?<\/script>/;

  const newTag = `<script id="encrypted-payload" type="application/json">\n${payloadJson}\n  </script>`;

  if (payloadRegex.test(targetHtml)) {
    targetHtml = targetHtml.replace(payloadRegex, newTag);
  } else {
    // Insert before closing body
    targetHtml = targetHtml.replace('</body>', `  ${newTag}\n</body>`);
  }

  fs.writeFileSync(targetPath, targetHtml, 'utf8');
  console.log('Successfully encrypted projects/source.html into projects/index.html');
  console.log(`Password used: "${password}"`);
}

encrypt().catch(err => {
  console.error('Encryption failed:', err);
  process.exit(1);
});
