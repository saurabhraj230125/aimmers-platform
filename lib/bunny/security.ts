import crypto from 'crypto';

export function generateSecurePlaybackUrl(videoId: string) {
  const securityKey = process.env.BUNNY_STREAM_SECURITY_KEY;
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  
  // Set expiration to 10 minutes (600 seconds) from right now
  const expires = Math.floor(Date.now() / 1000) + 600;
  
  // Bunny.net requires this exact string format for hashing
  const hashableBase = `${securityKey}${videoId}${expires}`;
  
  // Generate the SHA-256 hash
  const token = crypto.createHash('sha256').update(hashableBase).digest('hex');
  
  // Return the fully authenticated iframe URL
  return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${token}&expires=${expires}&autoplay=false&preload=true`;
}