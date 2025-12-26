import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Move, Loader2, Info, AlertTriangle } from 'lucide-react';

const VirtualTour: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1); // Inside the sphere

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize for performance
    mountRef.current.appendChild(renderer.domElement);

    // --- Texture Loading ---
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous'; 
    
    // Using a reliable placeholder for 360 view to prevent loading errors
    const textureUrl = 'https://placehold.co/2048x1024/1e293b/ca8a04?text=360+Degree+Virtual+Showroom+View+(Drag+to+Rotate)';
    
    const loadTexture = () => {
      textureLoader.load(
        textureUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          createSphere(texture);
          setIsLoading(false);
        },
        undefined, 
        (err) => {
          console.error("Error loading 360 texture, falling back to grid", err);
          // Fallback: Create a generated grid texture
          const canvas = document.createElement('canvas');
          canvas.width = 1024;
          canvas.height = 512;
          const context = canvas.getContext('2d');
          if (context) {
            context.fillStyle = '#1e293b';
            context.fillRect(0, 0, 1024, 512);
            context.strokeStyle = '#ca8a04';
            context.lineWidth = 2;
            context.beginPath();
            for(let i=0; i<=1024; i+=64) { context.moveTo(i,0); context.lineTo(i,512); }
            for(let i=0; i<=512; i+=64) { context.moveTo(0,i); context.lineTo(1024,i); }
            context.stroke();
          }
          const fallbackTexture = new THREE.CanvasTexture(canvas);
          createSphere(fallbackTexture);
          setIsLoading(false);
        }
      );
    };

    const createSphere = (texture: THREE.Texture) => {
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      // Invert the geometry on the x-axis so that all of the faces point inward
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    };

    loadTexture();

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = -0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    // --- Animation ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (mountRef.current && camera && renderer) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // User interaction handling
    const stopRotation = () => { controls.autoRotate = false; };
    controls.addEventListener('start', stopRotation);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', stopRotation);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-4 mb-8 text-center">
        <div className="inline-block bg-secondary/20 text-secondary border border-secondary/50 rounded-full px-4 py-1 text-sm font-bold mb-4 backdrop-blur-md">
           Immersive Experience
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Virtual Showroom Tour</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explore our craftsmanship from the comfort of your home. Drag to inspect the details of our stone installation.
        </p>
      </div>

      <div className="relative w-full h-[50vh] md:h-[70vh] bg-black overflow-hidden group cursor-grab active:cursor-grabbing border-y border-white/10">
        
        {/* 3D Container */}
        <div ref={mountRef} className="w-full h-full outline-none touch-none" />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 transition-opacity">
            <Loader2 className="text-secondary w-12 h-12 animate-spin mb-4" />
            <p className="text-white text-lg font-light tracking-widest">LOADING 360° VIEW</p>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20">
             <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
             <p className="text-white">Unable to load 360 view. Please refresh.</p>
           </div>
        )}

        {/* Instructions Overlay */}
        {!isLoading && !hasError && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-white pointer-events-none select-none border border-white/10 shadow-xl opacity-80 hover:opacity-100 transition-opacity">
            <Move className="w-5 h-5 animate-pulse text-secondary" />
            <span className="text-sm font-medium tracking-wide">Drag to look around</span>
          </div>
        )}
        
        {/* Info Badge */}
        <div className="absolute top-8 right-8 hidden md:flex items-start gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs hover:bg-white/20 transition-colors cursor-help">
           <Info className="text-secondary shrink-0 mt-1" size={20} />
           <div>
             <h4 className="text-white font-bold text-sm">Featured Project</h4>
             <p className="text-xs text-gray-300 mt-1 leading-relaxed">
               Modern kitchen renovation in Alpharetta featuring full quartz backsplash and waterfall island.
             </p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default VirtualTour;