import { ref } from 'vue';

const theme = ref('dark'); // 'light' | 'dark'
let transitionTimer = null;
let activeCanvasCleanup = null;

const triggerSmoothTransition = () => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.add('theme-transitioning');
  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    root.classList.remove('theme-transitioning');
  }, 750);
};

const applyTheme = (val) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  if (val === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
    if (metaTheme) metaTheme.setAttribute('content', '#0C0C0C');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
    if (metaTheme) metaTheme.setAttribute('content', '#F2F1EC');
  }

  try {
    localStorage.setItem('worth_theme', val);
  } catch (e) {}
};

const initTheme = () => {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem('worth_theme');
    if (saved === 'dark' || saved === 'light') {
      theme.value = saved;
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'dark';
    }
  } catch (e) {
    theme.value = 'dark';
  }
  applyTheme(theme.value);
};

if (typeof window !== 'undefined') {
  initTheme();
}

// ============================================================================
// ADVANCED SYMBIOTE BIOMASS & SONIC PURGE ENGINE
// ============================================================================
const VERTEX_COUNT = 96;
const KEYFRAME_STEPS = 28;

/**
 * Viscous symbiote easing:
 * Initial tense containment breach (0 -> 0.18), explosive biomass surge (0.18 -> 0.82),
 * and high-tension snap settle (0.82 -> 1.0).
 */
const easeSymbiote = (t) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  if (t < 0.2) {
    // Coiled tension buildup while scout tendrils latch
    return 1.85 * t * t;
  }
  const u = (t - 0.2) / 0.8;
  return 0.074 + 0.926 * (1 - Math.pow(1 - u, 2.85));
};

/**
 * Builds deterministic organic profile for a single theme transition so the
 * CSS View Transition polygon and the 60/120fps Canvas physics overlay stay
 * 100% locked to the exact same radial wavefront.
 */
const createSymbioteProfile = (seed, mode, width, height) => {
  const spikeCount = mode === 'bond' ? 22 : 20;
  const spikes = [];

  for (let i = 0; i < spikeCount; i++) {
    const baseAngle = (i / spikeCount) * Math.PI * 2;
    const jitter = Math.sin(seed * (i + 1) * 4.13) * (Math.PI / spikeCount) * 0.55;
    const isScout = i % 2 === 0; // Scout tendrils shoot far ahead to latch onto the screen
    spikes.push({
      angle: baseAngle + jitter,
      amp: (isScout ? 0.34 : 0.18) + ((Math.sin(seed * (i + 3) * 5.7) + 1) * 0.5) * 0.28,
      width: 0.065 + ((Math.cos(seed * (i + 2) * 3.1) + 1) * 0.5) * 0.055,
      speed: 0.85 + ((Math.sin(seed * (i + 5) * 4.3) + 1) * 0.5) * 0.75,
      freq: 5 + (i % 5) * 2,
      isScout,
      hasFork: i % 3 !== 1,
      forkSign: i % 2 === 0 ? 1 : -1,
    });
  }

  // Fenestration pores (organic oval holes that stretch open inside the thin webbing collar)
  const pores = Array.from({ length: 34 }, (_, idx) => {
    const angle = (idx / 34) * Math.PI * 2 + Math.sin(seed * idx * 2.3) * 0.08;
    return {
      angle,
      radialBias: 0.91 + ((idx * 19) % 100) / 720,
      length: 9 + (idx % 5) * 5.5,
      thickness: 3.2 + (idx % 4) * 2.2,
      phase: (idx * 0.19) % 0.65,
    };
  });

  // Peripheral corner ambush veins (creep from the 4 viewport corners during takeover)
  const corners = [
    { cx: 0, cy: 0, baseAngle: Math.PI * 0.25 },
    { cx: width, cy: 0, baseAngle: Math.PI * 0.75 },
    { cx: width, cy: height, baseAngle: Math.PI * 1.25 },
    { cx: 0, cy: height, baseAngle: Math.PI * 1.75 },
  ];
  const cornerCreepers = [];
  corners.forEach((c, cIdx) => {
    for (let k = 0; k < 4; k++) {
      const spread = (k - 1.5) * 0.26 + Math.sin(seed * (cIdx * 5 + k)) * 0.08;
      cornerCreepers.push({
        cx: c.cx,
        cy: c.cy,
        angle: c.baseAngle + spread,
        maxLen: Math.min(width, height) * (0.22 + (k % 3) * 0.08),
        freq: 6 + k * 2,
        phase: cIdx * 1.3 + k,
      });
    }
  });

  return { seed, mode, spikes, pores, cornerCreepers };
};

