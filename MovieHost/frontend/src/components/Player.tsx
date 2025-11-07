import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { MovieSource } from '../types';

interface Props {
  source: MovieSource;
}

export function Player({ source }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (source.kind === 'Hls' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source.url);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }

    if (source.kind !== 'Embed') {
      video.src = source.url;
    }
  }, [source]);

  if (source.kind === 'Embed') {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800">
        <iframe
          className="h-full w-full"
          src={source.url}
          allowFullScreen
          title={source.label}
        />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-black">
      <video ref={videoRef} src={source.kind === 'Mp4' ? source.url : undefined} controls className="h-full w-full" />
    </div>
  );
}
