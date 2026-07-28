let audioCtx = null;
let interstellarActive = false;
let interstellarInterval = null;
let currentNodes = [];
let masterGain = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playSystemSound = (type = 'click', volumeLevel = 80) => {
  try {
    const vol = (volumeLevel / 100) * 0.5;
    if (vol <= 0) return;

    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
      gainNode.gain.setValueAtTime(vol * 0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'volume') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gainNode.gain.setValueAtTime(vol * 0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === 'launch') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(660, now + 0.08);
      gainNode.gain.setValueAtTime(vol * 0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(390, now + 0.08);
      gainNode.gain.setValueAtTime(vol * 0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.23);
    }
  } catch (e) {
    console.warn("Sound blocked or not supported:", e);
  }
};

/* ═══════════════════════════════════════════════
   INTERSTELLAR HANS ZIMMER ORGAN SYNTH ENGINE
   ═══════════════════════════════════════════════ */

// Hans Zimmer Interstellar Organ Chord Frequencies (Am -> F -> C -> G)
const INTERSTELLAR_CHORDS = [
  // Chord 1: A Minor (Am)
  [110.0, 164.81, 220.0, 261.63, 329.63],
  // Chord 2: F Major (F)
  [87.31, 130.81, 174.61, 220.0, 261.63],
  // Chord 3: C Major (C)
  [65.41, 98.0, 130.81, 164.81, 196.0],
  // Chord 4: G Major (G)
  [98.0, 146.83, 196.0, 246.94, 293.66]
];

export const isInterstellarPlaying = () => interstellarActive;

export const stopInterstellarMusic = () => {
  if (!interstellarActive) return;
  interstellarActive = false;

  if (interstellarInterval) {
    clearInterval(interstellarInterval);
    interstellarInterval = null;
  }

  if (masterGain && audioCtx) {
    const now = audioCtx.currentTime;
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    setTimeout(() => {
      currentNodes.forEach(node => {
        try { node.stop(); node.disconnect(); } catch (e) {}
      });
      currentNodes = [];
    }, 1600);
  }
};

export const startInterstellarMusic = (volumeLevel = 80) => {
  try {
    const ctx = getAudioContext();
    if (interstellarActive) return;
    interstellarActive = true;

    masterGain = ctx.createGain();
    const baseVol = (volumeLevel / 100) * 0.18;
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(baseVol, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);

    let chordIdx = 0;

    const playChord = (frequencies) => {
      const now = ctx.currentTime;

      // Fade out previous oscillators
      const oldNodes = [...currentNodes];
      currentNodes = [];

      oldNodes.forEach(n => {
        try {
          if (n.gain) {
            n.gain.gain.setValueAtTime(n.gain.gain.value, now);
            n.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          }
          setTimeout(() => { try { n.osc.stop(); } catch(e){} }, 1300);
        } catch (e) {}
      });

      // Create new organ pipe oscillators for this chord
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Organ pipe timbre: mix sine and soft triangle
        osc.type = i === 0 ? 'sine' : i % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Individual pipe balance
        const pipeVol = i === 0 ? 0.4 : (1 / (i + 1)) * 0.25;
        oscGain.gain.setValueAtTime(0.0001, now);
        oscGain.gain.exponentialRampToValueAtTime(pipeVol, now + 1.5);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);

        currentNodes.push({ osc, gain: oscGain });
      });
    };

    // Play first chord immediately
    playChord(INTERSTELLAR_CHORDS[0]);

    // Loop through Hans Zimmer chords every 5.5 seconds
    interstellarInterval = setInterval(() => {
      if (!interstellarActive) return;
      chordIdx = (chordIdx + 1) % INTERSTELLAR_CHORDS.length;
      playChord(INTERSTELLAR_CHORDS[chordIdx]);
    }, 5500);

  } catch (e) {
    console.warn("Interstellar audio failed to start:", e);
  }
};

export const toggleInterstellarMusic = (volumeLevel = 80) => {
  if (interstellarActive) {
    stopInterstellarMusic();
    return false;
  } else {
    startInterstellarMusic(volumeLevel);
    return true;
  }
};