/**
 * Pure radial wavefront function R(theta, p).
 * Keeping spike centers fixed in `theta` ensures CSS linear keyframe interpolation
 * matches the continuous canvas evaluation without any angular chord drift.
 */
const getSymbioteRadiusAtAngle = (theta, p, maxRadius, profile) => {
  if (p <= 0.0005) return 0;
  if (p >= 0.9995) return maxRadius * 1.42;

  const { seed, mode, spikes } = profile;
  const distortionEnv = Math.sin(Math.pow(p, 0.72) * Math.PI);
  const baseR = p * maxRadius * 1.24;

  // Multi-harmonic cellular biomass undulation
  const h1 = Math.sin(theta * 4 + seed + p * 5.5) * 0.105;
  const h2 = Math.cos(theta * 9 - seed * 1.7 - p * 8.5) * 0.085;
  const h3 = Math.sin(theta * 16 + seed * 2.4 + p * 11.5) * 0.06;
  const h4 = Math.cos(theta * 25 - seed * 3.3 + p * 14.0) * 0.038;

  // High-frequency sonic vibration ripple when purging (Dark -> Light)
  const sonicJitter =
    mode === 'purge'
      ? Math.sin(theta * 32 - p * 42) * 0.032 * distortionEnv
      : 0;

  let spikeBoost = 0;
  for (let i = 0; i < spikes.length; i++) {
    const sp = spikes[i];
    let dTheta = Math.abs(theta - sp.angle);
    if (dTheta > Math.PI) dTheta = Math.PI * 2 - dTheta;

    if (dTheta < sp.width * 2.5) {
      const gaussian = Math.exp(-(dTheta * dTheta) / (2 * sp.width * sp.width));
      const phaseEnv =
        mode === 'bond'
          ? Math.pow(Math.sin(Math.min(1, p * 1.12) * Math.PI), 0.68)
          : Math.pow(Math.sin(Math.pow(p, 0.62) * Math.PI), 0.62) * 1.32;
      spikeBoost += gaussian * sp.amp * phaseEnv;
    }
  }

  const factor =
    1 + (h1 + h2 + h3 + h4) * distortionEnv + sonicJitter + spikeBoost;
  return Math.max(0, baseR * factor);
};

const buildPolygonFrame = (x, y, p, maxRadius, profile) => {
  const pts = new Array(VERTEX_COUNT);
  for (let i = 0; i < VERTEX_COUNT; i++) {
    const theta = (i / VERTEX_COUNT) * Math.PI * 2;
    const r = getSymbioteRadiusAtAngle(theta, p, maxRadius, profile);
    const px = (x + Math.cos(theta) * r).toFixed(1);
    const py = (y + Math.sin(theta) * r).toFixed(1);
    pts[i] = `${px}px ${py}px`;
  }
  return `polygon(${pts.join(', ')})`;
};

/**
 * Draws a smooth tapered organic spline tendril from an array of {x, y, w} spine nodes.
 */
