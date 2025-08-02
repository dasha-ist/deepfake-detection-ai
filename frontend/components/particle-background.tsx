"use client"; // Keep this at the top for client-side rendering

import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- HIGH-PERFORMANCE CANVAS PARTICLE SYSTEM ---
    class SpatialGrid {
      width: number;
      height: number;
      cellSize: number;
      gridWidth: number;
      gridHeight: number;
      grid: any[][];

      constructor(width: number, height: number, cellSize: number) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.gridWidth = Math.ceil(width / cellSize);
        this.gridHeight = Math.ceil(height / cellSize);
        this.grid = [];
        this.clear();
      }

      clear() {
        this.grid = new Array(this.gridWidth * this.gridHeight).fill(0).map(() => []);
      }

      insert(particle: any) {
        const x = Math.floor(particle.x / this.cellSize);
        const y = Math.floor(particle.y / this.cellSize);
        if (x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight) {
          this.grid[y * this.gridWidth + x].push(particle);
        }
      }

      query(particle: any, radius: number) {
        const nearby = [];
        const searchRadius = Math.ceil(radius / this.cellSize);
        const particleX = Math.floor(particle.x / this.cellSize);
        const particleY = Math.floor(particle.y / this.cellSize);

        for (let y = -searchRadius; y <= searchRadius; y++) {
          for (let x = -searchRadius; x <= searchRadius; x++) {
            const cellX = particleX + x;
            const cellY = particleY + y;
            if (cellX >= 0 && cellX < this.gridWidth && cellY >= 0 && cellY < this.gridHeight) {
              const cell = this.grid[cellY * this.gridWidth + cellX];
              nearby.push(...cell);
            }
          }
        }
        return nearby;
      }
    }

    class FullPageParticleSystem {
       // Type declarations for class properties (with initializers for TypeScript)
      container: HTMLDivElement;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      particles: any[] = []; // Initialized here
      animationId: number | null = null; // Initialized here
      mouse: { x: number; y: number; isMoving: boolean; };
      mouseTimeout: NodeJS.Timeout | null = null; // Initialized here
      area: number;
      options: { particleCount: number; connectionDistance: number; particleSpeed: number; colors: { base: string; highlight: string; line: string; highlightLine: string; }; };
      spatialGrid: SpatialGrid;

      constructor(containerElement: HTMLDivElement) {
        if (!containerElement) {
            console.error('FullPageParticleSystem: containerElement is null or undefined!');
            return;
        }

        this.container = containerElement;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;

        this.mouse = { x: -1000, y: -1000, isMoving: false };

        this.area = this.container.clientWidth * this.container.clientHeight;

        this.options = {
          particleCount: Math.min(800, Math.floor(this.area * 0.0001)),
          connectionDistance: 150,
          particleSpeed: 0.3,
          colors: {
            base: 'rgba(200, 160, 240, 0.5)',
            highlight: '#C8A0F0',
            line: 'rgba(255, 255, 255, 0.1)',
            highlightLine: 'rgba(200, 160, 240, 0.5)'
          }
        };

        this.spatialGrid = new SpatialGrid(
            this.container.clientWidth,
            this.container.clientHeight,
            this.options.connectionDistance
        );

        this.init();
        this.bindEvents();
      }

      init() {
        this.canvas.id = 'full-page-particles';
        if (!this.container.contains(this.canvas)) {
             this.container.prepend(this.canvas);
        }
        this.resize();
        this.animate();
      }

      resize = () => {
        const parent = this.container;
        if (!parent) return;

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = parent.clientWidth * dpr;
        this.canvas.height = parent.clientHeight * dpr;
        this.canvas.style.width = `${parent.clientWidth}px`;
        this.canvas.style.height = `${parent.clientHeight}px`;
        this.ctx.scale(dpr, dpr);

        this.spatialGrid = new SpatialGrid(
            parent.clientWidth,
            parent.clientHeight,
            this.options.connectionDistance
        );
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
          this.createParticle();
        }
      }

      createParticle() {
        const parent = this.container;
        if (!parent) return;

        this.particles.push({
          x: Math.random() * parent.clientWidth,
          y: Math.random() * parent.clientHeight,
          vx: (Math.random() - 0.5) * this.options.particleSpeed,
          vy: (Math.random() - 0.5) * this.options.particleSpeed,
          size: Math.random() * 2 + 1,
        });
      }

      animate = () => {
        const parent = this.container;
        if (!parent) {
            if (this.animationId) cancelAnimationFrame(this.animationId);
            return;
        }

        this.ctx.clearRect(0, 0, parent.clientWidth, parent.clientHeight);

        this.spatialGrid.clear();
        this.particles.forEach(p => this.spatialGrid.insert(p));

        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x <= 0 || p.x >= parent.clientWidth) { p.vx *= -1; }
          if (p.y <= 0 || p.y >= parent.clientHeight) { p.vy *= -1; }

          this.drawParticle(p);
          this.drawConnections(p);
        });

        this.animationId = requestAnimationFrame(this.animate);
      }

      drawParticle(p: any) {
        const distanceToMouse = Math.hypot(this.mouse.x - p.x, this.mouse.y - p.y);
        const isHighlighted = distanceToMouse < this.options.connectionDistance && this.mouse.isMoving;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = isHighlighted ? this.options.colors.highlight : this.options.colors.base;

        if (isHighlighted) {
            const opacity = 1 - (distanceToMouse / this.options.connectionDistance);
            this.ctx.globalAlpha = Math.max(0.5, opacity);
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = this.options.colors.highlight;
        } else {
            this.ctx.globalAlpha = 0.5;
            this.ctx.shadowBlur = 0;
        }

        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
      }

      drawConnections(p: any) {
        const neighbors = this.spatialGrid.query(p, this.options.connectionDistance);

        neighbors.forEach(neighbor => {
          if (p === neighbor) return;

          const distance = Math.hypot(p.x - neighbor.x, p.y - neighbor.y);
          if (distance < this.options.connectionDistance) {
            const distanceToMouse = Math.hypot(this.mouse.x - p.x, this.mouse.y - p.y);
            const isHighlighted = distanceToMouse < this.options.connectionDistance && this.mouse.isMoving;

            if (isHighlighted) {
              const opacity = 1 - (distance / this.options.connectionDistance);

              this.ctx.beginPath();
              this.ctx.moveTo(p.x, p.y);
              this.ctx.lineTo(neighbor.x, neighbor.y);

              this.ctx.strokeStyle = this.options.colors.highlightLine;
              this.ctx.globalAlpha = opacity * 0.8;
              this.ctx.lineWidth = 1;

              this.ctx.stroke();
              this.ctx.globalAlpha = 1;
            }
          }
        });
      }

      handleMouseMove = (e: MouseEvent) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.isMoving = true;
        if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
        // ** MODIFIED FOR LONGER INTERACTION **
        this.mouseTimeout = setTimeout(() => { this.mouse.isMoving = false; }, 500); // Increased from 150ms to 500ms
      };

      handleResize = (() => {
          let timeout: NodeJS.Timeout;
          return () => {
              clearTimeout(timeout);
              timeout = setTimeout(this.resize, 250);
          };
      })();

      bindEvents() {
        document.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('resize', this.handleResize);
      }

      cleanup() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        document.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
      }
    }

    let particleSystem: FullPageParticleSystem | undefined;

    const timer = setTimeout(() => {
      if (containerRef.current) {
        particleSystem = new FullPageParticleSystem(containerRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (particleSystem && particleSystem.cleanup) {
        particleSystem.cleanup();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ overflow: 'hidden' }}
    />
  );
}