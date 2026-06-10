<template>
  <teleport to="body">
    <div id="cursor-dot" :class="{ hovering: isHovering }"></div>
    <div id="cursor-ring" :class="{ hovering: isHovering }"></div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isHovering = ref(false);

let dotEl  = null;
let ringEl = null;
let ringX  = 0;
let ringY  = 0;
let dotX   = 0;
let dotY   = 0;
let rafId  = null;

const lerp = (a, b, t) => a + (b - a) * t;

const animate = () => {
  ringX = lerp(ringX, dotX, 0.12);
  ringY = lerp(ringY, dotY, 0.12);

  if (dotEl)  dotEl.style.cssText  += `left:${dotX}px;top:${dotY}px;`;
  if (ringEl) ringEl.style.cssText += `left:${ringX}px;top:${ringY}px;`;

  rafId = requestAnimationFrame(animate);
};

const onMove = (e) => {
  dotX = e.clientX;
  dotY = e.clientY;
};

const onEnter = (e) => {
  const tag = e.target?.tagName?.toLowerCase();
  const role = e.target?.getAttribute?.('role');
  if (['a', 'button', 'input', 'textarea', 'select'].includes(tag) || role === 'button') {
    isHovering.value = true;
  }
};

const onLeave = () => { isHovering.value = false; };

onMounted(() => {
  dotEl  = document.getElementById('cursor-dot');
  ringEl = document.getElementById('cursor-ring');
  document.addEventListener('mousemove', onMove,  { passive: true });
  document.addEventListener('mouseover', onEnter, { passive: true });
  document.addEventListener('mouseout',  onLeave, { passive: true });
  rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseover', onEnter);
  document.removeEventListener('mouseout',  onLeave);
  cancelAnimationFrame(rafId);
});
</script>
