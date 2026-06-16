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
          {{ currentTab === 'projects' ? 'Projects Admin' : 'CVs Admin' }}
        </span>
        <span class="font-mono text-[10px] text-[#A1A1AA] border border-[#2A2A2A] rounded px-2 py-0.5 animate-pulse">
          {{ currentTab === 'projects' ? projects.length : cvs.length }} entries
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
          v-else
          @click="openAddCv"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-plus"></i> Add CV Profile
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
      <div class="flex items-center gap-2 mb-8 border-b border-[#2A2A2A] pb-4">
        <button
          @click="currentTab = 'projects'"
          class="font-mono text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer"
          :class="currentTab === 'projects'
            ? 'bg-[#ffffff]/10 border-[#ffffff]/30 text-[#ffffff] font-bold'
            : 'border-transparent text-[#A1A1AA] hover:text-neutral-200 hover:bg-[#2A2A2A]'"
        >
          <i class="fa-solid fa-layer-group mr-1.5"></i> Projects
        </button>
        <button
          @click="currentTab = 'cvs'"
          class="font-mono text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer"
          :class="currentTab === 'cvs'
            ? 'bg-[#ffffff]/10 border-[#ffffff]/30 text-[#ffffff] font-bold'
            : 'border-transparent text-[#A1A1AA] hover:text-neutral-200 hover:bg-[#2A2A2A]'"
        >
          <i class="fa-solid fa-file-pdf mr-1.5"></i> CV Profiles
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
          <span class="font-mono text-xs text-[#A1A1AA]">Loading CVs...</span>
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

          <!-- Modal body -->
          <div class="px-6 py-6 flex flex-col gap-5 relative">
            <div v-if="loadingForm" class="flex flex-col items-center justify-center py-20 gap-3">
              <div class="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span class="font-mono text-xs text-[#A1A1AA]">// fetching project details from db</span>
            </div>
            
            <template v-else>
              <!-- Row: title -->
              <div class="field">
                <label>Title <span class="text-red-400">*</span></label>
                <input v-model="form.title" placeholder="My Awesome Project" />
              </div>

              <!-- Row: description -->
              <div class="field">
                <label>Description <span class="text-red-400">*</span></label>
                <textarea v-model="form.description" rows="3" placeholder="Short description shown on the project card..."></textarea>
              </div>

              <!-- Row: image + thumbnail -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="field">
                  <label>Image(s) <span class="text-[#A1A1AA]">(max 7)</span> <span class="text-red-400">*</span></label>
                  <input type="file" multiple @change="onImageChange" accept="image/*" class="file-input" />
                  <div class="flex gap-2 mt-2 flex-wrap">
                    <img v-for="(img, idx) in form.imagePreviews" :key="'img'+idx" :src="getImageUrl(img)" class="h-16 rounded border border-[#2A2A2A] object-cover" />
                  </div>
                </div>
                <div class="field">
                  <label>Thumbnail</label>
                  <input type="file" @change="onThumbnailChange" accept="image/*" class="file-input" />
                  <img v-if="form.thumbnail" :src="getImageUrl(form.thumbnail)" class="mt-2 h-16 rounded border border-[#2A2A2A] object-cover" />
                </div>
              </div>

              <!-- Row: sort_order -->
              <div class="field w-1/2">
                <label>Sort Order</label>
                <input v-model.number="form.sort_order" type="number" placeholder="10" />
              </div>

              <!-- Row: tags -->
              <div class="field">
                <label>Tags <span class="text-[#A1A1AA]">(comma-separated)</span></label>
                <input v-model="tagsInput" placeholder="React, Node.js, MongoDB" />
              </div>

              <!-- Divider: Detail data -->
              <div class="flex items-center gap-3 my-1">
                <div class="flex-1 h-px bg-[#2A2A2A]"></div>
                <span class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest">Detail Data</span>
                <div class="flex-1 h-px bg-[#2A2A2A]"></div>
              </div>

              <!-- Row: hero title + subject -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="field">
                  <label>Hero Title</label>
                  <input v-model="form.detailData.heroTitle" placeholder="My Project" />
                </div>
                <div class="field">
                  <label>Hero Subject</label>
                  <input v-model="form.detailData.heroSubject" placeholder="Subtitle" />
                </div>
              </div>

              <!-- Row: tagline -->
              <div class="field">
                <label>Tagline</label>
                <input v-model="form.detailData.tagline" placeholder="// Short developer tagline" />
              </div>

              <!-- Row: abstract -->
              <div class="field">
                <label>Abstract</label>
                <textarea v-model="form.detailData.abstract" rows="4" placeholder="Full description of the project..."></textarea>
              </div>

              <!-- Row: repo / live URLs -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="field">
                  <label>Repo URL</label>
                  <input v-model="form.detailData.repoUrl" placeholder="https://github.com/..." />
                </div>
                <div class="field">
                  <label>Live URL</label>
                  <input v-model="form.detailData.liveUrl" placeholder="https://..." />
                </div>
              </div>

              <!-- Error -->
              <p v-if="formError" class="font-mono text-[11px] text-red-400 bg-red-950/30 border border-red-500/20 rounded-lg px-3 py-2">
                <i class="fa-solid fa-triangle-exclamation mr-1"></i>{{ formError }}
              </p>
            </template>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2A2A2A]">
            <button
              @click="closeModal"
              class="font-mono text-xs px-4 py-2 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white hover:border-[#2A2A2A] transition-all"
            >
              Cancel
            </button>
            <button
              v-if="!loadingForm"
              @click="submitForm"
              :disabled="saving"
              class="flex items-center gap-2 font-mono text-xs px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              <div v-if="saving" class="w-3.5 h-3.5 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
              <i v-else class="fa-solid fa-floppy-disk"></i>
              {{ saving ? 'Saving…' : (editMode ? 'Update Project' : 'Create Project') }}
            </button>
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
                :disabled="deleting"
                class="flex-1 font-mono text-xs py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <div v-if="deleting" class="w-3 h-3 border-2 border-[#2A2A2A] border-t-transparent rounded-full animate-spin"></div>
                <span>{{ deleting ? 'Deleting…' : 'Delete' }}</span>
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

            <!-- Row: file upload OR direct URL -->
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

            <!-- Row: OR direct URL -->
            <div class="field">
              <label>— or — Direct File URL <span class="text-[#A1A1AA]">(https://...)</span></label>
              <input v-model="cvForm.file_url" placeholder="https://drive.google.com/file/..." class="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 transition-colors" />
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
import { getImageUrl, clearProjectsCache, unpackDescription } from '../composables/useProjects';
import { getCvs, createCv, updateCv, deleteCvById } from '../composables/useCvs';
import apiClient from '../utils/api';

// Tab State
const currentTab     = ref('projects');
const cvs            = ref([]);
const loadingCvsList = ref(false);

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
    // Validate key client-side — the backend has no dedicated auth endpoint.
    // The X-Admin-Key header is injected automatically for all write operations.
    const envKey = import.meta.env.VITE_ADMIN_KEY;
    if (!keyInput.value.trim()) {
      loginError.value = 'Please enter the admin key.';
      return;
    }
    if (envKey && keyInput.value !== envKey) {
      loginError.value = 'Wrong key — try again.';
      return;
    }

    // Key accepted — store and load data
    sessionStorage.setItem('admin_key', keyInput.value);
    authed.value = true;
    loadProjects();
    // CV endpoint not yet available on this backend
  } catch (err) {
    loginError.value = 'An unexpected error occurred.';
  } finally {
    loggingIn.value = false;
  }
};

