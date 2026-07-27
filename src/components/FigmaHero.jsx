import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MousePointer2, Type, Square, Layout, Menu, Share2, Play } from 'lucide-react';
import './FigmaHero.css';

const FigmaHero = ({ fullScreen = false }) => {
  const canvasControls = useAnimation();
  
  // Research State
  const stickyControls = useAnimation();
  
  // Competitor State
  const compControls = useAnimation();

  // New states
  const flowControls = useAnimation();
  const systemControls = useAnimation();

  // Wireframe State
  const wireframeControls = useAnimation();
  const noodleControls = useAnimation();

  // Hi-Fi State
  const hifiControls = useAnimation();

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const runAnimation = async () => {
      while (isMounted) {
        // --- 0. RESET EVERYTHING ---
        setActiveStage(1);
        await Promise.all([
          canvasControls.start({ x: -430, y: 0, scale: 1, opacity: 1, transition: { duration: 0 } }),
          stickyControls.set({ opacity: 0, scale: 0.8, y: 20 }),
          compControls.set({ opacity: 0, scale: 0.9, y: 30 }),
          flowControls.set({ opacity: 0, scale: 0.9, y: 20 }),
          wireframeControls.set({ opacity: 0, y: 40 }),
          noodleControls.set({ pathLength: 0, opacity: 0 }),
          systemControls.set({ opacity: 0, x: -20 }),
          hifiControls.set({ opacity: 0, scale: 0.95 }),
        ]);

        await new Promise(resolve => setTimeout(resolve, 1200));

        // --- 1. RESEARCH STAGE PAN (Canvas x: -430) ---
        setActiveStage(1);
        await canvasControls.start({ x: -430, transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } });
        
        await stickyControls.start(i => ({
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { duration: 0.4, delay: i * 0.15 }
        }));
        await new Promise(resolve => setTimeout(resolve, 2500));

        // --- 2. COMPETITOR STAGE PAN (Canvas x: -1080) ---
        setActiveStage(2);
        await canvasControls.start({ x: -1080, transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } });
        
        await compControls.start(i => ({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.4, delay: i * 0.2 }
        }));
        await new Promise(resolve => setTimeout(resolve, 2500));

        // --- 3. USER FLOW (Canvas x: -1880) ---
        setActiveStage(3);
        await canvasControls.start({ x: -1880, transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } });
        
        await flowControls.start(i => ({
          opacity: 1, scale: 1, y: 0,
          transition: { delay: i * 0.1, duration: 0.6 }
        }));
        await new Promise(resolve => setTimeout(resolve, 2500));

        // --- 4. WIREFRAME STAGE PAN (Canvas x: -2680) ---
        setActiveStage(4);
        await canvasControls.start({ x: -2680, transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } });

        // Fade in Wireframes
        await wireframeControls.start(i => ({
          opacity: 1, y: 0,
          transition: { delay: i * 0.15, duration: 0.6 }
        }));
        // Draw Prototype Noodles
        await noodleControls.start(i => ({
          pathLength: 1, opacity: 1,
          transition: { delay: i * 0.2, duration: 0.8, ease: "easeInOut" }
        }));
        
        await new Promise(resolve => setTimeout(resolve, 2500));

        // --- 5. DESIGN SYSTEM STAGE PAN (Canvas x: -3480) ---
        setActiveStage(5);
        await canvasControls.start({ x: -3480, transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } });
        
        await systemControls.start(i => ({
          opacity: 1, x: 0,
          transition: { delay: i * 0.08, duration: 0.5 }
        }));
        await new Promise(resolve => setTimeout(resolve, 2500));

        // --- 6. HI-FI REVEAL STAGE PAN (Canvas x: -4280) ---
        setActiveStage(6);
        await canvasControls.start({ x: -4280, transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] } });

        // Reveal the final designs
        await hifiControls.start(i => ({
          opacity: 1, scale: 1,
          transition: { delay: i * 0.15, duration: 0.7, type: "spring", stiffness: 100 }
        }));
        
        await new Promise(resolve => setTimeout(resolve, 2500));

        // --- 7. MACRO ZOOM OUT (Show entire process) ---
        setActiveStage(7);
        await canvasControls.start({ 
          x: -2430, 
          y: 0, // Perfectly centered vertically
          scale: 0.16, 
          transition: { duration: 3.0, ease: [0.16, 1, 0.3, 1] } 
        });

        // Hold the zoomed out view for a long time
        await new Promise(resolve => setTimeout(resolve, 8000));

        // Fade out to loop
        await canvasControls.start({ opacity: 0, transition: { duration: 0.8 } });
      }
    };

    runAnimation();

    return () => { isMounted = false; };
  }, [canvasControls, stickyControls, compControls, wireframeControls, noodleControls, hifiControls]);


  return (
    <section 
      id="process" 
      className={`figma-hero-container ${fullScreen ? 'figma-fullscreen-container' : ''}`}
    >
      <div className={`figma-window ${fullScreen ? 'figma-fullscreen-window' : ''}`}>
        {/* ─── TOOLBAR ─── */}
        <div className="figma-toolbar">
          <div className="figma-toolbar-left">
            <div className="mac-controls">
              <span className="mac-btn mac-close"></span>
              <span className="mac-btn mac-min"></span>
              <span className="mac-btn mac-max"></span>
            </div>
            <Menu size={16} className="figma-tool" />
            <MousePointer2 size={16} className="figma-tool active" />
            <Layout size={16} className="figma-tool" />
            <Square size={16} className="figma-tool" />
            <Type size={16} className="figma-tool" />
          </div>
          <div className="figma-toolbar-center">
            <span className="figma-toolbar-title">praveen.design / Portfolio 2026</span>
          </div>
          <div className="figma-toolbar-right">
            <Share2 size={16} className="figma-tool" />
            <Play size={16} className="figma-tool" />
          </div>
        </div>

        {/* ─── WORKSPACE ─── */}
        <div className="figma-workspace">
          
          {/* Left Panel */}
          <div className="figma-left-panel">
            <div className="figma-layers-header">Text Layers</div>
            <h1 className="figma-hero-headline">
              Code.<br/><span>Craft.</span>
            </h1>
            <p className="figma-hero-sub">
              Product Designer with a developer's brain. I build enterprise systems — fintech, AI, banking — where complexity meets clarity.
            </p>
          </div>

          {/* Viewport for Camera Panning */}
          <div className="figma-viewport">
            
            {/* The Massive Infinite Canvas */}
            <motion.div className="infinite-canvas" animate={canvasControls}>
              
              {/* STAGE 1: RESEARCH (Far Left - x:0) */}
              <div className={`stage-box stage-research ${activeStage === 1 || activeStage === 7 ? 'active' : 'dimmed'}`}>
                <span className="stage-label">01 / Research & Synthesis</span>
                <motion.div className="sticky-note sticky-yellow" style={{ top: 20, left: 40 }} custom={0} animate={stickyControls}>74% drop-off in cross-border transfer flow at 'Currency Selection'.</motion.div>
                <motion.div className="sticky-note sticky-blue" style={{ top: 40, left: 240 }} custom={1} animate={stickyControls}>User testing: 8/10 participants failed to locate their IBAN quickly.</motion.div>
                <motion.div className="sticky-note sticky-pink" style={{ top: 200, left: 80 }} custom={2} animate={stickyControls}>Hypothesis: A unified global balance will reduce cognitive load.</motion.div>
                <motion.div className="sticky-note sticky-yellow" style={{ top: 180, left: 280 }} custom={3} animate={stickyControls}>Opportunity: 1-click repeat payments to increase weekly active users.</motion.div>
              </div>

              {/* STAGE 2: COMPETITIVE ANALYSIS (Mid Left - x:800) */}
              <div className={`stage-box stage-competitor ${activeStage === 2 || activeStage === 7 ? 'active' : 'dimmed'}`}>
                <span className="stage-label">02 / Competitive Landscape</span>
                
                <motion.div className="comp-block" style={{ top: 50, left: 40 }} custom={0} animate={compControls}>
                  <div className="comp-bank-logo" style={{color: '#111', fontSize: '13px', letterSpacing: '0.5px'}}>REVOLUT</div>
                  <div className="comp-img" style={{height: '80px', marginBottom: '20px'}} />
                  <div style={{fontSize: '10px', fontWeight: 700, color: '#5A3FF2', width: '100%', marginBottom: '6px', textTransform: 'uppercase'}}>Key Strength</div>
                  <div className="comp-line" style={{marginBottom: '16px'}} />
                  <div style={{fontSize: '10px', fontWeight: 700, color: '#FF3B30', width: '100%', marginBottom: '6px', textTransform: 'uppercase'}}>Weakness</div>
                  <div className="comp-line short" />
                </motion.div>
                
                <motion.div className="comp-block" style={{ top: 50, left: 280 }} custom={1} animate={compControls}>
                  <div className="comp-bank-logo" style={{color: '#111', fontSize: '13px', letterSpacing: '0.5px'}}>MONZO</div>
                  <div className="comp-img" style={{height: '80px', marginBottom: '20px'}} />
                  <div style={{fontSize: '10px', fontWeight: 700, color: '#5A3FF2', width: '100%', marginBottom: '6px', textTransform: 'uppercase'}}>Key Strength</div>
                  <div className="comp-line" style={{marginBottom: '16px'}} />
                  <div style={{fontSize: '10px', fontWeight: 700, color: '#FF3B30', width: '100%', marginBottom: '6px', textTransform: 'uppercase'}}>Weakness</div>
                  <div className="comp-line short" />
                </motion.div>

                <motion.div className="comp-block" style={{ top: 50, left: 520 }} custom={2} animate={compControls}>
                  <div className="comp-bank-logo" style={{color: '#111', fontSize: '13px', letterSpacing: '0.5px'}}>WISE</div>
                  <div className="comp-img" style={{height: '80px', marginBottom: '20px'}} />
                  <div style={{fontSize: '10px', fontWeight: 700, color: '#5A3FF2', width: '100%', marginBottom: '6px', textTransform: 'uppercase'}}>Key Strength</div>
                  <div className="comp-line" style={{marginBottom: '16px'}} />
                  <div style={{fontSize: '10px', fontWeight: 700, color: '#FF3B30', width: '100%', marginBottom: '6px', textTransform: 'uppercase'}}>Weakness</div>
                  <div className="comp-line short" />
                </motion.div>
              </div>

              {/* STAGE 3: USER FLOW (Mid Center - x:1600) */}
              <div className={`stage-box stage-flow ${activeStage === 3 || activeStage === 7 ? 'active' : 'dimmed'}`}>
                <span className="stage-label">03 / Information Architecture</span>
                <svg className="flow-lines">
                  {/* Dash to Col 2 */}
                  <motion.path d="M 160 204 L 190 204 L 190 124 L 220 124" className="flow-line" custom={0} animate={flowControls} />
                  <motion.path d="M 160 204 L 220 204" className="flow-line" custom={0} animate={flowControls} />
                  <motion.path d="M 160 204 L 190 204 L 190 284 L 220 284" className="flow-line" custom={0} animate={flowControls} />
                  
                  {/* Col 2 to Col 3 */}
                  <motion.path d="M 340 124 L 380 124 L 380 84 L 420 84" className="flow-line" custom={1} animate={flowControls} />
                  <motion.path d="M 340 124 L 380 124 L 380 164 L 420 164" className="flow-line" custom={1} animate={flowControls} />
                  <motion.path d="M 340 204 L 420 204" className="flow-line" custom={1} animate={flowControls} />
                  <motion.path d="M 340 284 L 420 284" className="flow-line" custom={1} animate={flowControls} />

                  {/* Col 3 to Col 4 */}
                  <motion.path d="M 540 84 L 620 84" className="flow-line" custom={2} animate={flowControls} />
                </svg>
                
                {/* Col 1 */}
                <motion.div className="flow-node small" style={{ top: 180, left: 40 }} custom={1} animate={flowControls}>Dashboard</motion.div>
                
                {/* Col 2 */}
                <motion.div className="flow-node small" style={{ top: 100, left: 220 }} custom={2} animate={flowControls}>Smart Transfers</motion.div>
                <motion.div className="flow-node small" style={{ top: 180, left: 220 }} custom={2} animate={flowControls}>Wealth Analytics</motion.div>
                <motion.div className="flow-node small" style={{ top: 260, left: 220 }} custom={2} animate={flowControls}>Card Settings</motion.div>

                {/* Col 3 */}
                <motion.div className="flow-node small" style={{ top: 60, left: 420 }} custom={3} animate={flowControls}>Select Payee</motion.div>
                <motion.div className="flow-node small" style={{ top: 140, left: 420 }} custom={3} animate={flowControls}>FX Converter</motion.div>
                <motion.div className="flow-node small" style={{ top: 180, left: 420 }} custom={3} animate={flowControls}>Spending Habits</motion.div>
                <motion.div className="flow-node small" style={{ top: 260, left: 420 }} custom={3} animate={flowControls}>Freeze Card</motion.div>

                {/* Col 4 */}
                <motion.div className="flow-node small" style={{ top: 60, left: 620 }} custom={4} animate={flowControls}>Confirm FaceID</motion.div>
              </div>

              {/* STAGE 4: WIREFRAME & PROTOTYPE (Far Mid Right - x:2400) */}
              <div className={`stage-box stage-mobile ${activeStage === 4 || activeStage === 7 ? 'active' : 'dimmed'}`}>
                <span className="stage-label">04 / Wireframe & Prototype</span>
                
                {/* SVG Noodles for Prototyping */}
                <svg className="prototype-noodles">
                  <motion.path d="M 240 250 C 260 250, 260 250, 280 250" className="proto-line" custom={1} animate={noodleControls} />
                  <motion.path d="M 480 250 C 500 250, 500 250, 520 250" className="proto-line" custom={2} animate={noodleControls} />
                </svg>

                {/* Mobile Frame 1: Dashboard */}
                <motion.div className="mobile-frame" style={{ top: 40, left: 40 }} custom={0} animate={wireframeControls}>
                  <div className="mob-wf-header" />
                  <div className="mob-wf-circle" />
                  <div className="mob-wf-balance" />
                  <div className="mob-wf-actions">
                    <div className="mob-wf-btn-small" />
                    <div className="mob-wf-btn-small" />
                    <div className="mob-wf-btn-small" />
                  </div>
                  <div className="mob-wf-line1" />
                  <div className="mob-wf-line2" />
                  <div className="mob-wf-line1" style={{ top: '300px' }} />
                </motion.div>

                {/* Mobile Frame 2: Transfer */}
                <motion.div className="mobile-frame" style={{ top: 40, left: 280 }} custom={1} animate={wireframeControls}>
                  <div className="mob-wf-header" style={{ left: '50px', width: '100px' }} />
                  <div className="mob-wf-recipient" />
                  <div className="mob-wf-amount" />
                  <div className="mob-wf-keypad" />
                  <div className="mob-wf-btn-large" />
                </motion.div>

                {/* Mobile Frame 3: Success */}
                <motion.div className="mobile-frame" style={{ top: 40, left: 520 }} custom={2} animate={wireframeControls}>
                  <div className="mob-wf-success-check" />
                  <div className="mob-wf-receipt" />
                  <div className="mob-wf-btn-large" />
                </motion.div>
              </div>

              {/* STAGE 5: DESIGN SYSTEM (Far Right - x:3200) */}
              <div className={`stage-box stage-system ${activeStage === 5 || activeStage === 7 ? 'active' : 'dimmed'}`}>
                <span className="stage-label">05 / Design System</span>
                
                <div className="sys-color-palette">
                  <motion.div className="sys-color sys-color-1" custom={0} animate={systemControls} />
                  <motion.div className="sys-color sys-color-2" custom={1} animate={systemControls} />
                  <motion.div className="sys-color sys-color-3" custom={2} animate={systemControls} />
                </div>

                <div className="sys-typography">
                  <motion.div className="sys-h1" custom={3} animate={systemControls}>Display Semibold 48px</motion.div>
                  <motion.div className="sys-h2" custom={4} animate={systemControls}>Heading Medium 24px</motion.div>
                  <motion.div className="sys-body" custom={5} animate={systemControls}>Body text utilizes Inter Regular 16px with 150% line height for optimal legibility in complex financial data tables.</motion.div>
                </div>

                <div className="sys-buttons">
                  <motion.div className="sys-btn-primary" custom={6} animate={systemControls}>Primary Action (#5A3FF2)</motion.div>
                  <motion.div className="sys-btn-secondary" custom={7} animate={systemControls}>Secondary Outline</motion.div>
                </div>
              </div>

              {/* STAGE 6: FINAL DESIGNS (End - x:4000) */}
              <div className={`stage-box stage-hifi ${activeStage === 6 || activeStage === 7 ? 'active' : 'dimmed'}`}>
                <span className="stage-label">06 / Final Designs</span>
                
                {/* Frame 1: Dashboard */}
                <motion.div className="mob-hifi-frame" style={{ top: 40, left: 40 }} custom={0} animate={hifiControls}>
                  <img src="/assets/bank_dashboard.jpg" className="mob-hifi-img" />
                </motion.div>
                
                {/* Frame 2: Transfer */}
                <motion.div className="mob-hifi-frame" style={{ top: 40, left: 280 }} custom={1} animate={hifiControls}>
                  <img src="/assets/bank_transfer.jpg" className="mob-hifi-img" />
                </motion.div>
                
                {/* Frame 3: Success */}
                <motion.div className="mob-hifi-frame" style={{ top: 40, left: 520 }} custom={2} animate={hifiControls}>
                  <img src="/assets/bank_success.jpg" className="mob-hifi-img" />
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FigmaHero;
