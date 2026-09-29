<template>
  <section
    class="relative pt-12 sm:pt-16 pb-28 sm:pb-36 px-6 sm:px-12 max-w-7xl mx-auto z-10"
  >
    <!-- Top Metadata Eyebrow with Scroll Reveal -->
    <div class="scroll-reveal flex items-center justify-between mb-16 text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        <span>07 // CONTACT</span>
      </div>
      <span>ENGAGEMENTS</span>
    </div>

    <!-- Final High-Impact Minimalist Statement (Worth Agency Style) -->
    <div class="max-w-5xl mb-16 sm:mb-24">
      <h2 class="scroll-reveal reveal-delay-100 text-4xl sm:text-6xl lg:text-[5.5rem] font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.04] mb-8">
        HAVE SOMETHING<br />
        <span class="font-editorial font-normal tracking-normal text-[var(--text-primary)] underline decoration-[var(--border-color)] decoration-1 underline-offset-8">
          worth building?
        </span>
      </h2>

      <p class="scroll-reveal reveal-delay-200 text-xl sm:text-2xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl mb-12 font-sans-clean">
        I’m open to building meaningful products, collaborating on ambitious ideas, and solving interesting technical problems.
      </p>

      <!-- Primary Action Buttons -->
      <div class="scroll-reveal reveal-delay-300 flex flex-wrap items-center gap-4">
        <button
          @click="openInquiryModal"
          class="btn-worth text-sm py-4 px-8 cursor-pointer group"
        >
          <span>LET'S TALK</span>
          <span class="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>

        <a
          href="/Athul_Krishna_Resume.pdf"
          download
          class="btn-worth-outline text-sm py-4 px-8 cursor-pointer group"
        >
          <span>DOWNLOAD RESUME (PDF)</span>
          <span class="group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </div>
    </div>

    <!-- Direct Communication Channels (Worth Agency Hairline Grid) with Staggered Entrance -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pb-20 border-b border-[var(--border-color)]">
      
      <!-- Email -->
      <div class="scroll-reveal-scale reveal-delay-100 worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
        <div>
          <span class="text-[10px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-bold group-hover:text-emerald-500 transition-colors">01 // DIRECT EMAIL</span>
          <div class="text-base font-sans-clean font-bold text-[var(--text-primary)] mb-2 truncate">athul@trawbit.com</div>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean">Inquiries, partnerships &amp; technical consultations.</p>
        </div>
        <div class="mt-6 flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs font-mono-clean">
          <a
            href="mailto:athul@trawbit.com"
            class="text-[var(--text-primary)] hover:underline font-semibold"
          >
            SEND EMAIL →
          </a>
          <button
            @click="copyEmail"
            class="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            {{ emailCopied ? 'COPIED ✓' : 'COPY' }}
          </button>
        </div>
      </div>

      <!-- LinkedIn -->
      <div class="scroll-reveal-scale reveal-delay-200 worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
        <div>
          <span class="text-[10px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-bold group-hover:text-emerald-500 transition-colors">02 // NETWORK</span>
          <div class="text-base font-sans-clean font-bold text-[var(--text-primary)] mb-2">LinkedIn</div>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean">Founder updates, venture milestones, and connections.</p>
        </div>
        <div class="mt-6 pt-4 border-t border-[var(--border-color)] text-xs font-mono-clean">
          <a
            href="https://www.linkedin.com/in/athul-krishna-k/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--text-primary)] hover:underline flex items-center justify-between font-semibold"
          >
            <span>CONNECT ON LINKEDIN</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      <!-- GitHub -->
      <div class="scroll-reveal-scale reveal-delay-300 worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
        <div>
          <span class="text-[10px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-bold group-hover:text-emerald-500 transition-colors">03 // OPEN CODE</span>
          <div class="text-base font-sans-clean font-bold text-[var(--text-primary)] mb-2">GitHub</div>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean">Public repositories, architecture experiments, and source code.</p>
        </div>
        <div class="mt-6 pt-4 border-t border-[var(--border-color)] text-xs font-mono-clean">
          <a
            href="https://github.com/Athulprgm"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--text-primary)] hover:underline flex items-center justify-between font-semibold"
          >
            <span>@ATHULPRGM</span>
            <span>↗</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Editorial Studio Footer -->
    <footer class="pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs font-mono-clean text-[var(--text-muted)]">
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <span class="text-[var(--text-primary)] font-bold">ATHUL KRISHNA</span>
        <span class="hidden sm:inline opacity-30">|</span>
        <span>FULL-STACK DEVELOPER · CO-FOUNDER</span>
        <span class="hidden sm:inline opacity-30">|</span>
        <span>KERALA, INDIA</span>
      </div>

      <div class="flex flex-wrap items-center gap-5">
        <div class="flex items-center gap-4">
          <a href="https://github.com/Athulprgm" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] uppercase font-semibold">GITHUB</a>
          <a href="https://www.linkedin.com/in/athul-krishna-k/" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] uppercase font-semibold">LINKEDIN</a>
          <a href="mailto:athul@trawbit.com" class="hover:text-[var(--text-primary)] uppercase font-semibold">EMAIL</a>
        </div>
        <span class="hidden md:inline opacity-30">|</span>
        <span class="uppercase tracking-wider">CRAFTED WITH CLARITY &amp; PURPOSE.</span>
        <button
          @click="scrollToTop"
          class="text-[var(--text-primary)] hover:underline flex items-center gap-1.5 cursor-pointer uppercase font-bold"
        >
          <span>TOP</span>
          <span>↑</span>
        </button>
      </div>
    </footer>

    <!-- Interactive Direct Message Modal -->
    <Transition name="modal">
      <div
        v-if="modalOpen"
        class="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        @click.self="modalOpen = false"
      >
        <div class="worth-card border-[var(--border-color)] max-w-xl w-full p-8 sm:p-10 shadow-2xl relative rounded-sm bg-[var(--bg-surface)]">
          <button
            @click="modalOpen = false"
            class="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-mono-clean uppercase cursor-pointer border border-[var(--border-color)] px-2.5 py-1 rounded-sm bg-[var(--bg-card)]"
          >
            [CLOSE ×]
          </button>

          <div class="text-xs font-mono-clean text-[var(--text-muted)] uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[var(--text-primary)]"></span>
            <span>DIRECT INQUIRY</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-sans-clean font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
            Initiate a Conversation
          </h3>
          <p class="text-xs font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mb-6">
            Leave a message or send an email directly.
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-[11px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Your Name
              </label>
              <input
                v-model="form.name"
                required
                type="text"
                placeholder="Alex Morgan"
                class="w-full px-3.5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-sm text-[var(--text-primary)] text-sm focus:border-[var(--text-primary)] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Email Address
              </label>
              <input
                v-model="form.email"
                required
                type="email"
                placeholder="alex@company.com"
                class="w-full px-3.5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-sm text-[var(--text-primary)] text-sm focus:border-[var(--text-primary)] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Primary Scope
              </label>
              <select
                v-model="form.scope"
                class="w-full px-3.5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-sm text-[var(--text-primary)] text-sm focus:border-[var(--text-primary)] focus:outline-none"
              >
                <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                <option value="Backend Architecture & APIs">Backend Architecture &amp; APIs</option>
                <option value="Commercial Software Engineering">Commercial Software Engineering</option>
                <option value="Technical Advisory / Co-Founding">Technical Advisory / Co-Founding</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Project Overview &amp; Timeline
              </label>
              <textarea
                v-model="form.message"
                required
                rows="4"
                placeholder="Briefly describe your objectives, architecture requirements, or delivery deadline..."
                class="w-full px-3.5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-sm text-[var(--text-primary)] text-sm focus:border-[var(--text-primary)] focus:outline-none resize-none"
              ></textarea>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                :disabled="submitting"
                class="w-full btn-worth py-3 text-center justify-center cursor-pointer"
              >
                <span>{{ submitting ? 'DISPATCHING...' : 'SEND INQUIRY →' }}</span>
              </button>
            </div>
          </form>

          <Transition name="fade">
            <div
              v-if="statusMessage"
              class="mt-4 p-3 border rounded-sm text-xs font-mono-clean"
              :class="isSuccess ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-amber-500/40 bg-amber-500/10 text-amber-400'"
            >
              {{ statusMessage }}
            </div>
          </Transition>

        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useEnquiries } from '../composables/useEnquiries';
