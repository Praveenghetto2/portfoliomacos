import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const SatelliteDish = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const mouseX = (state.pointer.x * Math.PI) / 6;
    const mouseY = (state.pointer.y * Math.PI) / 6;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY - 0.2, 0.05);
  });

  return (
    <group position={[0, -1.8, 0]}>
      {/* Base Mount */}
      <Cylinder args={[0.6, 0.8, 1.2, 32]}>
        <meshStandardMaterial color="#0D0D16" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.3, 0.5, 0.6, 32]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#6C3DFF" metalness={0.6} roughness={0.4} />
      </Cylinder>
      
      {/* Articulated Head (Tracks Mouse) */}
      <group ref={groupRef} position={[0, 1.2, 0]}>
        {/* Swivel Joint */}
        <Sphere args={[0.35, 32, 32]}>
          <meshStandardMaterial color="#A58CFF" metalness={0.9} roughness={0.1} />
        </Sphere>
        
        {/* Main Dish */}
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.2, 0.3, 0.3, 64]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.9} />
        </mesh>
        
        {/* Antenna Spire */}
        <Cylinder args={[0.03, 0.03, 1.8]} position={[0, 0, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#6C3DFF" metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Receptor Node */}
        <Sphere args={[0.12, 16, 16]} position={[0, 0, 2.2]}>
          <meshStandardMaterial color="#FFFFFF" emissive="#6C3DFF" emissiveIntensity={2} />
        </Sphere>
      </group>
    </group>
  );
};

const MissionControlSection = () => {
  return (
    <section 
      id="contact" 
      className="relative w-full min-h-screen bg-apple-bg bg-grid-pattern pt-28 pb-6 px-6 md:px-12 lg:px-24 border-b border-apple-border flex flex-col justify-between overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] bg-brand-purple/5"></div>
      </div>

      <div className="flex-grow flex items-center w-full z-10 py-12">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTA */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-start">
            <span className="text-[10px] font-mono font-bold text-apple-subtext tracking-widest uppercase mb-4 block">
              Launch & Ping Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-apple-text uppercase leading-none mb-4">
              READY TO BUILD THE <br />
              NEXT FINANCIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-purple-light">UNIVERSE?</span>
            </h2>
            <p className="text-sm text-apple-subtext max-w-xs mb-8 leading-relaxed font-body">
              Let's design the future of money together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="mailto:praveenpk990057@gmail.com" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-apple-md hover:-translate-y-0.5 hover:shadow-apple-glass"
              >
                Launch Mission →
              </a>
              <button className="bg-white border border-apple-border hover:border-brand-purple text-apple-text px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-apple-sm hover:-translate-y-0.5 hover:shadow-apple-md">
                Book A Call
              </button>
            </div>
          </div>

          {/* Center Column: 3D Interactive Satellite Dish (White Theme) */}
          <div className="col-span-1 lg:col-span-4 h-[350px] md:h-[450px] relative flex items-center justify-center">
            {/* Radial glow background */}
            <div className="absolute inset-0 bg-brand-purple/15 rounded-full blur-3xl scale-90"></div>
            
            <div className="w-full h-full relative">
              <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[5, 8, 5]} intensity={1.5} />
                <pointLight position={[0, 1.5, 3]} color="#6C3DFF" intensity={3} />
                <SatelliteDish />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
          </div>

          {/* Right Column: Contact Links & Profile Card */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
            {/* Contact Directory */}
            <div className="bg-white border border-apple-border rounded-3xl p-6 shadow-apple-sm space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-apple-subtext uppercase mb-2">
                Transmission Links
              </h4>
              
              <a href="mailto:hello@praveenkumar.design" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-xl border border-apple-border bg-apple-bg flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-apple-subtext block uppercase tracking-wider">Email</span>
                  <span className="text-xs font-display font-extrabold text-apple-text group-hover:text-brand-purple transition-colors">hello@praveenkumar.design</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/praveenkumar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-xl border border-apple-border bg-apple-bg flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-apple-subtext block uppercase tracking-wider">LinkedIn</span>
                  <span className="text-xs font-display font-extrabold text-apple-text group-hover:text-brand-purple transition-colors">linkedin.com/in/praveenkumar</span>
                </div>
              </a>

              <a href="https://dribbble.com/praveenkumar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-xl border border-apple-border bg-apple-bg flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-apple-subtext block uppercase tracking-wider">Dribbble</span>
                  <span className="text-xs font-display font-extrabold text-apple-text group-hover:text-brand-purple transition-colors">dribbble.com/praveenkumar</span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl border border-apple-border bg-apple-bg flex items-center justify-center text-brand-purple">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-apple-subtext block uppercase tracking-wider">Location</span>
                  <span className="text-xs font-display font-extrabold text-apple-text">Bengaluru, India — Open for opportunities worldwide</span>
                </div>
              </div>
            </div>

            {/* Profile Card Badge */}
            <div className="bg-white border border-apple-border rounded-3xl p-6 shadow-apple-sm flex items-center gap-4">
              {/* PK circular glow initials */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-dark to-brand-purple text-white flex items-center justify-center font-display font-extrabold text-sm shadow-[0_4px_15px_rgba(108,61,255,0.3)]">
                PK
              </div>
              <div>
                <h4 className="text-xs font-display font-extrabold text-apple-text uppercase tracking-tight">
                  Praveen Kumar
                </h4>
                <p className="text-[9px] font-mono font-bold text-brand-purple uppercase tracking-widest mb-1">
                  Product Designer
                </p>
                <p className="text-[10px] font-body text-apple-subtext leading-tight">
                  Designing the future of money, one experience at a time.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Elegant Footer matching Mockup */}
      <div className="w-full max-w-[1600px] mx-auto border-t border-apple-border pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-apple-subtext uppercase tracking-wider gap-4 relative z-10">
        <div>
          PK © 2026 Praveen Kumar. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          Built with passion & precision. <span className="text-brand-purple text-xs">♥</span>
        </div>
      </div>
    </section>
  );
};

export default MissionControlSection;
