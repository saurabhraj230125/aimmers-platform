import { generateSecurePlaybackUrl } from '@/lib/bunny/security';

export default function SecurePlayer({ videoId, title }: { videoId: string, title: string }) {
  const secureUrl = generateSecurePlaybackUrl(videoId);

  return (
    <div className="relative w-full aspect-video bg-black rounded-t-lg overflow-hidden border-b border-gray-800">
      <iframe
        src={secureUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
}