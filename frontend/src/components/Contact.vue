<template>
  <section class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-[#0A0A0A] border-t border-[#2A2A2A]" id="contact">

    <!-- Background ambient glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255,255,255,0.04),transparent)] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto w-full relative z-10 flex-1">

      <!-- ================= SECTION HEADER ================= -->
      <div class="max-w-3xl mb-14 sm:mb-16 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#A1A1AA] mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Get In Touch</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Let's discuss your next project.
        </h2>
        <p class="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
          Whether you need a complete web application, mobile app development, backend APIs, or technical consulting—send a message below and let's talk.
        </p>
      </div>

      <!-- ================= MAIN GRID: CONTACT INFO & ENQUIRY FORM ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-start">
        
        <!-- Left: Contact Info & Value Props (5 cols) -->
        <div class="lg:col-span-5 flex flex-col gap-6 scroll-reveal" ref="infoRef">
          
          <!-- Availability Badge Card -->
          <div class="bg-[#111111] border border-[#222222] p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider font-mono">Available For Work</h3>
            </div>
            <p class="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans">
              Accepting new freelance contracts, high-impact venture partnerships, and technical development projects worldwide.
            </p>
          </div>

          <!-- Direct Communication Channels -->
          <div class="bg-[#111111] border border-[#222222] p-6 flex flex-col gap-4">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider font-mono pb-3 border-b border-[#222222]">
              Direct Contacts
            </h4>

            <div class="flex flex-col gap-3">
              <a 
                v-for="c in contacts" 
                :key="c.label"
                :href="c.link"
                :target="c.link.startsWith('http') ? '_blank' : '_self'"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#222222] hover:border-white/40 hover:bg-[#161616] transition-all group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-[#141414] border border-[#2A2A2A] group-hover:border-white flex items-center justify-center text-white transition-colors">
                    <i :class="c.icon" class="text-xs" :style="{ color: c.color }"></i>
                  </div>
                  <div>
                    <span class="text-xs text-[#71717A] block leading-tight">{{ c.label }}</span>
                    <span class="text-xs font-mono font-medium text-white group-hover:text-emerald-400 transition-colors">{{ c.value }}</span>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-[#555] group-hover:text-white transition-colors"></i>
              </a>
            </div>
          </div>

          <!-- Working Guarantees -->
          <div class="bg-[#111111] border border-[#222222] p-6">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">
              What to Expect
            </h4>
            <ul class="space-y-2.5 text-xs text-[#A1A1AA] font-sans">
              <li class="flex items-center gap-2">
                <i class="fa-solid fa-check text-emerald-400 text-[11px]"></i>
                <span>Direct, prompt reply within 24 hours</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fa-solid fa-check text-emerald-400 text-[11px]"></i>
                <span>Honest technical scoping & advice</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fa-solid fa-check text-emerald-400 text-[11px]"></i>
                <span>Clean, maintainable code & clear milestones</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Right: Interactive Dynamic Project Enquiry Form (7 cols) -->
        <div class="lg:col-span-7 bg-[#111111] border border-[#222222] p-7 sm:p-9 scroll-reveal" ref="formRef">
          
          <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#222222]">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white">Project Enquiry Form</h3>
              <p class="text-xs text-[#71717A] mt-0.5 font-sans">Send project details and I'll review your requirements</p>
            </div>
            <span class="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5">
              Direct Contact
            </span>
          </div>

          <!-- Success State Message -->
          <div v-if="submitSuccess" class="py-10 px-6 text-center bg-[#0A0A0A] border border-emerald-500/30 flex flex-col items-center gap-4 animate-[fadeIn_0.4s_ease-out]">
            <div class="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl">
              <i class="fa-solid fa-check"></i>
            </div>
            <div>
              <h4 class="text-lg font-bold text-white mb-1">Enquiry Received!</h4>
              <p class="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                Thank you, <span class="text-white font-semibold">{{ form.name }}</span>. Your message has been received. I will review your project details and get back to you shortly.
              </p>
            </div>
            <button
              @click="resetForm"
              class="mt-3 px-5 py-2.5 bg-[#1a1a1a] border border-[#333] hover:border-white text-xs font-mono text-white transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>

          <!-- Form Input Fields -->
          <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            
            <!-- Error Banner -->
            <div v-if="submitError" class="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>{{ submitError }}</span>
            </div>

            <!-- Row 1: Name & Email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-mono text-[#A1A1AA]">
                  Your Name <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  class="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-white focus:outline-none px-3.5 py-2.5 text-xs sm:text-sm text-white font-sans transition-colors placeholder:text-[#555]"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-mono text-[#A1A1AA]">
                  Email Address <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  class="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-white focus:outline-none px-3.5 py-2.5 text-xs sm:text-sm text-white font-sans transition-colors placeholder:text-[#555]"
                />
              </div>
            </div>

            <!-- Row 2: Phone & Service Category -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-mono text-[#A1A1AA]">
                  Phone / WhatsApp <span class="text-[#666]">(Optional)</span>
                </label>
                <input
                  v-model="form.phone"
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  class="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-white focus:outline-none px-3.5 py-2.5 text-xs sm:text-sm text-white font-sans transition-colors placeholder:text-[#555]"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-mono text-[#A1A1AA]">
                  Project Type / Service
                </label>
                <select
                  v-model="form.service"
                  class="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-white focus:outline-none px-3.5 py-2.5 text-xs sm:text-sm text-white font-sans transition-colors"
                >
                  <option value="Full-Stack Web Application (Laravel / React / Vue)">Full-Stack Web Application (Laravel / React / Vue)</option>
                  <option value="Mobile App Development (Flutter & Firebase)">Mobile App Development (Flutter & Firebase)</option>
                  <option value="Backend APIs & Database Architecture (PHP / Node.js)">Backend APIs & Database Architecture (PHP / Node.js)</option>
                  <option value="Frontend Engineering & UI Redesign">Frontend Engineering & UI Redesign</option>
                  <option value="Technical Consulting & Code Review">Technical Consulting & Code Review</option>
                  <option value="General Freelance / Contract Work">General Freelance / Contract Work</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
              </div>
            </div>

            <!-- Row 3: Budget Range -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-mono text-[#A1A1AA]">
                Estimated Budget Range
              </label>
              <select
                v-model="form.budget"
                class="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-white focus:outline-none px-3.5 py-2.5 text-xs sm:text-sm text-white font-sans transition-colors"
              >
                <option value="Flexible / To be discussed">Flexible / To be discussed</option>
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                <option value="$5,000+">$5,000+</option>
              </select>
            </div>

            <!-- Row 4: Message Content -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-mono text-[#A1A1AA]">
                Project Overview & Requirements <span class="text-red-400">*</span>
              </label>
              <textarea
                v-model="form.message"
                required
                rows="4"
                placeholder="Briefly describe your goals, timeline, key features, or any questions..."
                class="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-white focus:outline-none p-3.5 text-xs sm:text-sm text-white font-sans transition-colors placeholder:text-[#555] resize-y"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="submitting"
              class="mt-2 w-full py-3.5 px-6 bg-white text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <i v-if="submitting" class="fa-solid fa-circle-notch animate-spin"></i>
              <i v-else class="fa-solid fa-paper-plane text-xs text-black"></i>
              <span>{{ submitting ? 'SENDING ENQUIRY...' : 'SUBMIT PROJECT ENQUIRY' }}</span>
            </button>

            <p class="text-center text-[10px] text-[#71717A] mt-1 font-mono">
              🔒 Your information is confidential and will never be shared.
            </p>
          </form>

        </div>

      </div>

    </div>

    <!-- Terminal footer status bar -->
    <div class="w-full bg-[#0a0a0f] border-t border-[#222222] py-2 px-6 flex items-center justify-between font-mono text-[10px] text-[#6b6b80] select-none relative z-10">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5 text-white/80">
          <i class="fa-solid fa-circle-check text-emerald-400"></i> Backend API: Active
        </span>
        <span class="hidden sm:inline-flex items-center gap-1">
          <i class="fa-solid fa-location-dot text-[#888]"></i> Kerala, India
        </span>
      </div>
      <span>© {{ currentYear }} Athul Krishna K · Trawbit Technologies</span>
      <div class="flex items-center gap-3">
        <span class="hidden md:inline">Laravel API · Vue 3</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useEnquiries } from '../composables/useEnquiries';

const currentYear = new Date().getFullYear();

const { submitEnquiry, submitting } = useEnquiries();

const headerRef = ref(null);
const infoRef = ref(null);
const formRef = ref(null);

const submitSuccess = ref(false);
const submitError = ref(null);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: 'Full-Stack Web Application (Laravel / React / Vue)',
  budget: 'Flexible / To be discussed',
  message: '',
});

const contacts = [
  { icon: 'fa-solid fa-envelope', label: 'Primary Email', value: 'athul@trawbit.com', link: 'mailto:athul@trawbit.com', color: '#e87d79' },
  { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', value: 'athul-krishna-k', link: 'https://www.linkedin.com/in/athul-krishna-k/', color: '#0A66C2' },
  { icon: 'fa-brands fa-github', label: 'GitHub', value: '@Athulprgm', link: 'https://github.com/Athulprgm', color: '#ffffff' },
  { icon: 'fa-solid fa-phone', label: 'WhatsApp & Phone', value: '+91 8590595077', link: 'tel:+918590595077', color: '#25D366' },
];

const handleSubmit = async () => {
  submitError.value = null;
  try {
    await submitEnquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone ? form.phone.trim() : null,
      service: form.service,
      budget: form.budget,
      message: form.message.trim(),
    });
    submitSuccess.value = true;
  } catch (err) {
    submitError.value = err.message || 'Failed to submit enquiry. Please try again or email directly.';
  }
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.phone = '';
  form.service = 'Full-Stack Web Application (Laravel / React / Vue)';
  form.budget = 'Flexible / To be discussed';
  form.message = '';
  submitSuccess.value = false;
  submitError.value = null;
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [headerRef, infoRef, formRef].forEach(ref => {
    if (ref.value) observer.observe(ref.value);
  });
});

onUnmounted(() => observer?.disconnect());
</script>