const savedKey = sessionStorage.getItem('admin_key');
if (savedKey) {
  keyInput.value = savedKey;
  authed.value = true;
}

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
    const res = await apiClient.get('/products');
    // API shape: { success, data: { data: [...], meta: {...} } }
    const rawList = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
    projects.value = rawList.map(item => {
      const { unpacked, description } = unpackDescription(item.description);
      return {
        ...item,
        title: item.title || item.name || '',
        description: description,
        image: unpacked.image || item.image || [],
        thumbnail: unpacked.thumbnail || item.thumbnail || '',
        tags: unpacked.tags || (Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? JSON.parse(item.tags) : [])),
        sort_order: unpacked.sort_order !== undefined ? unpacked.sort_order : (item.sort_order ?? 0),
      };
    });
  } catch (e) {
    apiError.value = `Failed to load projects: ${e.response?.data?.message || e.message}`;
  } finally {
    loadingList.value = false;
  }
};

const loadCvs = () => {
  // localStorage-backed — synchronous, no backend needed.
  cvs.value = getCvs();
};

onMounted(() => {
  if (authed.value) {
    loadProjects();
    loadCvs();
  }
});

// ── Modal / Form ──────────────────────────────────────────────────
const showModal = ref(false);
const editMode  = ref(false);
const saving    = ref(false);
const formError = ref('');
const tagsInput    = ref('');
const loadingForm = ref(false);

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
    technologies: [], modules: [], highlights: null,
  },
});