import { useScrollReveal } from '../composables/useScrollReveal';

useScrollReveal();

const { submitEnquiry } = useEnquiries();

const modalOpen = ref(false);
const emailCopied = ref(false);
const submitting = ref(false);
const statusMessage = ref('');
const isSuccess = ref(false);

const form = ref({
  name: '',
  email: '',
  scope: 'Full-Stack Web Application',
  message: '',
});

const openInquiryModal = () => {
  modalOpen.value = true;
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('athul@trawbit.com');
    emailCopied.value = true;
    setTimeout(() => { emailCopied.value = false; }, 2500);
  } catch (err) {
    console.error('Copy failed:', err);
  }
};

const handleSubmit = async () => {
  submitting.value = true;
  statusMessage.value = '';
  try {
    await submitEnquiry({
      name: form.value.name,
      email: form.value.email,
      subject: form.value.scope,
      message: form.value.message,
    });
    isSuccess.value = true;
    statusMessage.value = 'Inquiry transmitted successfully. I will respond within 24 hours.';
    form.value = { name: '', email: '', scope: 'Full-Stack Web Application', message: '' };
    setTimeout(() => {
      modalOpen.value = false;
      statusMessage.value = '';
    }, 3000);
  } catch (err) {
    isSuccess.value = false;
    statusMessage.value = 'Failed to transmit message. Please email directly at athul@trawbit.com';
  } finally {
    submitting.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
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
