<template>
  <div class="sw-container pt-28 sm:pt-40 pb-8">
    <!-- Label row -->
    <div class="sw-grid gap-y-4 mb-10 sm:mb-14 scroll-reveal">
      <div class="col-span-2 md:col-span-3 sw-label">(05) — Contact</div>
      <div class="col-span-2 md:col-span-9 sw-label flex items-center gap-2 md:justify-end">
        <span class="sw-dot animate-pulse"></span>
        <span class="!text-[var(--text-primary)]">Open for collaboration</span>
      </div>
    </div>

    <!-- Giant CTA -->
    <h2 class="sw-display text-[clamp(3.6rem,13vw,13.5rem)] scroll-reveal">
      <span class="block text-[var(--text-muted)]">Have an idea?</span>
      <button
        @click="openInquiryModal"
        class="group flex items-center gap-[0.15em] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-500 cursor-pointer text-left"
      >
        <span>Let's talk</span>
        <span
          class="inline-flex items-center justify-center w-[0.72em] h-[0.72em] rounded-full border border-current text-[0.36em] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:rotate-45 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-white"
        >↗</span>
      </button>
    </h2>

    <!-- Email + intro -->
    <div class="sw-grid gap-y-8 mt-14 sm:mt-20 scroll-reveal">
      <p class="col-span-4 md:col-span-4 text-[17px] leading-[1.4] tracking-[-0.01em] text-[var(--text-secondary)] max-w-[36ch]">
        I'm open to building meaningful products, collaborating on ambitious ideas and solving high-impact technical problems.
      </p>
      <div class="col-span-4 md:col-span-7 md:col-start-6 flex flex-col items-start md:items-end gap-3">
        <a
          href="mailto:athul@trawbit.com"
          class="sw-link font-heading text-[clamp(1.6rem,3.6vw,3.25rem)] tracking-[-0.04em] leading-none text-[var(--text-primary)]"
        >athul@trawbit.com</a>
        <button @click="copyEmail" class="sw-label hover:!text-[var(--text-primary)] cursor-pointer">
          {{ emailCopied ? 'Copied ✓' : 'Copy address ⧉' }}
        </button>
      </div>
    </div>

    <!-- Channels -->
    <ul class="mt-20 sm:mt-28 border-b border-[var(--border-color)]">
      <li v-for="(ch, i) in channels" :key="ch.label" class="scroll-reveal" :class="`reveal-delay-${(i + 1) * 100}`">
        <a
          :href="ch.href"
          :target="ch.external ? '_blank' : undefined"
          :rel="ch.external ? 'noopener noreferrer' : undefined"
          :download="ch.download || undefined"
          class="group relative block border-t border-[var(--border-color)] overflow-hidden"
        >
          <!-- hover fill -->
          <span
            class="absolute inset-0 bg-[var(--text-primary)] origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
            aria-hidden="true"
          ></span>
          <span class="relative sw-grid items-baseline py-5 sm:py-6 transition-colors duration-500 group-hover:text-[var(--bg-primary)]">
            <span class="col-span-1 font-mono-clean text-[11px] opacity-60">0{{ i + 1 }}</span>
            <span class="col-span-3 md:col-span-4 font-heading text-2xl sm:text-4xl tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3">
              {{ ch.label }}
            </span>
            <span class="hidden md:block md:col-span-5 font-mono-clean text-[12px] uppercase tracking-[0.05em] opacity-70">
              {{ ch.handle }}
            </span>
            <span class="hidden md:flex md:col-span-2 justify-end text-xl transition-transform duration-500 group-hover:rotate-45">
              {{ ch.download ? '↓' : '↗' }}
            </span>
          </span>
        </a>
      </li>
    </ul>

    <!-- Footer -->
    <footer class="mt-24 sm:mt-36">
      <div
        class="sw-display text-[clamp(3.5rem,17.5vw,19rem)] text-center sw-outline opacity-60 select-none leading-[0.8]"
        aria-hidden="true"
      >
        Athul K.
      </div>
      <div class="sw-rule mt-6"></div>
      <div class="sw-grid gap-y-3 pt-5 sw-label">
        <span class="col-span-2 md:col-span-3">© {{ currentYear }} Athul Krishna</span>
        <span class="col-span-2 md:col-span-3">Kerala, India</span>
        <span class="hidden md:block md:col-span-3">Designed &amp; built in-house</span>
        <button
          @click="scrollToTop"
          class="col-span-4 md:col-span-3 text-left md:text-right hover:!text-[var(--text-primary)] cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>
    </footer>

    <!-- Inquiry modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalOpen"
          class="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center sm:p-6"
          @click.self="closeInquiryModal"
          role="dialog"
          aria-modal="true"
          aria-label="Start a project inquiry"
        >
          <div
            data-lenis-prevent
            class="modal-panel w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]"
          >
            <div class="flex items-center justify-between px-6 sm:px-10 h-16 border-b border-[var(--border-color)]">
              <span class="sw-label">New inquiry</span>
              <button @click="closeInquiryModal" class="group sw-label !text-[var(--text-primary)] flex items-center gap-2 cursor-pointer">
                <span class="sw-link">Close</span>
                <span class="transition-transform duration-500 group-hover:rotate-90">✕</span>
              </button>
            </div>

            <div class="px-6 sm:px-10 pt-8 pb-10">
              <h3 class="font-heading font-medium text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] mb-3">
                Tell me about<br />your <span class="font-serif-editorial text-[var(--accent)]">project.</span>
              </h3>
              <p class="text-[14px] text-[var(--text-secondary)] mb-10">
                A short brief is enough. Prefer a DM?
                <a :href="instagramUrl" target="_blank" rel="noopener noreferrer" class="sw-link text-[var(--text-primary)]">Instagram ↗</a>
              </p>

              <form @submit.prevent="handleSubmit" class="space-y-7">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <label class="block">
                    <span class="sw-label block mb-1">Name *</span>
                    <input v-model.trim="form.name" required type="text" placeholder="Alex Morgan" class="sw-input" />
                  </label>
                  <label class="block">
                    <span class="sw-label block mb-1">Email *</span>
                    <input v-model.trim="form.email" required type="email" placeholder="alex@company.com" class="sw-input" />
                  </label>
                </div>

                <div>
                  <span class="sw-label block mb-3">Scope</span>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="opt in serviceOptions"
                      :key="opt"
                      type="button"
                      @click="form.service = opt"
                      class="px-3.5 py-2 rounded-full border text-[13px] cursor-pointer transition-colors"
                      :class="form.service === opt
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                        : 'border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'"
                    >
                      {{ opt }}
                    </button>
                  </div>
                </div>

                <div>
                  <span class="sw-label block mb-3">Budget</span>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="opt in budgetOptions"
                      :key="opt.value"
                      type="button"
                      @click="form.budget = opt.value"
                      class="px-3.5 py-2 rounded-full border text-[13px] cursor-pointer transition-colors"
                      :class="form.budget === opt.value
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                        : 'border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>

                <label class="block">
                  <span class="sw-label block mb-1">Overview &amp; timeline *</span>
                  <textarea
                    v-model.trim="form.message"
                    required
                    minlength="5"
                    rows="4"
                    placeholder="What you're building, key goals, target launch…"
                    class="sw-input resize-none"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn-worth w-full !py-4 cursor-pointer disabled:opacity-60"
                >
                  {{ submitting ? 'Sending…' : 'Send inquiry →' }}
                </button>
              </form>

              <Transition name="fade">
                <p
                  v-if="statusMessage"
                  class="mt-5 text-[13px] flex items-start gap-2"
                  :class="isSuccess ? 'text-[var(--text-primary)]' : 'text-[var(--accent)]'"
                >
                  <span class="sw-dot mt-1.5 shrink-0" :class="isSuccess ? '!bg-[var(--text-primary)]' : ''"></span>
                  {{ statusMessage }}
                </p>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useEnquiries } from '../composables/useEnquiries';