const form = reactive(blankForm());

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
  tagsInput.value    = '';
  editMode.value     = false;
  formError.value    = '';
  showModal.value    = true;
};

const openEdit = async (p) => {
  formError.value = '';
  editMode.value  = true;
  loadingForm.value = true;
  showModal.value = true;

  try {
    const res = await apiClient.get(`/products/${p.id}`);
    // API shape: { success, data: { ... } }
    const rawFull = res.data?.data ?? res.data;
    const { unpacked, description } = unpackDescription(rawFull.description);
    const full = {
      ...rawFull,
      title: rawFull.title || rawFull.name || '',
      description: description,
      image: unpacked.image || rawFull.image || [],
      thumbnail: unpacked.thumbnail || rawFull.thumbnail || '',
      tags: unpacked.tags || (Array.isArray(rawFull.tags) ? rawFull.tags : (typeof rawFull.tags === 'string' ? JSON.parse(rawFull.tags) : [])),
      hasDetails: unpacked.has_details !== undefined ? !!unpacked.has_details : (rawFull.hasDetails !== undefined ? !!rawFull.hasDetails : (rawFull.has_details !== undefined ? !!rawFull.has_details : true)),
      sort_order: unpacked.sort_order !== undefined ? unpacked.sort_order : (rawFull.sort_order ?? 0),
      detailData: unpacked.detailData || rawFull.detailData || rawFull.detail_data || {}
    };
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
        stats:        full.detailData?.stats        ?? [],
        features:     full.detailData?.features     ?? [],
        technologies: full.detailData?.technologies ?? [],
        modules:      full.detailData?.modules      ?? [],
        highlights:   full.detailData?.highlights   ?? null,
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

  saving.value = true;
  try {
    // Compress an image file to a JPEG data URL.
    // maxW/maxH cap the longest side; quality is 0-1 JPEG quality.
    // If the result still exceeds targetBytes, quality is halved and retried once.
    const compressImage = (file, maxW = 1200, maxH = 900, quality = 0.72, targetBytes = 300_000) => {
      const doCompress = (src, w, h, q) => new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          const ratio = Math.min(w / width, h / height, 1);
          width  = Math.round(width  * ratio);
          height = Math.round(height * ratio);
          const canvas = document.createElement('canvas');
          canvas.width  = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', q));
        };
        img.onerror = () => resolve(null);
      });

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
          const src = event.target.result;
          let result = await doCompress(src, maxW, maxH, quality);
          // If still too large, retry at half quality
          if (result && result.length > targetBytes) {
            result = await doCompress(src, maxW, maxH, quality * 0.5);
          }
          resolve(result);
        };
        reader.onerror = () => resolve(null);
      });
    };

    const readAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    };

    // Convert new uploaded image files to Base64 (with compression)
    // Gallery images: 1200×900 @ 0.72 quality, max 300 KB each
    const newImageBase64s = [];
    if (form.imageFiles && form.imageFiles.length > 0) {
      for (const file of form.imageFiles) {
        try {
          const base64 = await compressImage(file, 1200, 900, 0.72, 300_000) || await readAsBase64(file);
          newImageBase64s.push(base64);
        } catch (fileErr) {
          console.error('Failed to read image file:', fileErr);
        }
      }
    }

    // Convert thumbnail to Base64 (with compression)
    // Thumbnails: 640×480 @ 0.65 quality, max 120 KB
    let thumbnailBase64 = form.thumbnail;
    if (form.thumbnailFile) {
      try {
        thumbnailBase64 = await compressImage(form.thumbnailFile, 640, 480, 0.65, 120_000) || await readAsBase64(form.thumbnailFile);
      } catch (fileErr) {
        console.error('Failed to read thumbnail file:', fileErr);
      }
    }

    const finalImages = [...form.existingImages, ...newImageBase64s];

    // Pack all details into JSON inside the description column
    const packedDescription = JSON.stringify({
      description: form.description,
      image: finalImages,
      thumbnail: thumbnailBase64,
      tags: form.tags,
      sort_order: form.sort_order,
      has_details: form.has_details,
      detailData: form.detailData
    });

    // Hard limit: 15 MB (MySQL MEDIUMTEXT). Soft warning at 5 MB.
    const MAX_BYTES = 15 * 1024 * 1024; // 15 MB
    const WARN_BYTES = 5 * 1024 * 1024; // 5 MB
    const sizeKB = Math.round(packedDescription.length / 1024);
    if (packedDescription.length > MAX_BYTES) {
      formError.value = `Project data is too large (${sizeKB} KB). Limit is 15 MB — please reduce the number or size of images.`;
      saving.value = false;
      return;
    }
    if (packedDescription.length > WARN_BYTES) {
      console.warn(`[AdminPanel] Large payload: ${sizeKB} KB. Consider using fewer images.`);
    }

    const url = editMode.value
      ? `/admin/products/${form.id}`
      : `/admin/products`;

    const payload = {
      name: form.title,
      price: 0,
      stock: 0,
      status: 'active',
      description: packedDescription
    };

    if (editMode.value) {
      await apiClient.put(url, payload);
    } else {
      await apiClient.post(url, payload);
    }

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
const deleting     = ref(false); // separate from `saving` to avoid spinner conflicts

