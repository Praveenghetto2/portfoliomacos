import React, { useState, useRef, useEffect } from 'react';

const WELCOME_TEXT = [
  "Welcome to DesignOS v1.0.0 Console shell.",
  "Type 'help' to explore the terminal system command nodes.",
  ""
];

const DesktopTerminal = () => {
  const [history, setHistory] = useState(WELCOME_TEXT);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  // Scroll to bottom on history change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    let response = [];

    switch (trimmed) {
      case 'help':
        response = [
          "Available command nodes in DesignOS shell:",
          "  help     - List available commands",
          "  whoami   - Print career summary and background profile",
          "  dream    - Reveal underlying design core philosophy",
          "  timeline - Output career milestone roadmap",
          "  movies   - Show movies that inspire DesignOS logic",
          "  skills   - Print core technical and creative skill matrix",
          "  future   - View roadmap objectives",
          "  clear    - Clear terminal screen log"
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
      case 'about':
        response = [
          "PROFILE: Praveen Kumar",
          "ROLE: Product Designer & Creative Technologist",
          "-------------------------------------------",
          "I build high-performance fintech, AI, and SaaS design ecosystems.",
          "My design philosophy is anchored around building scalable systems,",
          "leveraging quantitative user research, and bridging the gap",
          "between design and code seamlessly."
        ];
        break;
      case 'dream':
        response = [
          "DREAM OBJECTIVE:",
          "  To build design systems that act as invisible portals to complex",
          "  machine learning backends. Make enterprise software simple enough",
          "  that it ceases to feel like work."
        ];
        break;
      case 'timeline':
        response = [
          "MILESTONES & JOURNEY ROADMAP:",
          "  2021 - BCA Computer Science (KJC, Bangalore)",
          "  2022 - UI Developer @ DSG Inc (Code & Design transition)",
          "  2023 - Product Designer @ Revlitix (Designed AI SaaS from scratch)",
          "  2024 - Product Designer @ Candescent (Fintech Systems at Scale)"
        ];
        break;
      case 'movies':
        response = [
          "CINEMATIC DISCIPLINE INSPIRATIONS:",
          "  1. Interstellar     - High-latency async data loops lesson",
          "  2. Inception        - Nested token hierarchical tree systems lesson",
          "  3. Blade Runner 2049- Space brutalism, dark-mode lighting hierarchies",
          "",
          "Type or double click MOVIES.app to read full movie analysis."
        ];
        break;
      case 'future':
        response = [
          "FUTURE HORIZONS:",
          "  - Orchestrating Design System tokens using automated compilers",
          "  - Designing AI-native tabular interfaces that adapt in real-time",
          "  - Speaking at global UI developer workshops about Fintech clarity"
        ];
        break;
      case 'skills':
        response = [
          "TECHNICAL & DESIGN SKILL MATRIX:",
          "  Product Design       [██████████] 100%",
          "  Design Systems       [██████████] 100%",
          "  Interaction Design   [██████████] 100%",
          "  User Research        [████████░░] 80%",
          "  Front-End/React/CSS  [████████░░] 80%",
          "  No-Code Automation   [████████░░] 80%"
        ];
        break;
      case '':
        response = [];
        break;
      default:
        response = [`Command not found: '${trimmed}'. Type 'help' for options.`];
    }

    setHistory((prev) => [
      ...prev,
      `designos-user$ ${cmdText}`,
      ...response,
      ""
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full h-full bg-[#151517] text-[#A58CFF] font-mono p-5 overflow-y-auto text-xs leading-relaxed flex flex-col justify-start select-text"
    >
      <div className="flex-grow">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap min-h-[1.2rem]">
            {line.startsWith('designos-user$') ? (
              <span>
                <span className="text-[#1ABC9C] font-bold">➜ </span>
                <span className="text-[#3B82F6] font-bold">~ </span>
                <span className="text-white">{line.substring(14)}</span>
              </span>
            ) : line.startsWith('PROFILE:') || line.startsWith('ROLE:') || line.startsWith('SELECTED WORKS:') || line.startsWith('TECHNICAL &') ? (
              <span className="text-white font-bold">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
        
        {/* Terminal Input Line */}
        <div className="flex items-center gap-1.5 min-h-[1.2rem] mt-1">
          <span className="text-[#1ABC9C] font-bold flex-shrink-0">➜ </span>
          <span className="text-[#3B82F6] font-bold flex-shrink-0">~ </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white select-text focus:ring-0 p-0 m-0 font-mono"
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default DesktopTerminal;