const drawTaperedTendril = (ctx, nodes, fillColor, highlightColor) => {
  if (nodes.length < 2) return;

  const leftPts = [];
  const rightPts = [];

  for (let i = 0; i < nodes.length; i++) {
    const curr = nodes[i];
    const prev = nodes[Math.max(0, i - 1)];
    const next = nodes[Math.min(nodes.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const halfW = curr.w * 0.5;

    leftPts.push({ x: curr.x + nx * halfW, y: curr.y + ny * halfW });
    rightPts.push({ x: curr.x - nx * halfW, y: curr.y - ny * halfW });
  }

  ctx.beginPath();
  ctx.moveTo(leftPts[0].x, leftPts[0].y);
  for (let i = 1; i < leftPts.length; i++) {
    const prev = leftPts[i - 1];
    const curr = leftPts[i];
    ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) * 0.5, (prev.y + curr.y) * 0.5);
  }
  const tip = nodes[nodes.length - 1];
  ctx.lineTo(tip.x, tip.y);

  for (let i = rightPts.length - 1; i >= 1; i--) {
    const curr = rightPts[i];
    const next = rightPts[i - 1];
    ctx.quadraticCurveTo(curr.x, curr.y, (curr.x + next.x) * 0.5, (curr.y + next.y) * 0.5);
  }
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();

  // Wet specular ridge along one side of the tendril
  if (highlightColor && leftPts.length > 3) {
    ctx.beginPath();
    ctx.moveTo(leftPts[0].x, leftPts[0].y);
    for (let i = 1; i < leftPts.length - 1; i++) {
      const prev = leftPts[i - 1];
      const curr = leftPts[i];
      ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) * 0.5, (prev.y + curr.y) * 0.5);
    }
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }
};

