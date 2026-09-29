<template>
  <section
    class="relative pt-12 sm:pt-16 pb-28 sm:pb-36 px-6 sm:px-12 max-w-7xl mx-auto z-10"
  >
    <!-- Top Metadata Eyebrow with Scroll Reveal -->
    <div class="scroll-reveal flex items-center justify-between mb-16 text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        <span>05 // CONTACT</span>
      </div>
      <span>OPEN FOR COLLABORATION</span>
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

        <!-- Direct Instagram Option Button -->
        <a
          href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          class="btn-worth-outline text-sm py-4 px-8 cursor-pointer group flex items-center gap-2.5 hover:border-[#E1306C] hover:text-[#E1306C] transition-all"
        >
          <svg class="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>INSTAGRAM @_ATHUL_KRISHNAA</span>
          <span class="group-hover:translate-x-0.5 transition-transform">↗</span>
        </a>

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

    <!-- Direct Communication Channels (Worth Agency Hairline Grid - always visible) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-20 border-b border-[var(--border-color)]">
      
      <!-- Email -->
      <div class="worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
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
      <div class="worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
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
      <div class="worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
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

      <!-- Instagram (Guaranteed Visible Card) -->
      <div class="worth-card p-6 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[#E1306C] hover:translate-y-[-2px] border-l-2 border-l-[#E1306C]/70">
        <div>
          <span class="text-[10px] font-mono-clean uppercase tracking-widest text-[#E1306C] block mb-2 font-bold group-hover:text-[#E1306C] transition-colors">04 // DISPATCH</span>
          <div class="text-base font-sans-clean font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
            <span>Instagram</span>
            <svg class="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean">Visual dispatches, design ideas, and developer updates.</p>
        </div>
        <div class="mt-6 pt-4 border-t border-[var(--border-color)] text-xs font-mono-clean">
          <a
            href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--text-primary)] hover:text-[#E1306C] hover:underline flex items-center justify-between font-semibold"
          >
            <span>@_ATHUL_KRISHNAA</span>
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
          <a href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] uppercase font-semibold">INSTAGRAM</a>
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
          <p class="text-xs font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mb-4">
            Leave a message or send an email directly.
          </p>

          <!-- Direct Instagram DM Option -->
          <a
            href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            class="mb-5 p-3 border border-[var(--border-color)] hover:border-[#E1306C] rounded-sm bg-[var(--bg-card)] flex items-center justify-between text-xs font-mono-clean text-[var(--text-primary)] transition-all group"
          >
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 fill-current text-[#E1306C] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Prefer Direct Message? Chat on Instagram</span>
            </div>
            <span class="text-[#E1306C] font-semibold group-hover:translate-x-0.5 transition-transform">@_athul_krishnaa ↗</span>
          </a>

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
                Primary Scope / Contact Reason
              </label>
              <select
                v-model="form.scope"
                class="w-full px-3.5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-sm text-[var(--text-primary)] text-sm focus:border-[var(--text-primary)] focus:outline-none"
              >
                <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                <option value="Backend Architecture & APIs">Backend Architecture &amp; APIs</option>
                <option value="Commercial Software Engineering">Commercial Software Engineering</option>
                <option value="Technical Advisory / Co-Founding">Technical Advisory / Co-Founding</option>
                <option value="Instagram / Social Collaboration">Instagram / Social DM &amp; Collaboration</option>
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
