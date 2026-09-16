import { ref } from 'vue';
import apiClient from '../utils/api';

const enquiries = ref([]);
const enquiryStats = ref({
  total: 0,
  unread: 0,
  new: 0,
  contacted: 0,
  archived: 0,
});
const loading = ref(false);
const submitting = ref(false);
const error = ref(null);

export function useEnquiries() {
  /**
   * Submit enquiry from public contact form
   */
  const submitEnquiry = async (formData) => {
    submitting.value = true;
    error.value = null;
    try {
      const res = await apiClient.post('/enquiries', formData);
      return res.data;
    } catch (err) {
      const errData = err.response?.data;
      const errMsg = errData?.message || (errData?.errors ? Object.values(errData.errors).flat().join(', ') : err.message);
      error.value = errMsg;
      throw new Error(errMsg);
    } finally {
      submitting.value = false;
    }
  };

  /**
   * Fetch all enquiries for Admin Panel
   */
  const fetchEnquiries = async (params = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await apiClient.get('/admin/enquiries', { params });
      if (res.data.success) {
        enquiries.value = res.data.enquiries || [];
        if (res.data.stats) {
          enquiryStats.value = res.data.stats;
        }
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Fetch enquiries error:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Update enquiry status or is_read
   */
  const updateEnquiry = async (id, updateData) => {
    try {
      const res = await apiClient.put(`/admin/enquiries/${id}`, updateData);
      
      // Update local state
      const index = enquiries.value.findIndex(e => e.id === id);
      if (index !== -1 && res.data.data) {
        enquiries.value[index] = { ...enquiries.value[index], ...res.data.data };
      }
      // Re-calculate stats
      enquiryStats.value.unread = enquiries.value.filter(e => !e.is_read).length;
      return res.data;
    } catch (err) {
      console.error('Update enquiry error:', err);
      throw err;
    }
  };

  /**
   * Delete enquiry
   */
  const deleteEnquiry = async (id) => {
    try {
      await apiClient.delete(`/admin/enquiries/${id}`);
      enquiries.value = enquiries.value.filter(e => e.id !== id);
      enquiryStats.value.total = enquiries.value.length;
      enquiryStats.value.unread = enquiries.value.filter(e => !e.is_read).length;
    } catch (err) {
      console.error('Delete enquiry error:', err);
      throw err;
    }
  };

  return {
    enquiries,
    enquiryStats,
    loading,
    submitting,
    error,
    submitEnquiry,
    fetchEnquiries,
    updateEnquiry,
    deleteEnquiry,
  };
}
