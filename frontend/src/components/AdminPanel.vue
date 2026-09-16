<template>
  <!-- ── Login Screen ─────────────────────────────────────────── -->
  <div v-if="!authed" class="min-h-screen bg-[#050505] flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <div class="inline-flex items-center gap-2 border border-[#ffffff]/20 bg-green-950/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fa-solid fa-shield-halved text-[#ffffff] text-[10px]"></i>
          <span class="font-mono text-[10px] text-[#ffffff] tracking-widest uppercase">Admin Access</span>
        </div>
        <h1 class="font-mono text-2xl font-black text-white">Project <span class="text-[#ffffff]">Dashboard</span></h1>
        <p class="font-mono text-[11px] text-[#A1A1AA] mt-1">// restricted area — enter your key</p>
      </div>

      <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-6 backdrop-blur">
        <label class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest block mb-2">Admin Key</label>
        <input
          v-model="keyInput"
          type="password"
          placeholder="portfolio-admin-****"
          @keydown.enter="login"
          class="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#ffffff]/50 transition-colors"
        />
        <p v-if="loginError" class="font-mono text-[10px] text-red-400 mt-2">{{ loginError }}</p>
        <button
          @click="login"
          :disabled="loggingIn"
          class="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-mono text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <div v-if="loggingIn" class="w-3.5 h-3.5 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
          <i v-else class="fa-solid fa-right-to-bracket"></i> {{ loggingIn ? 'Entering…' : 'Enter' }}
        </button>
      </div>
    </div>
  </div>

  <!-- ── Admin Dashboard ──────────────────────────────────────── -->
  <div v-else class="min-h-screen bg-[#050505] text-white">

    <!-- Top bar -->
    <header class="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A] backdrop-blur-md px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
          <i class="fa-solid fa-layer-group text-white text-[10px]"></i>
        </div>
        <span class="font-mono text-sm font-bold text-white">
          <template v-if="currentTab === 'projects'">Projects Management</template>
          <template v-else-if="currentTab === 'cvs'">CV Profiles Management</template>
          <template v-else-if="currentTab === 'experience_metrics'">Experience & Metrics</template>
        </span>
        <span class="font-mono text-[10px] text-[#A1A1AA] border border-[#2A2A2A] rounded px-2 py-0.5">
          <template v-if="currentTab === 'projects'">{{ projects.length }} entries</template>
          <template v-else-if="currentTab === 'cvs'">{{ cvs.length }} files</template>
          <template v-else-if="currentTab === 'experience_metrics'">Dynamic Metrics</template>
        </span>
      </div>
      <div class="flex items-center gap-3">
        <!-- Add Project -->
        <button
          v-if="currentTab === 'projects'"
          @click="openAdd"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-plus"></i> Add Project
        </button>
        <!-- Add CV Profile -->
        <button
          v-else-if="currentTab === 'cvs'"
          @click="openAddCv"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-plus"></i> Add CV Profile
        </button>
        <!-- Save Settings -->
        <button
          v-else
          @click="saveSiteSettings"
          :disabled="savingSettings"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer font-bold shadow-lg"
        >
          <div v-if="savingSettings" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <i v-else class="fa-solid fa-floppy-disk"></i>
          Save Changes
        </button>

        <button
          @click="goHome"
          class="flex items-center gap-2 border border-[#2A2A2A] hover:border-[#2A2A2A] text-[#A1A1AA] hover:text-white font-mono text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i> Portfolio
        </button>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-6 py-10">

      <!-- API error banner -->
      <div v-if="apiError" class="mb-6 flex items-center gap-3 bg-red-950/30 border border-red-500/20 rounded-xl px-4 py-3">
        <i class="fa-solid fa-circle-exclamation text-red-400"></i>
        <span class="font-mono text-xs text-red-300">{{ apiError }}</span>
        <button @click="apiError = null" class="ml-auto text-red-400 hover:text-red-300 text-xs"><i class="fa-solid fa-times"></i></button>
      </div>

      <!-- Tab Selector -->
      <div class="flex items-center gap-2 mb-8 border-b border-[#2A2A2A] pb-4 overflow-x-auto">
        <button
          @click="currentTab = 'projects'"
          class="font-mono text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap"
          :class="currentTab === 'projects' 
            ? 'bg-[#ffffff]/10 border-[#ffffff]/30 text-[#ffffff] font-bold' 
            : 'border-transparent text-[#A1A1AA] hover:text-neutral-200 hover:bg-[#2A2A2A]'"
        >
          <i class="fa-solid fa-layer-group mr-1.5"></i> Projects
        </button>
        <button
          @click="currentTab = 'cvs'"
          class="font-mono text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap"
          :class="currentTab === 'cvs' 
            ? 'bg-[#ffffff]/10 border-[#ffffff]/30 text-[#ffffff] font-bold' 
            : 'border-transparent text-[#A1A1AA] hover:text-neutral-200 hover:bg-[#2A2A2A]'"
        >
          <i class="fa-solid fa-file-pdf mr-1.5"></i> CV Profiles
        </button>
        <button
          @click="currentTab = 'experience_metrics'"
          class="font-mono text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap"
          :class="currentTab === 'experience_metrics' 
            ? 'bg-[#ffffff]/10 border-[#ffffff]/30 text-[#ffffff] font-bold' 
            : 'border-transparent text-[#A1A1AA] hover:text-neutral-200 hover:bg-[#2A2A2A]'"
        >
          <i class="fa-solid fa-chart-simple mr-1.5"></i> Experience & Metrics
        </button>
      </div>

      <!-- ─── Projects Section ─── -->
      <div v-if="currentTab === 'projects'">
        <!-- Loading -->
        <div v-if="loadingList" class="flex items-center justify-center py-24 gap-3">
          <div class="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="font-mono text-xs text-[#A1A1AA]">Loading projects...</span>
        </div>

        <!-- Projects table -->
        <div v-else class="overflow-x-auto rounded-2xl border border-[#2A2A2A]">
          <table class="w-full text-left">
            <thead class="bg-[#121212] border-b border-[#2A2A2A]">
              <tr>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 w-10">#</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3">Title</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 hidden md:table-cell">Tags</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Order</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Added</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/3">
              <tr
                v-for="p in projects"
                :key="p.id"
                class="hover:bg-[#2A2A2A] transition-colors group"
              >
                <td class="px-4 py-3 font-mono text-[11px] text-[#A1A1AA]">{{ String(p.id).padStart(2,'0') }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img :src="getImageUrl(p.thumbnail, p.image)" :alt="p.title" class="w-10 h-7 object-cover rounded border border-[#2A2A2A] flex-shrink-0" />
                    <div>
                      <p class="font-mono text-xs font-semibold text-white">{{ p.title }}</p>
                      <p class="font-sans text-[11px] text-[#A1A1AA] line-clamp-1 max-w-xs">{{ p.description }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 hidden md:table-cell">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="t in (p.tags ?? []).slice(0,3)" :key="t" class="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">{{ t }}</span>
                    <span v-if="(p.tags ?? []).length > 3" class="font-mono text-[9px] text-[#A1A1AA]">+{{ p.tags.length - 3 }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 hidden lg:table-cell font-mono text-xs text-[#A1A1AA]">{{ p.sort_order }}</td>
                <td class="px-4 py-3 hidden lg:table-cell font-mono text-[11px] text-[#A1A1AA]">{{ p.created_at ?? '—' }}</td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openEdit(p)"
                      class="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:border-[#ffffff]/40 hover:text-[#ffffff] transition-all cursor-pointer"
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button
                      @click="confirmDelete(p)"
                      class="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:border-red-500/40 hover:text-red-400 transition-all cursor-pointer"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ─── CV Profiles Section ─── -->
      <div v-else-if="currentTab === 'cvs'">
        <!-- Loading -->
        <div v-if="loadingCvsList" class="flex items-center justify-center py-24 gap-3">
          <div class="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="font-mono text-xs text-[#A1A1AA]">Loading CV profiles...</span>
        </div>

        <!-- CV Profiles table -->
        <div v-else class="overflow-x-auto rounded-2xl border border-[#2A2A2A]">
          <table class="w-full text-left">
            <thead class="bg-[#121212] border-b border-[#2A2A2A]">
              <tr>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 w-10">#</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3">Title</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3">File URL / Link</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 w-24">Order</th>
                <th class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/3">
              <tr
                v-for="cv in cvs"
                :key="cv.id"
                class="hover:bg-[#2A2A2A] transition-colors group"
              >
                <td class="px-4 py-3 font-mono text-[11px] text-[#A1A1AA]">{{ String(cv.id).padStart(2,'0') }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600/10 transition-colors">
                      <i class="fa-solid fa-file-pdf text-indigo-400 text-xs"></i>
                    </div>
                    <p class="font-mono text-xs font-semibold text-white">{{ cv.title }}</p>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <a
                    :href="getImageUrl(cv.file_path)"
                    target="_blank"
                    class="font-mono text-xs text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1.5"
                  >
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> View File
                  </a>
                </td>
                <td class="px-4 py-3 font-mono text-xs text-[#A1A1AA]">{{ cv.sort_order }}</td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openEditCv(cv)"
                      class="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:border-indigo-500/40 hover:text-indigo-300 transition-all cursor-pointer"
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button
                      @click="confirmDeleteCv(cv)"
                      class="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:border-red-500/40 hover:text-red-400 transition-all cursor-pointer"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="cvs.length === 0">
                <td colspan="5" class="text-center py-16 font-mono text-xs text-[#A1A1AA]">
                  No CV profiles found. Click "Add CV Profile" to upload one.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <!-- ─── Experience & Metrics Section ─── -->
      <div v-else-if="currentTab === 'experience_metrics'" class="flex flex-col gap-6">
        <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2A2A2A]">
            <div>
              <h2 class="font-mono text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-chart-simple text-indigo-400"></i>
                Experience & Live Site Metrics
              </h2>
              <p class="font-mono text-xs text-[#A1A1AA] mt-1">
                Customize stats displayed across the hero header, about section, and bio.
              </p>
            </div>
            <button
              @click="saveSiteSettings"
              :disabled="savingSettings"
              class="flex items-center gap-2 font-mono text-xs px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer font-bold shadow-lg"
            >
              <div v-if="savingSettings" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <i v-else class="fa-solid fa-floppy-disk"></i>
              Save Metrics
            </button>
          </div>

          <!-- Metrics form grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div class="field">
              <label>Years of Experience</label>
              <input v-model="settingsForm.experience_years" placeholder="e.g. 03+ or 4+" />
              <span class="text-[10px] text-[#A1A1AA] font-mono mt-1 block">Hero stat (e.g. 03+)</span>
            </div>
            <div class="field">
              <label>Shipped Works Count</label>
              <input v-model="settingsForm.shipped_works" placeholder="e.g. 15+ or 20+" />
              <span class="text-[10px] text-[#A1A1AA] font-mono mt-1 block">Hero stat (e.g. 15+)</span>
            </div>
            <div class="field">
              <label>Uptime Focus</label>
              <input v-model="settingsForm.uptime_focus" placeholder="e.g. 99.9%" />
              <span class="text-[10px] text-[#A1A1AA] font-mono mt-1 block">Hero stat (e.g. 99.9%)</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div class="field">
              <label>Quests Cleared (About Section)</label>
              <input v-model="settingsForm.quests_cleared" placeholder="e.g. 10+" />
            </div>
            <div class="field">
              <label>Time Played (About Section)</label>
              <input v-model="settingsForm.time_played" placeholder="e.g. 3+ Yrs" />
            </div>
          </div>

          <div class="field mb-8">
            <label>Bio Specialty Role Header</label>
            <input v-model="settingsForm.bio_tagline" placeholder="Co-Founder & Full-Stack Architect" />
          </div>

          <!-- Rotating Role Phrases -->
          <div class="flex flex-col gap-3 pt-6 border-t border-[#2A2A2A]">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <i class="fa-solid fa-rotate text-indigo-400"></i> Hero Rotating Specialty Phrases
                </span>
                <p class="font-mono text-[10px] text-[#A1A1AA] mt-0.5">
                  Phrases dynamically typed/cycled under "Specializing in..." on the hero.
                </p>
              </div>
              <button
                type="button"
                @click="addRolePhrase"
                class="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[10px] font-mono rounded border border-indigo-500/30 transition-colors cursor-pointer"
              >
                <i class="fa-solid fa-plus mr-1"></i> Add Phrase
              </button>
            </div>

            <div v-for="(phrase, pIdx) in settingsForm.role_phrases" :key="'rp-'+pIdx" class="flex items-center gap-3">
              <input
                v-model="settingsForm.role_phrases[pIdx]"
                placeholder="e.g. modern React web applications styled with Tailwind CSS..."
                class="flex-1 bg-[#121212] border border-[#2A2A2A] rounded-lg px-3 py-2 font-mono text-xs text-white"
              />
              <button
                @click="removeRolePhrase(pIdx)"
                class="w-8 h-8 flex items-center justify-center border border-[#2A2A2A] hover:border-red-500 text-[#A1A1AA] hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                title="Remove phrase"
              >
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>

    <!-- ── Add / Edit Modal ────────────────────────────────────── -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-[100] bg-[#0A0A0A] backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        @click.self="closeModal"
      >
        <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl my-8 shadow-2xl" @click.stop>

          <!-- Modal header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
            <div>
              <h2 class="font-mono text-sm font-bold text-white">
                {{ editMode ? '✏️ Edit Project' : '➕ Add Project' }}
              </h2>
              <p class="font-mono text-[10px] text-[#A1A1AA] mt-0.5">
                {{ editMode ? `Editing ID #${form.id}` : 'Fill in the fields to create a new project' }}
              </p>
            </div>
            <button @click="closeModal" class="text-[#A1A1AA] hover:text-white transition-colors">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>

          <!-- Modal subtabs -->
          <div class="flex items-center gap-2 px-6 pt-4 border-b border-[#2A2A2A] bg-[#121212]/50 overflow-x-auto">
            <button
              type="button"
              @click="projectFormTab = 'basic'"
              class="font-mono text-xs px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap"
              :class="projectFormTab === 'basic' ? 'border-indigo-500 text-white font-bold bg-white/5' : 'border-transparent text-[#A1A1AA] hover:text-white'"
            >
              <i class="fa-solid fa-id-card mr-1.5"></i> Card & Media
            </button>
            <button
              type="button"
              @click="projectFormTab = 'hero'"
              class="font-mono text-xs px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap"
              :class="projectFormTab === 'hero' ? 'border-indigo-500 text-white font-bold bg-white/5' : 'border-transparent text-[#A1A1AA] hover:text-white'"
            >
              <i class="fa-solid fa-heading mr-1.5"></i> Hero & Links
            </button>
            <button
              type="button"
              @click="projectFormTab = 'features_stats'"
              class="font-mono text-xs px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap"
              :class="projectFormTab === 'features_stats' ? 'border-indigo-500 text-white font-bold bg-white/5' : 'border-transparent text-[#A1A1AA] hover:text-white'"
            >
              <i class="fa-solid fa-bolt mr-1.5"></i> Features & Stats
              <span v-if="(form.detailData.features?.length || form.detailData.stats?.length)" class="ml-1 px-1.5 py-0.2 text-[9px] bg-indigo-950 text-indigo-300 rounded-full border border-indigo-500/30">
                {{ (form.detailData.features?.length || 0) + (form.detailData.stats?.length || 0) }}
              </span>
            </button>
            <button
              type="button"
              @click="projectFormTab = 'tech_modules'"
              class="font-mono text-xs px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap"
              :class="projectFormTab === 'tech_modules' ? 'border-indigo-500 text-white font-bold bg-white/5' : 'border-transparent text-[#A1A1AA] hover:text-white'"
            >
              <i class="fa-solid fa-layer-group mr-1.5"></i> Tech, Modules & Highlights
              <span v-if="(form.detailData.technologies?.length || form.detailData.modules?.length || form.detailData.highlights?.length)" class="ml-1 px-1.5 py-0.2 text-[9px] bg-indigo-950 text-indigo-300 rounded-full border border-indigo-500/30">
                {{ (form.detailData.technologies?.length || 0) + (form.detailData.modules?.length || 0) + (form.detailData.highlights?.length || 0) }}
              </span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="px-6 py-6 flex flex-col gap-5 relative max-h-[70vh] overflow-y-auto">
            <div v-if="loadingForm" class="flex flex-col items-center justify-center py-20 gap-3">
              <div class="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span class="font-mono text-xs text-[#A1A1AA]">// fetching project details from db</span>
            </div>
            
            <template v-else>
              <!-- ─── TAB 1: CARD & MEDIA ─── -->
              <div v-show="projectFormTab === 'basic'" class="flex flex-col gap-5">
                <!-- Row: title -->
                <div class="field">
                  <label>Title <span class="text-red-400">*</span></label>
                  <input v-model="form.title" placeholder="My Awesome Project" />
                </div>

                <!-- Row: description -->
                <div class="field">
                  <label>Card Description <span class="text-red-400">*</span></label>
                  <textarea v-model="form.description" rows="3" placeholder="Short summary displayed on the main projects grid..."></textarea>
                </div>

                <!-- Row: image + thumbnail -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="field">
                    <label>Images <span class="text-[#A1A1AA]">(max 7)</span> <span class="text-red-400">*</span></label>
                    <input type="file" multiple @change="onImageChange" accept="image/*" class="file-input" />
                    <div class="flex gap-2 mt-2 flex-wrap">
                      <img v-for="(img, idx) in form.imagePreviews" :key="'img'+idx" :src="getImageUrl(img)" class="h-16 rounded border border-[#2A2A2A] object-cover" />
                    </div>
                  </div>
                  <div class="field">
                    <label>Card Thumbnail <span class="text-[#A1A1AA]">(Optional)</span></label>
                    <input type="file" @change="onThumbnailChange" accept="image/*" class="file-input" />
                    <img v-if="form.thumbnail" :src="getImageUrl(form.thumbnail)" class="mt-2 h-16 rounded border border-[#2A2A2A] object-cover" />
                  </div>
                </div>

                <!-- Row: sort_order + tags + hasDetails -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div class="field">
                    <label>Sort Order</label>
                    <input v-model.number="form.sort_order" type="number" placeholder="10" />
                  </div>
                  <div class="field sm:col-span-2">
                    <label>Tags <span class="text-[#A1A1AA]">(comma-separated)</span></label>
                    <input v-model="tagsInput" placeholder="React, Laravel, MySQL, Tailwind" />
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg">
                  <input id="hasDetailsCheck" type="checkbox" v-model="form.has_details" class="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer" />
                  <label for="hasDetailsCheck" class="text-xs text-white font-mono cursor-pointer select-none">
                    Enable Interactive Project Detail Page (Press Start to Play)
                  </label>
                </div>
              </div>

              <!-- ─── TAB 2: HERO & LINKS ─── -->
              <div v-show="projectFormTab === 'hero'" class="flex flex-col gap-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="field">
                    <label>Hero Title</label>
                    <input v-model="form.detailData.heroTitle" placeholder="Nexus" />
                  </div>
                  <div class="field">
                    <label>Hero Subject (Highlighted Accent)</label>
                    <input v-model="form.detailData.heroSubject" placeholder="Enterprise OS" />
                  </div>
                </div>

                <div class="field">
                  <label>Tagline</label>
                  <input v-model="form.detailData.tagline" placeholder="// High-throughput distributed cloud architecture" />
                </div>

                <div class="field">
                  <label>Abstract (Full Project Story & Case Study)</label>
                  <textarea v-model="form.detailData.abstract" rows="5" placeholder="Deep dive into the architecture, challenges, and engineering decisions..."></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="field">
                    <label><i class="fa-brands fa-github mr-1"></i> GitHub Repo URL</label>
                    <input v-model="form.detailData.repoUrl" placeholder="https://github.com/..." />
                  </div>
                  <div class="field">
                    <label><i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> Live Demo URL</label>
                    <input v-model="form.detailData.liveUrl" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <!-- ─── TAB 3: FEATURES & STATS ─── -->
              <div v-show="projectFormTab === 'features_stats'" class="flex flex-col gap-6">
                <!-- Key Features Section -->
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
                    <span class="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      <i class="fa-solid fa-bolt text-indigo-400"></i> Key Features
                    </span>
                    <button
                      type="button"
                      @click="addFeature"
                      class="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[10px] font-mono rounded border border-indigo-500/30 transition-colors cursor-pointer"
                    >
                      <i class="fa-solid fa-plus mr-1"></i> Add Feature
                    </button>
                  </div>

                  <div v-if="!form.detailData.features || form.detailData.features.length === 0" class="p-4 border border-dashed border-[#2A2A2A] rounded-lg text-center font-mono text-xs text-[#A1A1AA]">
                    No features added yet. Click "+ Add Feature" to highlight capabilities.
                  </div>

                  <div v-for="(feat, fIdx) in form.detailData.features" :key="'feat-'+fIdx" class="p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg flex flex-col gap-2 relative">
                    <button
                      type="button"
                      @click="removeFeature(fIdx)"
                      class="absolute top-2 right-2 text-[#A1A1AA] hover:text-red-400 text-xs p-1"
                      title="Remove feature"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="field pr-6">
                      <label>Feature Title</label>
                      <input v-model="feat.title" placeholder="e.g. Real-Time Event Engine" />
                    </div>
                    <div class="field">
                      <label>Feature Description</label>
                      <textarea v-model="feat.desc" rows="2" placeholder="Explain what this feature does..."></textarea>
                    </div>
                  </div>
                </div>

                <!-- Project Stats Section -->
                <div class="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A]">
                  <div class="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
                    <span class="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      <i class="fa-solid fa-chart-simple text-indigo-400"></i> Project Stats / Metrics
                    </span>
                    <button
                      type="button"
                      @click="addStat"
                      class="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[10px] font-mono rounded border border-indigo-500/30 transition-colors cursor-pointer"
                    >
                      <i class="fa-solid fa-plus mr-1"></i> Add Stat
                    </button>
                  </div>

                  <div v-if="!form.detailData.stats || form.detailData.stats.length === 0" class="p-4 border border-dashed border-[#2A2A2A] rounded-lg text-center font-mono text-xs text-[#A1A1AA]">
                    No stats added yet (e.g. "99.9% Uptime", "50k+ Users"). Click "+ Add Stat" to add.
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div v-for="(st, sIdx) in form.detailData.stats" :key="'stat-'+sIdx" class="p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg flex flex-col gap-2 relative">
                      <button
                        type="button"
                        @click="removeStat(sIdx)"
                        class="absolute top-2 right-2 text-[#A1A1AA] hover:text-red-400 text-xs p-1"
                        title="Remove stat"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <div class="field pr-6">
                        <label>Value / Metric</label>
                        <input v-model="st.val" placeholder="e.g. 99.9% or 10ms" />
                      </div>
                      <div class="field">
                        <label>Label</label>
                        <input v-model="st.label" placeholder="e.g. Uptime or Latency" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ─── TAB 4: TECH, MODULES & HIGHLIGHTS ─── -->
              <div v-show="projectFormTab === 'tech_modules'" class="flex flex-col gap-6">
                <!-- Tech Stack Detail List -->
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
                    <span class="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      <i class="fa-solid fa-layer-group text-indigo-400"></i> Detail Tech Stack Breakdown
                    </span>
                    <button
                      type="button"
                      @click="addTech"
                      class="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[10px] font-mono rounded border border-indigo-500/30 transition-colors cursor-pointer"
                    >
                      <i class="fa-solid fa-plus mr-1"></i> Add Tech
                    </button>
                  </div>

                  <div v-if="!form.detailData.technologies || form.detailData.technologies.length === 0" class="p-4 border border-dashed border-[#2A2A2A] rounded-lg text-center font-mono text-xs text-[#A1A1AA]">
                    No tech stack items specified. Click "+ Add Tech" (e.g. Frontend -> React / Tailwind).
                  </div>

                  <div v-for="(tItem, tIdx) in form.detailData.technologies" :key="'tech-'+tIdx" class="p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-3 relative items-end">
                    <button
                      type="button"
                      @click="removeTech(tIdx)"
                      class="absolute top-2 right-2 text-[#A1A1AA] hover:text-red-400 text-xs p-1"
                      title="Remove tech"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="field">
                      <label>Category Name</label>
                      <input v-model="tItem.name" placeholder="e.g. Frontend" />
                    </div>
                    <div class="field">
                      <label>Tech / Tools</label>
                      <input v-model="tItem.stack" placeholder="e.g. React 19, Tailwind CSS" />
                    </div>
                    <div class="field pr-6 sm:pr-0">
                      <label>FontAwesome Icon</label>
                      <input v-model="tItem.icon" placeholder="fa-brands fa-react" />
                    </div>
                  </div>
                </div>

                <!-- System Modules Section -->
                <div class="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A]">
                  <div class="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
                    <span class="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      <i class="fa-solid fa-cubes text-indigo-400"></i> System Modules & Components
                    </span>
                    <button
                      type="button"
                      @click="addModule"
                      class="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[10px] font-mono rounded border border-indigo-500/30 transition-colors cursor-pointer"
                    >
                      <i class="fa-solid fa-plus mr-1"></i> Add Module
                    </button>
                  </div>

                  <div v-if="!form.detailData.modules || form.detailData.modules.length === 0" class="p-4 border border-dashed border-[#2A2A2A] rounded-lg text-center font-mono text-xs text-[#A1A1AA]">
                    No modules added. Click "+ Add Module" to document subsystems (e.g. Auth, Data Pipeline).
                  </div>

                  <div v-for="(mod, mIdx) in form.detailData.modules" :key="'mod-'+mIdx" class="p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg flex flex-col gap-2 relative">
                    <button
                      type="button"
                      @click="removeModule(mIdx)"
                      class="absolute top-2 right-2 text-[#A1A1AA] hover:text-red-400 text-xs p-1"
                      title="Remove module"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="field pr-6">
                      <label>Module Title</label>
                      <input v-model="mod.title" placeholder="e.g. Authentication & Security" />
                    </div>
                    <div class="field">
                      <label>Bullet Points / Items <span class="text-[#A1A1AA]">(comma-separated)</span></label>
                      <input v-model="mod.itemsInput" placeholder="JWT Token Auth, OAuth2 Social Login, Role Permissions" />
                    </div>
                  </div>
                </div>

                <!-- Featured Highlights Section -->
                <div class="flex flex-col gap-3 pt-4 border-t border-[#2A2A2A]">
                  <div class="flex items-center justify-between border-b border-[#2A2A2A] pb-2">
                    <span class="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      <i class="fa-solid fa-star text-indigo-400"></i> Featured Highlights
                    </span>
                    <button
                      type="button"
                      @click="addHighlight"
                      class="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-[10px] font-mono rounded border border-indigo-500/30 transition-colors cursor-pointer"
                    >
                      <i class="fa-solid fa-plus mr-1"></i> Add Highlight
                    </button>
                  </div>

                  <div v-if="!form.detailData.highlights || form.detailData.highlights.length === 0" class="p-4 border border-dashed border-[#2A2A2A] rounded-lg text-center font-mono text-xs text-[#A1A1AA]">
                    No featured highlights added. Click "+ Add Highlight" to add screenshot highlights.
                  </div>

                  <div v-for="(hl, hIdx) in form.detailData.highlights" :key="'hl-'+hIdx" class="p-3 bg-[#121212] border border-[#2A2A2A] rounded-lg flex flex-col gap-2 relative">
                    <button
                      type="button"
                      @click="removeHighlight(hIdx)"
                      class="absolute top-2 right-2 text-[#A1A1AA] hover:text-red-400 text-xs p-1"
                      title="Remove highlight"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                      <div class="field">
                        <label>Highlight Title</label>
                        <input v-model="hl.title" placeholder="e.g. Analytics Command Center" />
                      </div>
                      <div class="field">
                        <label>Badge Tag</label>
                        <input v-model="hl.tag" placeholder="e.g. CORE UI or AI" />
                      </div>
                    </div>
                    <div class="field">
                      <label>Highlight Image URL / Path</label>
                      <input v-model="hl.image" placeholder="Image URL or /storage path" />
                    </div>
                    <div class="field">
                      <label>Highlight Description</label>
                      <textarea v-model="hl.desc" rows="2" placeholder="Brief explanation of this screenshot or highlight..."></textarea>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Error -->
              <p v-if="formError" class="font-mono text-[11px] text-red-400 bg-red-950/30 border border-red-500/20 rounded-lg px-3 py-2">
                <i class="fa-solid fa-triangle-exclamation mr-1"></i>{{ formError }}
              </p>
            </template>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-between px-6 py-4 border-t border-[#2A2A2A] bg-[#0A0A0A]">
            <div class="flex items-center gap-2">
              <button
                v-if="projectFormTab !== 'basic'"
                type="button"
                @click="projectFormTab = projectFormTab === 'tech_modules' ? 'features_stats' : (projectFormTab === 'features_stats' ? 'hero' : 'basic')"
                class="font-mono text-xs px-3 py-2 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white transition-all cursor-pointer"
              >
                <i class="fa-solid fa-arrow-left mr-1"></i> Prev Step
              </button>
              <button
                v-if="projectFormTab !== 'tech_modules'"
                type="button"
                @click="projectFormTab = projectFormTab === 'basic' ? 'hero' : (projectFormTab === 'hero' ? 'features_stats' : 'tech_modules')"
                class="font-mono text-xs px-3 py-2 bg-[#121212] hover:bg-[#1a1a1a] border border-[#2A2A2A] text-white rounded-lg transition-all cursor-pointer"
              >
                Next Step <i class="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>

            <div class="flex items-center gap-3">
              <button
                @click="closeModal"
                class="font-mono text-xs px-4 py-2 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white hover:border-[#2A2A2A] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                v-if="!loadingForm"
                @click="submitForm"
                :disabled="saving"
                class="flex items-center gap-2 font-mono text-xs px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer font-bold shadow-lg"
              >
                <div v-if="saving" class="w-3.5 h-3.5 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
                <i v-else class="fa-solid fa-floppy-disk"></i>
                {{ saving ? 'Saving…' : (editMode ? 'Update Project' : 'Create Project') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Delete Confirm Modal ──────────────────────────────────── -->
    <Transition name="modal">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 z-[110] bg-[#0A0A0A] backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="deleteTarget = null"
      >
        <div class="bg-[#0A0A0A] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 flex items-center justify-center">
              <i class="fa-solid fa-trash text-red-400 text-lg"></i>
            </div>
            <h3 class="font-mono text-sm font-bold text-white">Delete Project?</h3>
            <p class="font-sans text-xs text-[#A1A1AA] leading-relaxed">
              This will permanently delete <span class="text-white font-semibold">{{ deleteTarget.title }}</span> and all its detail data from the database.
            </p>
            <div class="flex gap-3 mt-2 w-full">
              <button
                @click="deleteTarget = null"
                class="flex-1 font-mono text-xs py-2 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                @click="deleteProject"
                :disabled="saving"
                class="flex-1 font-mono text-xs py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <div v-if="saving" class="w-3 h-3 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
                <span>{{ saving ? 'Deleting…' : 'Delete' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── CV Add / Edit Modal ─────────────────────────────────── -->
    <Transition name="modal">
      <div
        v-if="showCvModal"
        class="fixed inset-0 z-[100] bg-[#0A0A0A] backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        @click.self="closeCvModal"
      >
        <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl w-full max-w-md my-8 shadow-2xl" @click.stop>

          <!-- Modal header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
            <div>
              <h2 class="font-mono text-sm font-bold text-white">
                {{ cvEditMode ? '✏️ Edit CV Profile' : '➕ Add CV Profile' }}
              </h2>
              <p class="font-mono text-[10px] text-[#A1A1AA] mt-0.5">
                {{ cvEditMode ? `Editing ID #${cvForm.id}` : 'Upload a CV profile file' }}
              </p>
            </div>
            <button @click="closeCvModal" class="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>

          <!-- Modal body -->
          <div class="px-6 py-6 flex flex-col gap-5">

            <!-- Row: title -->
            <div class="field">
              <label>CV Title <span class="text-red-400">*</span></label>
              <input v-model="cvForm.title" placeholder="Frontend Developer CV" />
            </div>

            <!-- Row: file upload -->
            <div class="field">
              <label>CV File (PDF / Word / Image) <span v-if="!cvEditMode" class="text-red-400">*</span></label>
              <input type="file" @change="onCvFileChange" accept=".pdf,.doc,.docx,image/*" class="file-input w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs font-mono" />
              <p v-if="cvForm.filePreview" class="mt-2 font-mono text-[10px] text-[#A1A1AA]">
                Selected: <span class="text-indigo-400">{{ cvForm.filePreview }}</span>
              </p>
              <p v-else-if="cvEditMode" class="mt-2 font-mono text-[10px] text-[#A1A1AA] italic">
                Leave empty to keep existing file.
              </p>
            </div>

            <!-- Row: sort_order -->
            <div class="field">
              <label>Sort Order</label>
              <input v-model.number="cvForm.sort_order" type="number" placeholder="0" class="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs font-mono" />
            </div>

            <!-- Error -->
            <p v-if="cvFormError" class="font-mono text-[11px] text-red-400 bg-red-950/30 border border-red-500/20 rounded-lg px-3 py-2">
              <i class="fa-solid fa-triangle-exclamation mr-1"></i>{{ cvFormError }}
            </p>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2A2A2A]">
            <button
              @click="closeCvModal"
              class="font-mono text-xs px-4 py-2 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white hover:border-[#2A2A2A] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              @click="submitCvForm"
              :disabled="cvSaving"
              class="flex items-center gap-2 font-mono text-xs px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer"
            >
              <div v-if="cvSaving" class="w-3.5 h-3.5 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
              <i v-else class="fa-solid fa-floppy-disk"></i>
              {{ cvSaving ? 'Saving…' : (cvEditMode ? 'Update CV' : 'Upload CV') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── CV Delete Confirm Modal ─────────────────────────────── -->
    <Transition name="modal">
      <div
        v-if="cvDeleteTarget"
        class="fixed inset-0 z-[110] bg-[#0A0A0A] backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="cvDeleteTarget = null"
      >
        <div class="bg-[#0A0A0A] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 flex items-center justify-center">
              <i class="fa-solid fa-trash text-red-400 text-lg"></i>
            </div>
            <h3 class="font-mono text-sm font-bold text-white">Delete CV Profile?</h3>
            <p class="font-sans text-xs text-[#A1A1AA] leading-relaxed">
              This will permanently delete <span class="text-white font-semibold">{{ cvDeleteTarget.title }}</span> and its file from storage.
            </p>
            <div class="flex gap-3 mt-2 w-full">
              <button
                @click="cvDeleteTarget = null"
                class="flex-1 font-mono text-xs py-2 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                @click="deleteCv"
                :disabled="cvSaving"
                class="flex-1 font-mono text-xs py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <div v-if="cvSaving" class="w-3 h-3 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
                <span>{{ cvSaving ? 'Deleting…' : 'Delete' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="toast"
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-[#121212] border border-[#2A2A2A] rounded-xl px-4 py-3 shadow-2xl"
      >
        <i :class="toast.type === 'success' ? 'fa-solid fa-circle-check text-emerald-400' : 'fa-solid fa-circle-xmark text-red-400'"></i>
        <span class="font-mono text-xs text-white">{{ toast.msg }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getImageUrl, clearProjectsCache } from '../composables/useProjects';
import { useSettings } from '../composables/useSettings';
import apiClient from '../utils/api';

// Settings Composable
const { settings, fetchSettings, updateSettings } = useSettings();

// Tab State
const currentTab     = ref('projects');
const cvs            = ref([]);
const loadingCvsList = ref(false);

// Dynamic Site Settings State (Experience, Shipped Works & Live Metrics)
const settingsForm = reactive({
  experience_years: '03+',
  shipped_works: '15+',
  uptime_focus: '99.9%',
  role_phrases: [
    'modern React & Vue web applications styled with Tailwind CSS',
    'high-performance PHP & Laravel backends with SQL databases',
    'scalable cloud architectures & distributed APIs',
    'end-to-end full stack platforms with 99.9% uptime',
  ],
  bio_tagline: 'Co-Founder & Full-Stack Architect',
  quests_cleared: '10+',
  time_played: '3+ Yrs',
});
const savingSettings = ref(false);

const loadSettingsData = async () => {
  try {
    const data = await fetchSettings(true);
    if (data) {
      if (data.experience_years !== undefined) settingsForm.experience_years = data.experience_years;
      if (data.shipped_works !== undefined) settingsForm.shipped_works = data.shipped_works;
      if (data.uptime_focus !== undefined) settingsForm.uptime_focus = data.uptime_focus;
      if (Array.isArray(data.role_phrases) && data.role_phrases.length > 0) {
        settingsForm.role_phrases = [...data.role_phrases];
      }
      if (data.bio_tagline !== undefined) settingsForm.bio_tagline = data.bio_tagline;
      if (data.quests_cleared !== undefined) settingsForm.quests_cleared = data.quests_cleared;
      if (data.time_played !== undefined) settingsForm.time_played = data.time_played;
    }
  } catch (e) {
    console.error('Failed to load settings data:', e);
  }
};

const addRolePhrase = () => {
  if (!settingsForm.role_phrases) settingsForm.role_phrases = [];
  settingsForm.role_phrases.push('');
};

const removeRolePhrase = (idx) => {
  settingsForm.role_phrases.splice(idx, 1);
};

const saveSiteSettings = async () => {
  savingSettings.value = true;
  try {
    const payload = {
      ...settingsForm,
      role_phrases: (settingsForm.role_phrases || []).filter(p => p && typeof p === 'string' && p.trim().length > 0),
    };
    await updateSettings(payload);
    showToast('Settings saved successfully ✓', 'success');
  } catch (e) {
    showToast(`Failed to save settings: ${e.response?.data?.message || e.message}`, 'error');
  } finally {
    savingSettings.value = false;
  }
};

// ── Auth ─────────────────────────────────────────────────────────
const authed     = ref(false);
const keyInput   = ref('');
const loginError = ref('');
const loggingIn  = ref(false);

const login = async () => {
  if (loggingIn.value) return;
  loggingIn.value = true;
  loginError.value = '';
  try {
    // Explicitly pass key in header for the login check
    await apiClient.get('/admin/projects', {
      headers: { 'X-Admin-Key': keyInput.value },
    });
    authed.value = true;
    sessionStorage.setItem('admin_key', keyInput.value);
    loadProjects();
    loadCvs();
    loadSettingsData();
  } catch (err) {
    if (err.response?.status === 401) {
      loginError.value = 'Wrong key — try again.';
    } else {
      loginError.value = 'Cannot reach the API server.';
    }
  } finally {
    loggingIn.value = false;
  }
};

const savedKey = sessionStorage.getItem('admin_key');
if (savedKey) { keyInput.value = savedKey; authed.value = true; }

const goHome = () => {
  window.history.pushState({}, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// ── Project list ──────────────────────────────────────────────────
const projects   = ref([]);
const loadingList = ref(false);
const apiError   = ref(null);

const loadProjects = async () => {
  loadingList.value = true;
  apiError.value    = null;
  try {
    const res = await apiClient.get('/admin/projects');
    projects.value = res.data;
  } catch (e) {
    apiError.value = `Failed to load projects: ${e.response?.data?.message || e.message}`;
  } finally {
    loadingList.value = false;
  }
};

const loadCvs = async () => {
  loadingCvsList.value = true;
  apiError.value       = null;
  try {
    const res = await apiClient.get('/admin/cvs');
    cvs.value = res.data;
  } catch (e) {
    apiError.value = `Failed to load CVs: ${e.response?.data?.message || e.message}`;
  } finally {
    loadingCvsList.value = false;
  }
};

onMounted(() => {
  loadSettingsData();
  if (authed.value) {
    loadProjects();
    loadCvs();
  }
});

// ── Modal / Form ──────────────────────────────────────────────────
const showModal       = ref(false);
const editMode        = ref(false);
const saving          = ref(false);
const formError       = ref('');
const tagsInput       = ref('');
const loadingForm     = ref(false);
const projectFormTab  = ref('basic'); // 'basic' | 'hero' | 'features_stats' | 'tech_modules'

const blankForm = () => ({
  id: null,
  title: '',
  description: '',
  existingImages: [],
  imagePreviews: [],
  thumbnail: '',
  imageFiles: [],
  thumbnailFile: null,

  tags: [],
  sort_order: (projects.value.length + 1) * 10,
  has_details: true,
  detailData: {
    heroTitle: '', heroSubject: '', tagline: '',
    abstract: '', repoUrl: '', liveUrl: '',
    stats: [], gallery: [], features: [],
    technologies: [], modules: [], highlights: [],
  },
});

const form = reactive(blankForm());

// ── Feature & Detail Helpers ──────────────────────────────────────────
const addFeature = () => {
  if (!form.detailData.features) form.detailData.features = [];
  form.detailData.features.push({ title: '', desc: '' });
};

const removeFeature = (idx) => {
  form.detailData.features.splice(idx, 1);
};

const addStat = () => {
  if (!form.detailData.stats) form.detailData.stats = [];
  form.detailData.stats.push({ val: '', label: '' });
};

const removeStat = (idx) => {
  form.detailData.stats.splice(idx, 1);
};

const addTech = () => {
  if (!form.detailData.technologies) form.detailData.technologies = [];
  form.detailData.technologies.push({ name: '', stack: '', icon: 'fa-solid fa-code' });
};

const removeTech = (idx) => {
  form.detailData.technologies.splice(idx, 1);
};

const addModule = () => {
  if (!form.detailData.modules) form.detailData.modules = [];
  form.detailData.modules.push({ title: '', itemsInput: '', items: [] });
};

const removeModule = (idx) => {
  form.detailData.modules.splice(idx, 1);
};

const addHighlight = () => {
  if (!form.detailData.highlights) form.detailData.highlights = [];
  form.detailData.highlights.push({ title: '', desc: '', tag: 'FEATURE', image: '' });
};

const removeHighlight = (idx) => {
  form.detailData.highlights.splice(idx, 1);
};

const onImageChange = (e) => {
  const files = Array.from(e.target.files).slice(0, 7);
  form.imageFiles = files;
  form.existingImages = []; 
  form.imagePreviews = files.map(f => URL.createObjectURL(f));
};

const onThumbnailChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.thumbnailFile = file;
    form.thumbnail = URL.createObjectURL(file);
  }
};

const openAdd = () => {
  Object.assign(form, blankForm());
  tagsInput.value      = '';
  editMode.value       = false;
  formError.value      = '';
  projectFormTab.value = 'basic';
  showModal.value      = true;
};

const openEdit = async (p) => {
  formError.value      = '';
  editMode.value       = true;
  loadingForm.value    = true;
  projectFormTab.value = 'basic';
  showModal.value      = true;

  try {
    const res = await apiClient.get(`/projects/${p.id}`);
    const full = res.data;
    
    // Parse modules itemsInput for easy comma-separated editing
    const rawModules = Array.isArray(full.detailData?.modules) ? full.detailData.modules : [];
    const formattedModules = rawModules.map(m => ({
      title: m.title || '',
      items: Array.isArray(m.items) ? m.items : [],
      itemsInput: Array.isArray(m.items) ? m.items.join(', ') : (typeof m.items === 'string' ? m.items : ''),
    }));

    Object.assign(form, {
      id:          full.id,
      title:       full.title,
      description: full.description,
      existingImages: Array.isArray(full.image) ? full.image : (full.image ? [full.image] : []),
      imagePreviews:  Array.isArray(full.image) ? full.image : (full.image ? [full.image] : []),
      thumbnail:   full.thumbnail ?? '',
      imageFiles:   [],
      thumbnailFile: null,
      tags:        full.tags ?? [],
      sort_order:  full.sort_order ?? 0,
      has_details: full.hasDetails ?? true,
      detailData: {
        heroTitle:    full.detailData?.heroTitle    ?? '',
        heroSubject:  full.detailData?.heroSubject  ?? '',
        tagline:      full.detailData?.tagline       ?? '',
        abstract:     full.detailData?.abstract     ?? '',
        repoUrl:      full.detailData?.repoUrl      ?? '',
        liveUrl:      full.detailData?.liveUrl      ?? '',
        stats:        Array.isArray(full.detailData?.stats) ? full.detailData.stats : [],
        features:     Array.isArray(full.detailData?.features) ? full.detailData.features : [],
        technologies: Array.isArray(full.detailData?.technologies) ? full.detailData.technologies : [],
        modules:      formattedModules,
        highlights:   Array.isArray(full.detailData?.highlights) ? full.detailData.highlights : [],
        gallery:      full.detailData?.gallery      ?? [],
      },
    });
    tagsInput.value    = (full.tags ?? []).join(', ');

  } catch (e) {
    formError.value = `Could not load project data: ${e.response?.data?.message || e.message}`;
  } finally {
    loadingForm.value = false;
  }
};

const closeModal = () => { 
  showModal.value = false; 
  loadingForm.value = false;
};

const submitForm = async () => {
  formError.value = '';
  if (!form.title.trim())       { formError.value = 'Title is required.';       return; }
  if (!form.description.trim()) { formError.value = 'Description is required.'; return; }
  if (form.existingImages.length === 0 && form.imageFiles.length === 0) { formError.value = 'At least one image is required.'; return; }

  form.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);

  // Format modules items from itemsInput
  if (Array.isArray(form.detailData.modules)) {
    form.detailData.modules.forEach(m => {
      if (typeof m.itemsInput === 'string') {
        m.items = m.itemsInput.split(',').map(i => i.trim()).filter(Boolean);
      }
    });
  }

  saving.value = true;
  try {
    const url = editMode.value
      ? `/admin/projects/${form.id}`
      : `/admin/projects`;

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('sort_order', form.sort_order);
    formData.append('has_details', form.has_details ? 1 : 0);

    if (form.imageFiles && form.imageFiles.length > 0) {
      form.imageFiles.forEach((f) => {
        formData.append('imageFiles[]', f);
      });
    }
    if (form.existingImages && form.existingImages.length > 0) {
      formData.append('existingImages', JSON.stringify(form.existingImages));
    }

    if (form.thumbnailFile) {
      formData.append('thumbnail', form.thumbnailFile);
    }

    formData.append('tags', JSON.stringify(form.tags));
    formData.append('detailData', JSON.stringify(form.detailData));

    if (editMode.value) {
      formData.append('_method', 'PUT');
    }

    // Always POST because Laravel needs POST to handle multipart/form-data uploads with PUT override
    await apiClient.post(url, formData);

    showToast(editMode.value ? 'Project updated ✓' : 'Project created ✓', 'success');
    closeModal();
    clearProjectsCache();
    await loadProjects();
  } catch (e) {
    const errData = e.response?.data;
    formError.value = errData?.error ?? JSON.stringify(errData?.errors ?? e.message);
  } finally {
    saving.value = false;
  }
};

// ── Delete ────────────────────────────────────────────────────────
const deleteTarget = ref(null);

const confirmDelete = (p) => { deleteTarget.value = p; };

const deleteProject = async () => {
  saving.value = true;
  try {
    await apiClient.delete(`/admin/projects/${deleteTarget.value.id}`);
    showToast('Project deleted', 'success');
    deleteTarget.value = null;
    clearProjectsCache();
    await loadProjects();
  } catch (e) {
    apiError.value = `Delete failed: ${e.response?.data?.message || e.message}`;
  } finally {
    saving.value = false;
  }
};

// ── CV Modal / Form ──────────────────────────────────────────────────
const showCvModal = ref(false);
const cvEditMode  = ref(false);
const cvSaving    = ref(false);
const cvFormError = ref('');

const blankCvForm = () => ({
  id: null,
  title: '',
  cv_file: null,
  filePreview: '',
  sort_order: 0,
});

const cvForm = reactive(blankCvForm());

const openAddCv = () => {
  Object.assign(cvForm, blankCvForm());
  cvEditMode.value  = false;
  cvFormError.value = '';
  showCvModal.value = true;
};

const openEditCv = (cv) => {
  cvFormError.value = '';
  cvEditMode.value  = true;
  Object.assign(cvForm, {
    id:          cv.id,
    title:       cv.title,
    cv_file:     null,
    filePreview: '',
    sort_order:  cv.sort_order ?? 0,
  });
  showCvModal.value = true;
};

const closeCvModal = () => {
  showCvModal.value = false;
};

const onCvFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    cvForm.cv_file = file;
    cvForm.filePreview = file.name;
  }
};

const submitCvForm = async () => {
  cvFormError.value = '';
  if (!cvForm.title.trim()) {
    cvFormError.value = 'Title is required.';
    return;
  }
  if (!cvEditMode.value && !cvForm.cv_file) {
    cvFormError.value = 'CV file is required.';
    return;
  }

  cvSaving.value = true;
  try {
    const url = cvEditMode.value
      ? `/admin/cvs/${cvForm.id}`
      : `/admin/cvs`;

    const formData = new FormData();
    formData.append('title', cvForm.title);
    formData.append('sort_order', cvForm.sort_order);

    if (cvForm.cv_file) {
      formData.append('cv_file', cvForm.cv_file);
    }

    if (cvEditMode.value) {
      formData.append('_method', 'PUT');
    }

    await apiClient.post(url, formData);

    showToast(cvEditMode.value ? 'CV updated ✓' : 'CV created ✓', 'success');
    closeCvModal();
    await loadCvs();
  } catch (e) {
    const errData = e.response?.data;
    cvFormError.value = errData?.error ?? JSON.stringify(errData?.errors ?? e.message);
  } finally {
    cvSaving.value = false;
  }
};

// ── CV Delete ────────────────────────────────────────────────────────
const cvDeleteTarget = ref(null);

const confirmDeleteCv = (cv) => {
  cvDeleteTarget.value = cv;
};

const deleteCv = async () => {
  cvSaving.value = true;
  try {
    await apiClient.delete(`/admin/cvs/${cvDeleteTarget.value.id}`);
    showToast('CV profile deleted', 'success');
    cvDeleteTarget.value = null;
    await loadCvs();
  } catch (e) {
    apiError.value = `Delete failed: ${e.response?.data?.message || e.message}`;
  } finally {
    cvSaving.value = false;
  }
};

// ── Toast ─────────────────────────────────────────────────────────
const toast = ref(null);
let toastTimer = null;

const showToast = (msg, type = 'success') => {
  toast.value = { msg, type };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.value = null; }, 3000);
};
</script>

<style scoped>
/* Field helpers */
.field label {
  display: block;
  font-family: monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #737373;
  margin-bottom: 6px;
}
.field input,
.field textarea {
  width: 100%;
  background: #0a0a0a;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 8px 12px;
  font-family: monospace;
  font-size: 12px;
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}
.field input:focus,
.field textarea:focus {
  border-color: rgba(99,102,241,0.5);
}
.field input::placeholder,
.field textarea::placeholder {
  color: #404040;
}

/* Modal transition */
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; }

/* Toast transition */
.toast-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from   { opacity: 0; transform: translateY(12px) scale(0.95); }
.toast-leave-to     { opacity: 0; transform: translateY(6px); }
</style>