import { useScrollReveal } from '../composables/useScrollReveal';
import { useSmoothScroll } from '../composables/useSmoothScroll';

useScrollReveal();

const { submitEnquiry } = useEnquiries();
const { scrollTo: smoothScrollTo, stopScroll, startScroll } = useSmoothScroll();

const instagramUrl =
  'https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';

const channels = [
  { label: 'Email', handle: 'athul@trawbit.com', href: 'mailto:athul@trawbit.com' },
  { label: 'LinkedIn', handle: 'in/athul-krishna-k', href: 'https://www.linkedin.com/in/athul-krishna-k/', external: true },
  { label: 'GitHub', handle: '@athulprgm', href: 'https://github.com/Athulprgm', external: true },
  { label: 'Instagram', handle: '@_athul_krishnaa', href: instagramUrl, external: true },
  { label: 'Résumé', handle: 'PDF — download', href: '/Athul_Krishna_Resume.pdf', download: true },
];

const serviceOptions = [
  'Full-Stack Web Application',
  'Mobile Application (iOS/Android)',
  'POS & Business Software',
  'Backend Architecture & APIs',
  'Technical Advisory / Co-Founding',
];

const budgetOptions = [
  { value: 'Flexible / Discuss', label: "Let's discuss" },
  { value: 'Under $2,000', label: '< $2k' },
  { value: '$2,000 – $5,000', label: '$2–5k' },
  { value: '$5,000 – $15,000', label: '$5–15k' },
  { value: '$15,000+', label: '$15k+' },
];

const currentYear = new Date().getFullYear();
const modalOpen = ref(false);
const emailCopied = ref(false);
const submitting = ref(false);
const statusMessage = ref('');
const isSuccess = ref(false);

const emptyForm = () => ({
  name: '',
  email: '',
  service: 'Full-Stack Web Application',
  budget: 'Flexible / Discuss',
  message: '',
});

const form = ref(emptyForm());

const openInquiryModal = () => {
  modalOpen.value = true;
  stopScroll();
};

const closeInquiryModal = () => {
  modalOpen.value = false;
  startScroll();
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('athul@trawbit.com');
    emailCopied.value = true;
    setTimeout(() => (emailCopied.value = false), 2400);
  } catch {
    window.location.href = 'mailto:athul@trawbit.com';
  }
};

const handleSubmit = async () => {
  submitting.value = true;
  statusMessage.value = '';
  try {
    await submitEnquiry({ ...form.value });
    isSuccess.value = true;
    statusMessage.value = 'Inquiry received. I will get back to you within 24 hours.';
    form.value = emptyForm();
    setTimeout(() => {
      closeInquiryModal();
      statusMessage.value = '';
    }, 2800);
  } catch (err) {
    isSuccess.value = false;
    statusMessage.value =
      err?.message && !err.message.includes('Network')
        ? err.message
        : 'Could not reach the server right now. Please email athul@trawbit.com directly.';
  } finally {
    submitting.value = false;
  }
};

const scrollToTop = () => {
  smoothScrollTo(0, { offset: 0, duration: 1.2 });
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && modalOpen.value) closeInquiryModal();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  startScroll();
});
</script>

<style scoped>
.sw-input {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--border-strong);
  padding: 10px 0;
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.3s ease;
}
.sw-input::placeholder {
  color: var(--text-muted);
}
.sw-input:focus {
  border-bottom-color: var(--accent);
}
.sw-input:focus-visible {
  outline: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: translateY(40px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
