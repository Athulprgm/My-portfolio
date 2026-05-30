<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        class="relative max-w-md w-full bg-neutral-900 border border-white/8 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left"
      >
        <!-- Top Decoration Accent Bar -->
        <div
          class="absolute top-0 left-0 w-full h-1"
          :style="{
            background: `linear-gradient(90deg, ${activeTheme.colors[0]}, ${
              activeTheme.colors[1] || activeTheme.colors[0]
            })`,
          }"
        ></div>

        <button class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer z-10" @click="handleClose">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <!-- Header Image -->
        <div class="relative w-full h-[180px] overflow-hidden border-b border-white/5">
          <img
            :src="activeTheme.image"
            :alt="activeTheme.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="p-6 flex-1">
          <div class="font-sans">
            <h3 class="font-mono text-md font-bold text-white mb-3 tracking-wide">{{ activeTheme.title }}</h3>
            <p class="text-xs text-neutral-300 leading-relaxed italic bg-white/2 border border-white/5 p-3 rounded-lg font-sans">{{ activeTheme.message }}</p>
            <span class="block font-mono text-[10px] text-neutral-500 text-right mt-3">- Athul Krishna</span>
          </div>
        </div>

        <div class="p-5 border-t border-white/5 bg-neutral-950/40 flex justify-end gap-3">
          <button class="px-4 py-2 border border-white/10 rounded font-mono text-xs text-neutral-400 hover:bg-white/2 hover:text-white transition-colors cursor-pointer" @click="handleClose">
            Close
          </button>
          <button class="px-4 py-2 bg-indigo-600 rounded font-mono text-xs text-white hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer" @click="handleClose">
            Explore Portfolio
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const SPECIAL_DAYS = [
  {
    id: "christmas",
    startMonth: 11, // December
    startDate: 15,
    endMonth: 11,
    endDate: 30,
    title: "Season's Greetings!",
    message:
      '"May your bugs be few, your commits be clean, and your holidays be compiled with joy. Merry Christmas!"',
    image: "/christmas-celebration-with-santa-claus.jpg",
    colors: ["#ef4444", "#3b82f6"],
  },
  {
    id: "newyear",
    startMonth: 11, // December
    startDate: 31,
    endMonth: 0, // January
    endDate: 5,
    title: "Happy New Year!",
    message:
      '"Cheers to a new year and another chance for us to get it right. Wish you a coding-filled Happy New Year!"',
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=1000",
    colors: ["#fbbf24", "#7c3aed"],
  },
  {
    id: "republicday",
    startMonth: 0, // January
    startDate: 24,
    endMonth: 0,
    endDate: 27,
    title: "Happy Republic Day!",
    message:
      '"Freedom in mind, faith in words, pride in our heart, memories in our souls. Let\'s salute the nation on Republic Day."',
    image:
      "https://images.unsplash.com/photo-1597058712635-3182d1e523c8?auto=format&fit=crop&q=80&w=1000",
    colors: ["#ff9933", "#138808"],
  },
  {
    id: "valentines",
    startMonth: 1, // February
    startDate: 7,
    endMonth: 1,
    endDate: 15,
    title: "Happy Valentine's Day!",
    message:
      '"Code is poetry, and building things is love. Spread the love this Valentine\'s Day!"',
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000",
    colors: ["#ec4899", "#ef4444"],
  },
  {
    id: "independence",
    startMonth: 7, // August
    startDate: 12,
    endMonth: 7,
    endDate: 16,
    title: "Happy Independence Day!",
    message:
      '"May the sun in his course visit no land more free, more happy, more lovely, than this our own country."',
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1000",
    colors: ["#ff9933", "#000080"],
  },
  {
    id: "halloween",
    startMonth: 9, // October
    startDate: 25,
    endMonth: 10,
    endDate: 1,
    title: "Spooky Season!",
    message:
      '"Double, double toil and trouble; Fire burn and caldron bubble. Happy Halloween!"',
    image:
      "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&q=80&w=1000",
    colors: ["#f97316", "#000000"],
  },
];

const isOpen = ref(false);
const activeTheme = ref(null);

const handleClose = () => {
  isOpen.value = false;
};

onMounted(() => {
  const today = new Date();
  const month = today.getMonth();
  const date = today.getDate();

  const foundDay = SPECIAL_DAYS.find((day) => {
    if (day.startMonth > day.endMonth) {
      if (month === day.startMonth && date >= day.startDate) return true;
      if (month === day.endMonth && date <= day.endDate) return true;
      return false;
    } else {
      if (month < day.startMonth || month > day.endMonth) return false;
      if (day.startMonth === day.endMonth) {
        return date >= day.startDate && date <= day.endDate;
      }
      if (month === day.startMonth && date >= day.startDate) return true;
      if (month === day.endMonth && date <= day.endDate) return true;
      if (month > day.startMonth && month < day.endMonth) return true;
      return false;
    }
  });

  if (foundDay) {
    activeTheme.value = foundDay;
    setTimeout(() => {
      isOpen.value = true;
    }, 1500);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
