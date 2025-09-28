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

    // Healthcare-themed particle class (vitamins, molecules)
    class HealthcareParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
        this.color = color;
        this.alpha = Math.random() * 0.6 + 0.4;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.pulse += this.pulseSpeed;
        this.alpha = (this.life / this.maxLife) * 0.6 + 0.4;
        
        // Gentle floating motion
        this.y += Math.sin(this.pulse) * 0.5;
        
        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Draw as a small cross or plus sign for molecules
        ctx.moveTo(this.x - this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Nucleotide particle class (A, T, G, C bases)
    class NucleotideParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 3 + 2;
        this.base = ['A', 'T', 'G', 'C'][Math.floor(Math.random() * 4)];
        this.color = this.getBaseColor();
        this.alpha = Math.random() * 0.7 + 0.3;
        this.life = Math.random() * 300 + 150;
        this.maxLife = this.life;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      getBaseColor() {
        const colors = {
          'A': '#ef4444', // Red for Adenine
          'T': '#3b82f6', // Blue for Thymine
          'G': '#10b981', // Green for Guanine
          'C': '#f59e0b'  // Orange for Cytosine
        };
        return colors[this.base];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.pulse += this.pulseSpeed;
        this.rotation += this.rotationSpeed;
        this.alpha = (this.life / this.maxLife) * 0.7 + 0.3;
        
        // Gentle floating motion
        this.y += Math.sin(this.pulse) * 0.3;
        
        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw nucleotide base as a circle with letter
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw base letter
        ctx.fillStyle = 'white';
        ctx.font = `${this.size * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.base, 0, 0);
        
        ctx.restore();
      }
    }

    // Cell class with organic movement
    class Cell {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 15 + 10;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.color = `hsl(${Math.random() * 60 + 120}, 60%, 70%)`; // Green-blue range
        this.alpha = Math.random() * 0.3 + 0.2;
        this.particles = [];
        this.membrane = [];
        this.generateMembrane();
      }

      generateMembrane() {
        // Create membrane points for organic shape
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const radius = this.size + Math.random() * 5;
          this.membrane.push({
            angle: angle,
            radius: radius,
            originalRadius: radius,
            wave: Math.random() * Math.PI * 2
          });
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        // Organic membrane movement
        this.membrane.forEach(point => {
          point.wave += 0.02;
          point.radius = point.originalRadius + Math.sin(point.wave) * 2;
        });

        // Create healthcare particles
        if (Math.random() < 0.1) {
          this.particles.push(new HealthcareParticle(
            this.x + (Math.random() - 0.5) * this.size,
            this.y + (Math.random() - 0.5) * this.size,
            this.color
          ));
        }

        // Update particles
        this.particles = this.particles.filter(particle => {
          particle.update();
          return particle.life > 0;
        });

        // Gentle boundary checking
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Draw cell membrane
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        this.membrane.forEach((point, index) => {
          const x = this.x + Math.cos(point.angle) * point.radius;
          const y = this.y + Math.sin(point.angle) * point.radius;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        ctx.stroke();

        // Draw cell nucleus
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha * 0.6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particles
        this.particles.forEach(particle => particle.draw());
        ctx.restore();
      }
    }

    // Enhanced DNA Strand class with base pairs
    class DNAStrand {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 120 + 80;
        this.angle = Math.random() * Math.PI * 2;
        this.twist = Math.random() * 0.08 + 0.04;
        this.color = `hsl(${Math.random() * 40 + 200}, 70%, 60%)`; // Blue-purple range
        this.alpha = Math.random() * 0.4 + 0.3;
        this.time = Math.random() * Math.PI * 2;
        this.basePairs = [];
        this.generateBasePairs();
      }

      generateBasePairs() {
        // Generate base pairs (A-T, G-C)
        for (let i = 0; i < this.length; i += 3) {
          this.basePairs.push({
            index: i,
            type: Math.random() > 0.5 ? 'AT' : 'GC',
            color: Math.random() > 0.5 ? '#4ade80' : '#22d3ee' // Green for AT, Cyan for GC
          });
        }
      }

      update() {
        this.time += 0.02;
        this.x += Math.sin(this.time) * 0.5;
        this.y += Math.cos(this.time * 0.7) * 0.3;
        
        // Gentle rotation
        this.angle += 0.005;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        // Draw double helix backbone
        for (let i = 0; i < this.length; i++) {
          const progress = i / this.length;
          const helixY = this.y + (progress - 0.5) * this.length;
          const helixX1 = this.x + Math.cos(this.angle + progress * this.twist * 10) * 8;
          const helixX2 = this.x + Math.cos(this.angle + progress * this.twist * 10 + Math.PI) * 8;

          if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(helixX1, helixY);
            ctx.lineTo(this.x + Math.cos(this.angle + (progress - 1/this.length) * this.twist * 10) * 8, 
                      this.y + ((progress - 1/this.length) - 0.5) * this.length);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(helixX2, helixY);
            ctx.lineTo(this.x + Math.cos(this.angle + (progress - 1/this.length) * this.twist * 10 + Math.PI) * 8, 
                      this.y + ((progress - 1/this.length) - 0.5) * this.length);
            ctx.stroke();
          }
        }

        // Draw base pairs
        this.basePairs.forEach(basePair => {
          const progress = basePair.index / this.length;
          const helixY = this.y + (progress - 0.5) * this.length;
          const helixX1 = this.x + Math.cos(this.angle + progress * this.twist * 10) * 8;
          const helixX2 = this.x + Math.cos(this.angle + progress * this.twist * 10 + Math.PI) * 8;

          ctx.strokeStyle = basePair.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(helixX1, helixY);
          ctx.lineTo(helixX2, helixY);
          ctx.stroke();
        });

        ctx.restore();
      }
    }

    // Chromosome class
    class Chromosome {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.length = Math.random() * 60 + 40;
        this.width = Math.random() * 8 + 4;
        this.color = `hsl(${Math.random() * 60 + 120}, 60%, 70%)`; // Green range
        this.alpha = Math.random() * 0.5 + 0.3;
        this.time = Math.random() * Math.PI * 2;
        this.centromere = Math.random() * 0.6 + 0.2; // Position of centromere
        this.chromatids = [];
        this.generateChromatids();
      }

      generateChromatids() {
        // Create two chromatids
        this.chromatids = [
          { offset: -this.width/2, color: this.color },
          { offset: this.width/2, color: this.color }
        ];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.time += 0.01;

        // Gentle floating motion
        this.y += Math.sin(this.time) * 0.2;

        // Boundary checking
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        // Draw chromatids
        this.chromatids.forEach(chromatid => {
          ctx.strokeStyle = chromatid.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          // Draw chromatid arms
          const arm1Length = this.length * this.centromere;
          const arm2Length = this.length * (1 - this.centromere);
          
          // Short arm
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - arm1Length, this.y + chromatid.offset);
          
          // Centromere
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + chromatid.offset * 2);
          
          // Long arm
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + arm2Length, this.y + chromatid.offset);
          
          ctx.stroke();
        });

        // Draw centromere
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Chromosome Pair class (for meiosis/mitosis visualization)
    class ChromosomePair {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.length = Math.random() * 50 + 30;
        this.color = `hsl(${Math.random() * 40 + 200}, 70%, 60%)`; // Blue range
        this.alpha = Math.random() * 0.4 + 0.3;
        this.time = Math.random() * Math.PI * 2;
        this.separation = 0; // 0 = paired, 1 = separated
        this.separationSpeed = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.time += 0.01;

        // Animate separation
        this.separation += this.separationSpeed;
        if (this.separation > 1) {
          this.separation = 0; // Reset to paired state
        }

        // Gentle floating motion
        this.y += Math.sin(this.time) * 0.3;

        // Boundary checking
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        // Calculate separation distance
        const separationDistance = this.separation * 20;

        // Draw chromosome 1
        ctx.beginPath();
        ctx.moveTo(this.x - separationDistance, this.y);
        ctx.lineTo(this.x - separationDistance - this.length/2, this.y - 5);
        ctx.moveTo(this.x - separationDistance, this.y);
        ctx.lineTo(this.x - separationDistance + this.length/2, this.y - 5);
        ctx.stroke();

        // Draw chromosome 2
        ctx.beginPath();
        ctx.moveTo(this.x + separationDistance, this.y);
        ctx.lineTo(this.x + separationDistance - this.length/2, this.y + 5);
        ctx.moveTo(this.x + separationDistance, this.y);
        ctx.lineTo(this.x + separationDistance + this.length/2, this.y + 5);
        ctx.stroke();

        // Draw connection line when paired
        if (this.separation < 0.3) {
          ctx.globalAlpha = this.alpha * (1 - this.separation * 3);
          ctx.beginPath();
          ctx.moveTo(this.x - separationDistance, this.y);
          ctx.lineTo(this.x + separationDistance, this.y);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Organism class with flowing movement
    class Organism {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 25 + 15;
        this.color = `hsl(${Math.random() * 80 + 100}, 50%, 60%)`; // Green range
        this.alpha = Math.random() * 0.4 + 0.2;
        this.segments = [];
        this.time = Math.random() * Math.PI * 2;
        this.generateSegments();
      }

      generateSegments() {
        // Create flowing segments for organism body
        for (let i = 0; i < 8; i++) {
          this.segments.push({
            x: this.x + (i - 4) * 8,
            y: this.y,
            size: this.size * (1 - i * 0.1),
            wave: Math.random() * Math.PI * 2,
            waveSpeed: Math.random() * 0.03 + 0.01
          });
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.time += 0.01;

        // Update segments with flowing motion
        this.segments.forEach((segment, index) => {
          segment.wave += segment.waveSpeed;
          segment.x = this.x + (index - 4) * 8 + Math.sin(this.time + index * 0.5) * 10;
          segment.y = this.y + Math.sin(segment.wave) * 5;
        });

        // Gentle boundary checking
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Draw organism body as connected segments
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        this.segments.forEach((segment, index) => {
          if (index === 0) {
            ctx.moveTo(segment.x, segment.y);
          } else {
            ctx.lineTo(segment.x, segment.y);
          }
        });
        ctx.stroke();

        // Draw organism head
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.segments[0].x, this.segments[0].y, this.segments[0].size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Create healthcare entities
    const cells = Array.from({ length: 6 }, () => new Cell());
    const dnaStrands = Array.from({ length: 4 }, () => new DNAStrand());
    const chromosomes = Array.from({ length: 5 }, () => new Chromosome());
    const chromosomePairs = Array.from({ length: 3 }, () => new ChromosomePair());
    const organisms = Array.from({ length: 3 }, () => new Organism());
    
    // Global nucleotide particles array
    let nucleotideParticles = [];
    
    // Function to spawn nucleotide particles
    const spawnNucleotideParticles = () => {
      if (Math.random() < 0.02) { // 2% chance per frame
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nucleotideParticles.push(new NucleotideParticle(x, y));
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn nucleotide particles
      spawnNucleotideParticles();

      // Update and draw healthcare entities
      cells.forEach(cell => {
        cell.update();
        cell.draw();
      });

      dnaStrands.forEach(dna => {
        dna.update();
        dna.draw();
      });

      chromosomes.forEach(chromosome => {
        chromosome.update();
        chromosome.draw();
      });

      chromosomePairs.forEach(pair => {
        pair.update();
        pair.draw();
      });

      organisms.forEach(organism => {
        organism.update();
        organism.draw();
      });

      // Update and draw nucleotide particles
      nucleotideParticles = nucleotideParticles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0;
      });

      // Add floating healthcare-themed shapes
      const time = Date.now() * 0.001;
      for (let i = 0; i < 3; i++) {
        const x = Math.sin(time + i) * 80 + canvas.width / 2;
        const y = Math.cos(time + i * 0.5) * 80 + canvas.height / 2;
        const size = Math.sin(time * 2 + i) * 15 + 25;
        
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = `hsl(${120 + i * 40}, 60%, 70%)`; // Healthcare colors
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Draw medical cross shapes
        ctx.moveTo(x - size/2, y);
        ctx.lineTo(x + size/2, y);
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x, y + size/2);
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
      
      {/* Healthcare-themed decorative elements */}
      <div className="absolute inset-0">
        {/* Floating healthcare orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Healthcare grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Healthcare corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-emerald-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-teal-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-blue-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30"></div>
        
        {/* Medical cross decorations */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-20">
          <div className="w-full h-full relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-400 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-emerald-400 transform -translate-x-1/2"></div>
          </div>
        </div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 opacity-15">
          <div className="w-full h-full relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-teal-400 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-teal-400 transform -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundBeams;