const confirmDelete = (p) => { deleteTarget.value = p; };

const deleteProject = async () => {
  deleting.value = true;
  try {
    await apiClient.delete(`/admin/products/${deleteTarget.value.id}`);
    showToast('Project deleted', 'success');
    deleteTarget.value = null;
    clearProjectsCache();
    await loadProjects();
  } catch (e) {
    apiError.value = `Delete failed: ${e.response?.data?.message || e.message}`;
  } finally {
    deleting.value = false;
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
  file_url: '',
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
  if (!cvEditMode.value && !cvForm.cv_file && !cvForm.file_url?.trim()) {
    cvFormError.value = 'Upload a CV file or enter a direct URL.';
    return;
  }

  cvSaving.value = true;
  try {
    // Resolve file: prefer uploaded file (convert to base64), fall back to URL
    let filePath = cvForm.file_url?.trim() || '';
    if (cvForm.cv_file) {
      filePath = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(cvForm.cv_file);
      });
    }

    if (cvEditMode.value) {
      updateCv(cvForm.id, {
        title:      cvForm.title,
        sort_order: cvForm.sort_order,
        ...(filePath ? { file_path: filePath } : {}),
      });
    } else {
      createCv({
        title:      cvForm.title,
        file_path:  filePath,
        sort_order: cvForm.sort_order,
      });
    }

    showToast(cvEditMode.value ? 'CV updated ✓' : 'CV created ✓', 'success');
    closeCvModal();
    loadCvs();
  } catch (e) {
    cvFormError.value = e.message || 'Failed to save CV.';
  } finally {
    cvSaving.value = false;
  }
};

// ── CV Delete ────────────────────────────────────────────────────────
const cvDeleteTarget = ref(null);

const confirmDeleteCv = (cv) => {
  cvDeleteTarget.value = cv;
};

const deleteCv = () => {
  cvSaving.value = true;
  try {
    deleteCvById(cvDeleteTarget.value.id);
    showToast('CV profile deleted', 'success');
    cvDeleteTarget.value = null;
    loadCvs();
  } catch (e) {
    apiError.value = `Delete failed: ${e.message}`;
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
