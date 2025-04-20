const crypto = require('crypto');

function generateRandomNoise(length) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString('hex');
}

// Example usage:
const noise = generateRandomNoise(3); // Generate 1024 random bytes as a hexadecimal string
console.log(noise);
