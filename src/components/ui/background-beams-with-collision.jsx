"use client";
import React, { useEffect, useRef } from 'react';

const BackgroundBeams = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.color = color;
        this.alpha = Math.random() * 0.5 + 0.3;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.alpha = (this.life / this.maxLife) * 0.5 + 0.3;
        
        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Beam class
    class Beam {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
        this.speed = Math.random() * 0.02 + 0.01;
        this.progress = 0;
        this.width = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
        this.particles = [];
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.progress = 0;
          this.x = this.targetX;
          this.y = this.targetY;
          this.targetX = Math.random() * canvas.width;
          this.targetY = Math.random() * canvas.height;
        }

        // Create particles along the beam
        if (Math.random() < 0.3) {
          const particleX = this.x + (this.targetX - this.x) * this.progress;
          const particleY = this.y + (this.targetY - this.y) * this.progress;
          this.particles.push(new Particle(particleX, particleY, this.color));
        }

        // Update particles
        this.particles = this.particles.filter(particle => {
          particle.update();
          return particle.life > 0;
        });
      }

      draw() {
        // Draw beam
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.targetX, this.targetY);
        ctx.stroke();
        ctx.restore();

        // Draw particles
        this.particles.forEach(particle => particle.draw());
      }
    }

    // Create beams
    const beams = Array.from({ length: 8 }, () => new Beam());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw beams
      beams.forEach(beam => {
        beam.update();
        beam.draw();
      });

      // Add floating geometric shapes
      const time = Date.now() * 0.001;
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time + i) * 100 + canvas.width / 2;
        const y = Math.cos(time + i * 0.5) * 100 + canvas.height / 2;
        const size = Math.sin(time * 2 + i) * 20 + 40;
        
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = `hsl(${240 + i * 30}, 70%, 60%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (i % 2 === 0) {
          ctx.rect(x - size/2, y - size/2, size, size);
        } else {
          ctx.arc(x, y, size/2, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)'
        }}
      />
      
      {/* Additional decorative elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-purple-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-pink-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-blue-500/30"></div>
      </div>
    </div>
  );
};

export default BackgroundBeams;
