<template>
  <div class="border-t border-[#1E1E1E] bg-black text-white" id="contact">

    <!-- ══════════════════ SECTION 09 — RECRUITMENT ══════════════════ -->
    <section class="py-28 sm:py-36 px-6 sm:px-8 border-b border-[#1E1E1E]">
      <div class="max-w-7xl mx-auto">
        <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-4 uppercase scroll-reveal flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
          <span>09 / RECRUITMENT &amp; ROLES</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div class="lg:col-span-8 flex flex-col items-start scroll-reveal-left">
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Looking for a builder?
            </h2>
            <p class="text-lg sm:text-xl text-[#888888] leading-relaxed max-w-2xl font-normal">
              “I'm interested in opportunities where engineering, product thinking and real-world problem solving come together.”
            </p>
          </div>

          <!-- Recruitment Action Buttons (Sharp Slide Fill Boxes) -->
          <div class="lg:col-span-4 flex flex-col gap-3.5 w-full pt-2 scroll-reveal-right">
            <a
              href="/Athul_Krishna_Resume.pdf"
              download
              class="btn-slide-fill w-full py-4 px-6 text-xs font-bold tracking-wider uppercase flex items-center justify-between group"
            >
              <span>VIEW RESUME</span>
              <span class="arrow-slide">→</span>
            </a>

            <a
              href="https://github.com/Athulprgm"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-slide-color w-full py-4 px-6 text-xs font-bold tracking-wider uppercase flex items-center justify-between group"
            >
              <span>GITHUB</span>
              <span class="arrow-slide">→</span>
            </a>

            <a
              href="https://www.linkedin.com/in/athul-krishna-k/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-slide-color w-full py-4 px-6 text-xs font-bold tracking-wider uppercase flex items-center justify-between group"
            >
              <span>LINKEDIN</span>
              <span class="arrow-slide">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════ SECTION 10 — FINAL CTA ══════════════════ -->
    <section class="py-36 sm:py-48 px-6 sm:px-8 bg-black flex flex-col justify-center items-start border-b border-[#1E1E1E]">
      <div class="max-w-7xl mx-auto w-full">

        <!-- Huge Typography Statement with Scroll Reveal -->
        <h2 class="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-white tracking-tight leading-[1.05] mb-8 max-w-4xl scroll-reveal">
          Have something<br />
          worth building?
        </h2>

        <!-- Supporting Text -->
        <p class="text-xl sm:text-2xl text-[#888888] font-normal leading-relaxed max-w-2xl mb-12 scroll-reveal stagger-1">
          Let's turn the idea into something people actually want to use.
        </p>

        <!-- CTA Trigger Button (Sharp Slide Fill) -->
        <button
          @click="showContactModal = true"
          class="btn-slide-fill px-9 py-4.5 text-xs font-bold tracking-wider uppercase flex items-center gap-3 group cursor-pointer scroll-reveal stagger-2"
        >
          <span>START A CONVERSATION</span>
          <span class="arrow-slide">→</span>
        </button>

      </div>
    </section>

    <!-- ══════════════════ FOOTER ══════════════════ -->
    <footer class="py-16 sm:py-20 px-6 sm:px-8 bg-black text-[#888888] text-xs font-mono scroll-reveal">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        <!-- Left: Identity -->
        <div class="flex flex-col">
          <span class="text-sm font-bold text-white tracking-wider uppercase mb-1 flex items-center gap-2">
            <span>ATHUL KRISHNA</span>
            <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
          </span>
          <span class="text-[#666666]">
            Full-Stack Developer · Co-Founder
          </span>
        </div>

        <!-- Center: Links -->
        <div class="flex items-center gap-8 text-[#888888] uppercase tracking-wider">
          <a href="https://github.com/Athulprgm" target="_blank" rel="noopener" class="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/athul-krishna-k/" target="_blank" rel="noopener" class="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:athul@trawbit.com" class="hover:text-white transition-colors">
            Email
          </a>
        </div>

        <!-- Right: Copyright -->
        <div class="text-[#555555]">
          © 2026 Athul Krishna
        </div>

      </div>
    </footer>

    <!-- ══════════════════ CONVERSATION MODAL (Sharp Zero-Radius) ══════════════════ -->
    <Transition name="fade-modal">
      <div
        v-if="showContactModal"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        @click.self="showContactModal = false"
      >
        <div class="modal-card glass-panel border-white/20 max-w-xl w-full p-6 sm:p-10 shadow-2xl relative">
          <button
            @click="showContactModal = false"
            class="absolute top-6 right-6 text-[#888888] hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer border border-white/15 hover:border-white px-2.5 py-1 transition-colors"
          >
            [CLOSE ×]
          </button>

          <div class="text-xs font-mono text-[#10B981] uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
            <span>DIRECT INQUIRY</span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Start a Conversation
          </h3>
          <p class="text-xs font-mono text-[#888888] uppercase tracking-wider mb-8">
            athul@trawbit.com · Usually replies within 24 hours
          </p>

          <!-- Success Message -->
          <div v-if="submitSuccess" class="py-8 text-center flex flex-col items-center gap-3">
            <div class="text-[#10B981] font-bold font-mono text-sm">
              ✓ Message Received
            </div>
            <p class="text-sm text-[#888888]">
              Thank you for reaching out. Athul will review your message and reply directly to your email shortly.
            </p>
            <button
              @click="showContactModal = false; submitSuccess = false"
              class="mt-4 px-6 py-2.5 btn-slide-fill text-xs font-bold uppercase tracking-wider"
            >
              Done
            </button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-4">
            <div v-if="submitError" class="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
              Error: {{ submitError }}
            </div>

            <div>
              <label class="block text-xs font-mono text-[#888888] uppercase mb-1.5">Your Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Name or Organization"
                class="w-full glass-input p-3.5 text-sm text-white font-sans placeholder:text-[#555555]"
              />
            </div>

            <div>
              <label class="block text-xs font-mono text-[#888888] uppercase mb-1.5">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="name@company.com"
                class="w-full glass-input p-3.5 text-sm text-white font-sans placeholder:text-[#555555]"
              />
            </div>

            <div>
              <label class="block text-xs font-mono text-[#888888] uppercase mb-1.5">What are you looking to build?</label>
              <textarea
                v-model="form.message"
                required
                rows="4"
                placeholder="Tell me about the product concept, role or challenge..."
                class="w-full glass-input p-3.5 text-sm text-white font-sans placeholder:text-[#555555] resize-y"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full py-4 btn-slide-fill text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              <span>{{ submitting ? 'Sending...' : 'Send Message' }}</span>
              <span class="arrow-slide">→</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useEnquiries } from '../composables/useEnquiries';

const { submitEnquiry, submitting } = useEnquiries();

const showContactModal = ref(false);
const submitSuccess    = ref(false);
const submitError      = ref(null);

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const handleSubmit = async () => {
  submitError.value = null;
  try {
    await submitEnquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      service: 'Editorial Inbound Conversation',
    });
    submitSuccess.value = true;
    form.name = '';
    form.email = '';
    form.message = '';
  } catch (err) {
    submitError.value = err.message || 'Unable to submit enquiry. Please email directly.';
  }
};
</script>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.25s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}

.fade-modal-enter-active .modal-card {
  animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalSlideUp {
  0% {
    opacity: 0;
    transform: translateY(32px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
