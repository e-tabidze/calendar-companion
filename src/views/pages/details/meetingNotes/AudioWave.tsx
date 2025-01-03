import React, { useRef, useEffect, useState } from 'react';

interface AudioWaveformProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Create wave pattern
    const waveData = Array(150).fill(0).map((_, i) => {
      const base = Math.sin(i * 0.1) * 0.3;
      const detail = Math.sin(i * 0.3) * 0.1;
      const variation = Math.sin(i * 0.05) * 0.1;
      
      return Math.abs(0.5 + base + detail + variation);
    });

    const draw = () => {
      if (!videoRef.current || !canvas) return;
      
      const video = videoRef.current;
      
      // Get actual video duration
      const totalDuration = video.duration || 0;
      if (totalDuration === 0) return; // Don't draw if duration isn't available yet

      updateCanvasSize();
      const width = canvas.width;
      const height = canvas.height;

      // Clear with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const currentTime = video.currentTime;
      const numBars = waveData.length;
      const currentBar = Math.floor((currentTime / totalDuration) * numBars);
      const barWidth = Math.ceil(width / numBars);
      const gap = 1;

      // Draw wave bars
      waveData.forEach((value, index) => {
        const isActive = index <= currentBar;
        const x = index * barWidth;
        
        const barHeight = height * 0.4 * value;
        const centerY = height / 2;

        const barGradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
        
        if (isActive) {
          barGradient.addColorStop(0, '#60a5fa');
          barGradient.addColorStop(0.5, '#3b82f6');
          barGradient.addColorStop(1, '#2563eb');
        } else {
          barGradient.addColorStop(0, '#cbd5e1');
          barGradient.addColorStop(0.5, '#94a3b8');
          barGradient.addColorStop(1, '#64748b');
        }

        ctx.fillStyle = barGradient;

        // Draw mirrored bars
        ctx.beginPath();
        ctx.roundRect(
          x,
          centerY - barHeight,
          barWidth - gap,
          barHeight,
          [1]
        );
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(
          x,
          centerY,
          barWidth - gap,
          barHeight,
          [1]
        );
        ctx.fill();
      });
    };

    // Handle video events
    const handleVideoEvents = () => {
      draw();
    };

    // Wait for video metadata to load
    const handleMetadataLoaded = () => {
      setIsLoading(false);
      draw();
    };

    if (videoRef.current.readyState >= 1) {
      handleMetadataLoaded();
    } else {
      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
    }

    videoRef.current.addEventListener('timeupdate', handleVideoEvents);
    window.addEventListener('resize', draw);

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        videoRef.current.removeEventListener('timeupdate', handleVideoEvents);
      }
      window.removeEventListener('resize', draw);
    };
  }, [videoRef]);

  return (
    <div className="relative w-full h-8">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-200 animate-pulse w-full h-4 rounded" />
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded"
        style={{ 
          display: isLoading ? 'none' : 'block'
        }}
      />
    </div>
  );
};

export default AudioWaveform;