// ── Full-Viewport Symbiote Physics & Webbing Canvas Overlay ────────────────
const runSymbioteCanvasOverlay = ({
  x,
  y,
  maxRadius,
  duration,
  mode,
  profile,
  fillBody = false,
}) => {
  if (typeof document === 'undefined') return;
  if (activeCanvasCleanup) {
    activeCanvasCleanup();
    activeCanvasCleanup = null;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'symbiote-transition-canvas';
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Detached viscous droplets & snapping biomass beads
  const droplets = Array.from({ length: 36 }, (_, idx) => {
    const sp = profile.spikes[idx % profile.spikes.length];
    return {
      angle: sp.angle + Math.sin(profile.seed * idx * 7.1) * 0.12,
      offsetRatio: 1.03 + ((idx * 23) % 100) / 310,
      size: 2.0 + (idx % 5) * 1.45,
      stretch: 1.5 + (idx % 3) * 0.55,
      wobble: idx * 1.9,
    };
  });

  let rafId = null;
  const startTime = performance.now();

  const cleanup = () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
  activeCanvasCleanup = cleanup;

  const renderFrame = (now) => {
    const elapsed = now - startTime;
    const rawT = Math.min(1, elapsed / duration);
    const easedT = easeSymbiote(rawT);

    // 'bond' (Light -> Dark): symbiote expands 0 -> 1
    // 'purge' (Dark -> Light): symbiote retracts 1 -> 0 into containment switch (x, y)
    const p = mode === 'bond' ? easedT : 1 - easedT;

    ctx.clearRect(0, 0, width, height);

    const edgeAlpha =
      rawT < 0.05
        ? rawT / 0.05
        : rawT > 0.88
        ? Math.max(0, (1 - rawT) / 0.12)
        : 1;

    if (edgeAlpha > 0.01) {
      ctx.save();

      const tendrilEnv = Math.sin(Math.pow(rawT, 0.72) * Math.PI);

      // Compute 96-point outer wavefront & inner collar vertices
      const outerPts = new Array(VERTEX_COUNT);
      const innerCollarPts = new Array(VERTEX_COUNT);
      const outerCollarPts = new Array(VERTEX_COUNT);

      const collarSpread = (26 + tendrilEnv * 38);

      for (let i = 0; i < VERTEX_COUNT; i++) {
        const theta = (i / VERTEX_COUNT) * Math.PI * 2;
        const r = getSymbioteRadiusAtAngle(theta, p, maxRadius, profile);
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        outerPts[i] = {
          theta,
          r,
          x: x + cosT * r,
          y: y + sinT * r,
        };

        const rIn = Math.max(0, r - collarSpread * 0.85);
        const rOut = r + collarSpread * 0.55;

        innerCollarPts[i] = {
          x: x + cosT * rIn,
          y: y + sinT * rIn,
        };
        outerCollarPts[i] = {
          x: x + cosT * rOut,
          y: y + sinT * rOut,
        };
      }

      // Fallback full body fill when View Transition API is unsupported
      if (fillBody) {
        ctx.beginPath();
        outerPts.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.fillStyle = '#060709';
        ctx.globalAlpha = Math.min(1, edgeAlpha * 1.15);
        ctx.fill();
      }

      // ── 1. Corner Infection Ambush Creepers (Light -> Dark) ──────────────
      if (mode === 'bond' && rawT < 0.82) {
        const cornerEnv = Math.sin((rawT / 0.82) * Math.PI);
        ctx.globalAlpha = edgeAlpha * 0.88;
        profile.cornerCreepers.forEach((cc, cIdx) => {
          const curLen = cc.maxLen * Math.pow(cornerEnv, 0.8);
          if (curLen < 6) return;
          const nodes = [];
          const steps = 7;
          const perpX = -Math.sin(cc.angle);
          const perpY = Math.cos(cc.angle);

          for (let s = 0; s <= steps; s++) {
            const st = s / steps;
            const d = st * curLen;
            const w = Math.sin(st * cc.freq - rawT * 14 + cc.phase) * (12 * st * cornerEnv);
            nodes.push({
              x: cc.cx + Math.cos(cc.angle) * d + perpX * w,
              y: cc.cy + Math.sin(cc.angle) * d + perpY * w,
              w: Math.max(1.2, (14 * cornerEnv) * Math.pow(1 - st, 1.3)),
            });
          }
          drawTaperedTendril(
            ctx,
            nodes,
            '#060709',
            cIdx % 2 === 0 ? 'rgba(16, 185, 129, 0.35)' : 'rgba(255, 255, 255, 0.22)'
          );
        });
      }

      // ── 2. Scout Latch Tendrils & Multi-Branching Writhing Tentacles ─────
      ctx.globalAlpha = edgeAlpha * 0.96;
      for (let i = 0; i < profile.spikes.length; i++) {
        const sp = profile.spikes[i];
        const baseR = getSymbioteRadiusAtAngle(sp.angle, p, maxRadius, profile);

        // Scout tendrils launch earlier and reach much farther to anchor onto the screen
        const scoutBoost =
          sp.isScout && rawT < 0.55
            ? Math.sin((rawT / 0.55) * Math.PI) * (mode === 'bond' ? 145 : 165)
            : 0;
        const reachLength =
          (mode === 'bond' ? 78 + sp.amp * 225 : 95 + sp.amp * 270) * tendrilEnv +
          scoutBoost;

        if (reachLength < 4) continue;

        const segments = 9;
        const baseThickness =
          (mode === 'bond' ? 14 : 16) *
          tendrilEnv *
          (0.75 + sp.amp * 0.9);

        const perpX = -Math.sin(sp.angle);
        const perpY = Math.cos(sp.angle);
        const anchorStartR = Math.max(0, baseR - 18);

        const spineNodes = [];
        for (let s = 0; s <= segments; s++) {
          const segT = s / segments;
          const dist = anchorStartR + segT * reachLength;
          // Sinuous whip wave propagating outward (bond) or vibrating under sonic stress (purge)
          const wavePhase =
            mode === 'bond'
              ? segT * 5.8 - rawT * 16 * sp.speed + i * 1.7
              : segT * 9.5 + rawT * 26 * sp.speed + i * 2.1;
          const waveAmp =
            (mode === 'bond' ? 22 : 26) *
            Math.pow(segT, 0.85) *
            tendrilEnv;
          const writhe = Math.sin(wavePhase) * waveAmp;

          spineNodes.push({
            x: x + Math.cos(sp.angle) * dist + perpX * writhe,
            y: y + Math.sin(sp.angle) * dist + perpY * writhe,
            w: Math.max(1.1, baseThickness * Math.pow(1 - segT, 1.42)),
          });
        }

        const highlightCol =
          i % 3 === 0
            ? 'rgba(16, 185, 129, 0.55)'
            : i % 3 === 1
            ? 'rgba(45, 212, 191, 0.42)'
            : 'rgba(255, 255, 255, 0.34)';

        drawTaperedTendril(ctx, spineNodes, '#050608', highlightCol);

        // Secondary & Tertiary Forked Sub-Tendrils
        if (sp.hasFork && spineNodes.length > 5) {
          const branchNode = spineNodes[4];
          const forkAngle =
            sp.angle +
            sp.forkSign * (0.34 + Math.sin(rawT * 12 + i) * 0.12);
          const forkLen = reachLength * 0.48;
          const forkNodes = [];
          const fPerpX = -Math.sin(forkAngle);
          const fPerpY = Math.cos(forkAngle);

          for (let fs = 0; fs <= 5; fs++) {
            const ft = fs / 5;
            const fd = ft * forkLen;
            const fw =
              Math.sin(ft * 4.5 - rawT * 18 + i) * (10 * ft * tendrilEnv);
            forkNodes.push({
              x: branchNode.x + Math.cos(forkAngle) * fd + fPerpX * fw,
              y: branchNode.y + Math.sin(forkAngle) * fd + fPerpY * fw,
              w: Math.max(0.9, branchNode.w * 0.72 * Math.pow(1 - ft, 1.3)),
            });
          }
          drawTaperedTendril(
            ctx,
            forkNodes,
            '#060709',
            'rgba(16, 185, 129, 0.38)'
          );
        }
      }

      // ── 3. Taut Catenary Webbing Filaments Between Neighboring Tendrils ──
      ctx.globalAlpha = edgeAlpha * 0.85;
      for (let i = 0; i < profile.spikes.length; i++) {
        const spA = profile.spikes[i];
        const spB = profile.spikes[(i + 1) % profile.spikes.length];
        const rA = getSymbioteRadiusAtAngle(spA.angle, p, maxRadius, profile);
        const rB = getSymbioteRadiusAtAngle(spB.angle, p, maxRadius, profile);

        // Double-tier webbing bridges (inner and outer strands)
        for (let tier = 0; tier < 2; tier++) {
          const reachFactor = tier === 0 ? 1.04 : 1.15;
          const pullFactor = tier === 0 ? 0.78 : 0.86;

          const ax = x + Math.cos(spA.angle) * (rA * reachFactor);
          const ay = y + Math.sin(spA.angle) * (rA * reachFactor);
          const bx = x + Math.cos(spB.angle) * (rB * reachFactor);
          const by = y + Math.sin(spB.angle) * (rB * reachFactor);

          let midAngle = (spA.angle + spB.angle) * 0.5;
          if (Math.abs(spA.angle - spB.angle) > Math.PI) {
            midAngle += Math.PI;
          }
          const pullR =
            ((rA + rB) * 0.5) *
            (pullFactor + Math.sin(rawT * 12 + i + tier) * 0.04);
          const cx = x + Math.cos(midAngle) * pullR;
          const cy = y + Math.sin(midAngle) * pullR;

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.quadraticCurveTo(cx, cy, bx, by);
          ctx.strokeStyle = '#060709';
          ctx.lineWidth = (tier === 0 ? 2.4 : 1.25) * tendrilEnv;
          ctx.stroke();
        }
      }

      // ── 4. Fenestrated Viscous Biomass Collar (Membrane with Stretching Pores) ──
      // Uses evenodd winding to carve organic stretching oval pores right out of the tar collar!
      ctx.beginPath();
      // Outer collar loop (clockwise)
      for (let i = 0; i <= VERTEX_COUNT; i++) {
        const pt = outerCollarPts[i % VERTEX_COUNT];
        const nextPt = outerCollarPts[(i + 1) % VERTEX_COUNT];
        const midX = (pt.x + nextPt.x) * 0.5;
        const midY = (pt.y + nextPt.y) * 0.5;
        if (i === 0) ctx.moveTo(midX, midY);
        else ctx.quadraticCurveTo(pt.x, pt.y, midX, midY);
      }
      ctx.closePath();

      // Inner collar loop (counter-clockwise)
      for (let i = VERTEX_COUNT; i >= 0; i--) {
        const pt = innerCollarPts[i % VERTEX_COUNT];
        const prevPt = innerCollarPts[(i - 1 + VERTEX_COUNT) % VERTEX_COUNT];
        const midX = (pt.x + prevPt.x) * 0.5;
        const midY = (pt.y + prevPt.y) * 0.5;
        if (i === VERTEX_COUNT) ctx.moveTo(midX, midY);
        else ctx.quadraticCurveTo(pt.x, pt.y, midX, midY);
      }
      ctx.closePath();

      // Fenestration holes inside the membrane band
      for (let i = 0; i < profile.pores.length; i++) {
        const pore = profile.pores[i];
        const rWave = getSymbioteRadiusAtAngle(pore.angle, p, maxRadius, profile);
        if (rWave < 30) continue;

        const poreLife = Math.sin(
          Math.max(0, Math.min(1, (rawT - pore.phase * 0.4) / 0.7)) * Math.PI
        );
        if (poreLife <= 0.08) continue;

        const pr = rWave + (pore.radialBias - 0.93) * collarSpread * 1.4;
        const px = x + Math.cos(pore.angle) * pr;
        const py = y + Math.sin(pore.angle) * pr;
        const rx = pore.length * poreLife * tendrilEnv;
        const ry = pore.thickness * poreLife * tendrilEnv;

        if (rx > 1 && ry > 0.6) {
          const tangent = pore.angle + Math.PI * 0.5;
          ctx.moveTo(
            px + Math.cos(tangent) * rx,
            py + Math.sin(tangent) * rx
          );
          ctx.ellipse(px, py, rx, ry, tangent, 0, Math.PI * 2);
        }
      }

      ctx.shadowColor =
        mode === 'bond'
          ? 'rgba(5, 6, 8, 0.9)'
          : 'rgba(16, 185, 129, 0.42)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#060709';
      ctx.globalAlpha = edgeAlpha * 0.96;
      ctx.fill('evenodd');
      ctx.shadowBlur = 0;

      // ── 5. 3D Wet Specular & Iridescent Emerald-Cyan Rim Lighting ────────
      ctx.beginPath();
      for (let i = 0; i <= VERTEX_COUNT; i++) {
        const pt = outerPts[i % VERTEX_COUNT];
        const nextPt = outerPts[(i + 1) % VERTEX_COUNT];
        const midX = (pt.x + nextPt.x) * 0.5;
        const midY = (pt.y + nextPt.y) * 0.5;
        if (i === 0) ctx.moveTo(midX, midY);
        else ctx.quadraticCurveTo(pt.x, pt.y, midX, midY);
      }
      ctx.closePath();

      // Bioluminescent emerald-cyan subsurface glow
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.52)';
      ctx.lineWidth = 3.2;
      ctx.globalAlpha = edgeAlpha * 0.72;
      ctx.stroke();

      // Crisp wet studio specular highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
      ctx.lineWidth = 1.45;
      ctx.globalAlpha = edgeAlpha * 0.85;
      ctx.stroke();

      // ── 6. Detached Viscous Symbiote Droplets & Tearing Beads ────────────
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        const rBase = getSymbioteRadiusAtAngle(d.angle, p, maxRadius, profile);
        const dist =
          rBase * d.offsetRatio +
          Math.sin(rawT * 15 + d.wobble) * 24 * tendrilEnv;
        if (dist < 14) continue;

        const dx = x + Math.cos(d.angle) * dist;
        const dy = y + Math.sin(d.angle) * dist;
        const radius = d.size * tendrilEnv;
        if (radius < 0.6) continue;

        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(d.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * d.stretch, radius * 0.72, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#060709';
        ctx.globalAlpha = edgeAlpha * 0.92;
        ctx.fill();

        // Tiny wet glint on each droplet
        ctx.beginPath();
        ctx.ellipse(
          -radius * 0.25,
          -radius * 0.2,
          radius * 0.45,
          radius * 0.22,
          0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fill();
        ctx.restore();
      }

      // ── 7. Origin Containment Breach / Sonic Resonance Shockwaves at (x, y) ──
      const ringCount = mode === 'purge' ? 3 : 2;
      for (let rIdx = 0; rIdx < ringCount; rIdx++) {
        const delay = rIdx * 0.12;
        const localT = (rawT - delay) / (0.58 - delay);
        if (localT <= 0 || localT >= 1) continue;

        const ringR =
          mode === 'purge'
            ? 14 + localT * 175
            : 12 + localT * 92;

        ctx.beginPath();
        const segs = 48;
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const wave =
            mode === 'purge'
              ? Math.sin(a * 16 - rawT * 45) * (7 * (1 - localT))
              : Math.sin(a * 9 + rawT * 24) * (8 * (1 - localT));
          const rx = x + Math.cos(a) * (ringR + wave);
          const ry = y + Math.sin(a) * (ringR + wave);
          if (i === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();

        ctx.strokeStyle =
          mode === 'purge'
            ? rIdx % 2 === 0
              ? 'rgba(16, 185, 129, 0.78)'
              : 'rgba(45, 212, 191, 0.65)'
            : 'rgba(7, 8, 10, 0.82)';
        ctx.lineWidth = (1 - localT) * (mode === 'purge' ? 3.2 : 4.2);
        ctx.globalAlpha = (1 - localT) * 0.88;
        ctx.stroke();
      }

      ctx.restore();
    }

    if (rawT < 1) {
      rafId = requestAnimationFrame(renderFrame);
    } else {
      cleanup();
      if (activeCanvasCleanup === cleanup) {
        activeCanvasCleanup = null;
      }
    }
  };

  rafId = requestAnimationFrame(renderFrame);
};

export function useTheme() {
  const toggleTheme = (event) => {
    const next = theme.value === 'light' ? 'dark' : 'light';
    const mode = next === 'dark' ? 'bond' : 'purge';

    // Resolve exact center of the switch button or click point
    let x = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let y = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    if (event) {
      if (
        event.currentTarget &&
        typeof event.currentTarget.getBoundingClientRect === 'function'
      ) {
        const rect = event.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (
        typeof event.clientX === 'number' &&
        (event.clientX !== 0 || event.clientY !== 0)
      ) {
        x = event.clientX;
        y = event.clientY;
      }
    }

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      theme.value = next;
      applyTheme(next);
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const endRadius = Math.hypot(
      Math.max(x, width - x),
      Math.max(y, height - y)
    );

    const duration = 980;
    const seed = Math.random() * 100 + 21.73;
    const profile = createSymbioteProfile(seed, mode, width, height);

    const canViewTransition =
      typeof document !== 'undefined' &&
      typeof document.startViewTransition === 'function';

    if (!canViewTransition) {
      triggerSmoothTransition();
      runSymbioteCanvasOverlay({
        x,
        y,
        maxRadius: endRadius,
        duration,
        mode,
        profile,
        fillBody: true,
      });
      setTimeout(() => {
        theme.value = next;
        applyTheme(next);
      }, duration * 0.44);
      return;
    }

    const root = document.documentElement;
    if (mode === 'purge') {
      root.classList.add('symbiote-purging');
    } else {
      root.classList.remove('symbiote-purging');
    }

    const transition = document.startViewTransition(() => {
      theme.value = next;
      applyTheme(next);
    });

    transition.ready
      .then(() => {
        const keyframes = [];
        for (let s = 0; s <= KEYFRAME_STEPS; s++) {
          const rawStep = s / KEYFRAME_STEPS;
          const easedStep = easeSymbiote(rawStep);
          const p = mode === 'bond' ? easedStep : 1 - easedStep;
          keyframes.push({
            clipPath: buildPolygonFrame(x, y, p, endRadius, profile),
            offset: rawStep,
          });
        }

        runSymbioteCanvasOverlay({
          x,
          y,
          maxRadius: endRadius,
          duration,
          mode,
          profile,
          fillBody: false,
        });

        document.documentElement.animate(keyframes, {
          duration,
          easing: 'linear',
          fill: 'forwards',
          pseudoElement:
            mode === 'bond'
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)',
        });
      })
      .catch(() => {
        root.classList.remove('symbiote-purging');
      });

    transition.finished
      .finally(() => {
        root.classList.remove('symbiote-purging');
      })
      .catch(() => {});
  };

  const setDark = () => {
    triggerSmoothTransition();
    theme.value = 'dark';
    applyTheme('dark');
  };

  const setLight = () => {
    triggerSmoothTransition();
    theme.value = 'light';
    applyTheme('light');
  };

  return {
    theme,
    toggleTheme,
    setDark,
    setLight,
    initTheme,
  };
}
