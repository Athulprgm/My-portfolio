<template>
  <!-- ── Login Screen ─────────────────────────────────────────── -->
  <div v-if="!authed" class="min-h-screen bg-[#050505] flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <div class="inline-flex items-center gap-2 border border-indigo-500/20 bg-indigo-950/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fa-solid fa-shield-halved text-indigo-400 text-[10px]"></i>
          <span class="font-mono text-[10px] text-indigo-300 tracking-widest uppercase">Admin Access</span>
        </div>
        <h1 class="font-mono text-2xl font-black text-white">Project <span class="text-indigo-400">Dashboard</span></h1>
        <p class="font-mono text-[11px] text-neutral-500 mt-1">// restricted area — enter your key</p>
      </div>

      <div class="bg-neutral-950/60 border border-white/8 rounded-2xl p-6 backdrop-blur">
        <label class="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">Admin Key</label>
        <input
          v-model="keyInput"
          type="password"
          placeholder="portfolio-admin-****"
          @keydown.enter="login"
          class="w-full bg-neutral-900 border border-white/8 rounded-lg px-4 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
        <p v-if="loginError" class="font-mono text-[10px] text-red-400 mt-2">{{ loginError }}</p>
        <button
          @click="login"
          class="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-right-to-bracket"></i> Enter
        </button>
      </div>
    </div>
  </div>

  <!-- ── Admin Dashboard ──────────────────────────────────────── -->
  <div v-else class="min-h-screen bg-[#050505] text-white">

    <!-- Top bar -->
    <header class="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/90 backdrop-blur-md px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
          <i class="fa-solid fa-layer-group text-white text-[10px]"></i>
        </div>
        <span class="font-mono text-sm font-bold text-white">Projects Admin</span>
        <span class="font-mono text-[10px] text-neutral-500 border border-white/10 rounded px-2 py-0.5">
          {{ projects.length }} entries
        </span>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="openAdd"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fa-solid fa-plus"></i> Add Project
        </button>
        <button
          @click="goHome"
          class="flex items-center gap-2 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white font-mono text-xs px-3 py-2 rounded-lg transition-colors"
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

      <!-- Loading -->
      <div v-if="loadingList" class="flex items-center justify-center py-24 gap-3">
        <div class="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="font-mono text-xs text-neutral-500">Loading projects...</span>
      </div>

      <!-- Projects table -->
      <div v-else class="overflow-x-auto rounded-2xl border border-white/6">
        <table class="w-full text-left">
          <thead class="bg-neutral-900/50 border-b border-white/5">
            <tr>
              <th class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest px-4 py-3 w-10">#</th>
              <th class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest px-4 py-3">Title</th>
              <th class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest px-4 py-3 hidden md:table-cell">Tags</th>
              <th class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Order</th>
              <th class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Added</th>
              <th class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/3">
            <tr
              v-for="p in projects"
              :key="p.id"
              class="hover:bg-white/2 transition-colors group"
            >
              <td class="px-4 py-3 font-mono text-[11px] text-neutral-600">{{ String(p.id).padStart(2,'0') }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img :src="getImageUrl(p.thumbnail || p.image)" :alt="p.title" class="w-10 h-7 object-cover rounded border border-white/5 flex-shrink-0" />
                  <div>
                    <p class="font-mono text-xs font-semibold text-white">{{ p.title }}</p>
                    <p class="font-sans text-[11px] text-neutral-500 line-clamp-1 max-w-xs">{{ p.description }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 hidden md:table-cell">
                <div class="flex flex-wrap gap-1">
                  <span v-for="t in (p.tags ?? []).slice(0,3)" :key="t" class="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">{{ t }}</span>
                  <span v-if="(p.tags ?? []).length > 3" class="font-mono text-[9px] text-neutral-500">+{{ p.tags.length - 3 }}</span>
                </div>
              </td>
              <td class="px-4 py-3 hidden lg:table-cell font-mono text-xs text-neutral-500">{{ p.sort_order }}</td>
              <td class="px-4 py-3 hidden lg:table-cell font-mono text-[11px] text-neutral-600">{{ p.created_at ?? '—' }}</td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEdit(p)"
                    class="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-white/10 rounded-lg text-neutral-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button
                    @click="confirmDelete(p)"
                    class="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-white/10 rounded-lg text-neutral-500 hover:border-red-500/40 hover:text-red-400 transition-all"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- ── Add / Edit Modal ────────────────────────────────────── -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        @click.self="closeModal"
      >
        <div class="bg-neutral-950 border border-white/8 rounded-2xl w-full max-w-2xl my-8 shadow-2xl" @click.stop>

          <!-- Modal header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div>
              <h2 class="font-mono text-sm font-bold text-white">
                {{ editMode ? '✏️ Edit Project' : '➕ Add Project' }}
              </h2>
              <p class="font-mono text-[10px] text-neutral-500 mt-0.5">
                {{ editMode ? `Editing ID #${form.id}` : 'Fill in the fields to create a new project' }}
              </p>
            </div>
            <button @click="closeModal" class="text-neutral-500 hover:text-white transition-colors">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>

          <!-- Modal body -->
          <div class="px-6 py-6 flex flex-col gap-5">

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
                <label>Image(s) <span class="text-neutral-600">(max 7)</span> <span class="text-red-400">*</span></label>
                <input type="file" multiple @change="onImageChange" accept="image/*" class="file-input" />
                <div class="flex gap-2 mt-2 flex-wrap">
                  <img v-for="(img, idx) in form.imagePreviews" :key="'img'+idx" :src="getImageUrl(img)" class="h-16 rounded border border-white/10 object-cover" />
                </div>
              </div>
              <div class="field">
                <label>Thumbnail</label>
                <input type="file" @change="onThumbnailChange" accept="image/*" class="file-input" />
                <img v-if="form.thumbnail" :src="getImageUrl(form.thumbnail)" class="mt-2 h-16 rounded border border-white/10 object-cover" />
              </div>
            </div>

            <!-- Row: sort_order -->
            <div class="field w-1/2">
              <label>Sort Order</label>
              <input v-model.number="form.sort_order" type="number" placeholder="10" />
            </div>

            <!-- Row: tags -->
            <div class="field">
              <label>Tags <span class="text-neutral-600">(comma-separated)</span></label>
              <input v-model="tagsInput" placeholder="React, Node.js, MongoDB" />
            </div>

            <!-- Divider: Detail data -->
            <div class="flex items-center gap-3 my-1">
              <div class="flex-1 h-px bg-white/5"></div>
              <span class="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Detail Data</span>
              <div class="flex-1 h-px bg-white/5"></div>
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

            <!-- Row: gallery -->
            <div class="field">
              <label>Gallery Images (Existing URLs - one per line)</label>
              <textarea v-model="galleryInput" rows="3" placeholder="/project-img/screen1.png&#10;/project-img/screen2.png"></textarea>
              <label class="mt-4">Upload New Gallery Images <span class="text-neutral-600">(max 5)</span></label>
              <input type="file" multiple @change="onGalleryChange" accept="image/*" class="file-input" />
              <div class="flex gap-2 mt-2 flex-wrap">
                <img v-for="(img, idx) in form.galleryPreviews" :key="idx" :src="img" class="h-16 rounded border border-white/10 object-cover" />
              </div>
            </div>

            <!-- Error -->
            <p v-if="formError" class="font-mono text-[11px] text-red-400 bg-red-950/30 border border-red-500/20 rounded-lg px-3 py-2">
              <i class="fa-solid fa-triangle-exclamation mr-1"></i>{{ formError }}
            </p>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5">
            <button
              @click="closeModal"
              class="font-mono text-xs px-4 py-2 border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:border-white/20 transition-all"
            >
              Cancel
            </button>
            <button
              @click="submitForm"
              :disabled="saving"
              class="flex items-center gap-2 font-mono text-xs px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              <div v-if="saving" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
        class="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="deleteTarget = null"
      >
        <div class="bg-neutral-950 border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 flex items-center justify-center">
              <i class="fa-solid fa-trash text-red-400 text-lg"></i>
            </div>
            <h3 class="font-mono text-sm font-bold text-white">Delete Project?</h3>
            <p class="font-sans text-xs text-neutral-400 leading-relaxed">
              This will permanently delete <span class="text-white font-semibold">{{ deleteTarget.title }}</span> and all its detail data from the database.
            </p>
            <div class="flex gap-3 mt-2 w-full">
              <button
                @click="deleteTarget = null"
                class="flex-1 font-mono text-xs py-2 border border-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                @click="deleteProject"
                :disabled="saving"
                class="flex-1 font-mono text-xs py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <div v-if="saving" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{{ saving ? 'Deleting…' : 'Delete' }}</span>
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
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 shadow-2xl"
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
import apiClient from '../utils/api';

// ── Auth ─────────────────────────────────────────────────────────
const authed     = ref(false);
const keyInput   = ref('');
const loginError = ref('');

const login = async () => {
  loginError.value = '';
  try {
    // Explicitly pass key in header for the login check
    await apiClient.get('/admin/projects', {
      headers: { 'X-Admin-Key': keyInput.value },
    });
    authed.value = true;
    sessionStorage.setItem('admin_key', keyInput.value);
    loadProjects();
  } catch (err) {
    if (err.response?.status === 401) {
      loginError.value = 'Wrong key — try again.';
    } else {
      loginError.value = 'Cannot reach the API server.';
    }
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

onMounted(() => { if (authed.value) loadProjects(); });

// ── Modal / Form ──────────────────────────────────────────────────
const showModal = ref(false);
const editMode  = ref(false);
const saving    = ref(false);
const formError = ref('');
const tagsInput    = ref('');
const galleryInput = ref('');

const blankForm = () => ({
  id: null,
  title: '',
  description: '',
  existingImages: [],
  imagePreviews: [],
  thumbnail: '',
  imageFiles: [],
  thumbnailFile: null,
  galleryFiles: [],
  galleryPreviews: [],
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

const onGalleryChange = (e) => {
  const files = Array.from(e.target.files).slice(0, 5);
  form.galleryFiles = files;
  form.galleryPreviews = files.map(f => URL.createObjectURL(f));
};

const openAdd = () => {
  Object.assign(form, blankForm());
  tagsInput.value    = '';
  galleryInput.value = '';
  editMode.value     = false;
  formError.value    = '';
  showModal.value    = true;
};

const openEdit = async (p) => {
  formError.value = '';
  editMode.value  = true;
  form.galleryFiles = [];
  form.galleryPreviews = [];
  try {
    const res = await apiClient.get(`/projects/${p.id}`);
    const full = res.data;
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
    galleryInput.value = (full.detailData?.gallery ?? []).join('\n');
  } catch (e) {
    apiError.value = `Could not load project data: ${e.response?.data?.message || e.message}`;
    return;
  }
  showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const submitForm = async () => {
  formError.value = '';
  if (!form.title.trim())       { formError.value = 'Title is required.';       return; }
  if (!form.description.trim()) { formError.value = 'Description is required.'; return; }
  if (form.existingImages.length === 0 && form.imageFiles.length === 0) { formError.value = 'At least one image is required.'; return; }

  form.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);
  form.detailData.gallery = galleryInput.value.split('\n').map(l => l.trim()).filter(Boolean);

  saving.value = true;
  try {
    const url = editMode.value
      ? `/admin/projects/${form.id}`
      : `/admin/projects`;

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('sort_order', form.sort_order);
    formData.append('has_details', true);

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

    form.galleryFiles.forEach((f) => {
      formData.append('galleryFiles[]', f);
    });

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
