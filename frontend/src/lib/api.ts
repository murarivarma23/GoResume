import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` })
  };
};

export const authAPI = {
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName
      });
    }

    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
    return data;
  },

  async signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
    return data;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      return { user, profile };
    }

    return { user: null, profile: null };
  }
};

export const resumeAPI = {
  async getResumes() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes`, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }

    return response.json();
  },

  async getResume(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch resume');
    }

    return response.json();
  },

  async createResume(data: { title?: string; templateId?: string; content?: any }) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to create resume');
    }

    return response.json();
  },

  async updateResume(id: string, data: { title?: string; templateId?: string; content?: any; isPublic?: boolean }) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update resume');
    }

    return response.json();
  },

  async deleteResume(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to delete resume');
    }

    return response.json();
  }
};

export const analyzerAPI = {
  async analyzeResume(file: File, jobDescription?: string, resumeId?: string) {
    const { data: { session } } = await supabase.auth.getSession();

    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) formData.append('jobDescription', jobDescription);
    if (resumeId) formData.append('resumeId', resumeId);

    const response = await fetch(`${API_BASE_URL}/analyzer/analyze`, {
      method: 'POST',
      headers: {
        ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` })
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze resume');
    }

    return response.json();
  },

  async optimizeText(text: string, context?: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/analyzer/optimize`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, context })
    });

    if (!response.ok) {
      throw new Error('Failed to optimize text');
    }

    return response.json();
  },

  async getAnalysisHistory() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/analyzer/history`, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch analysis history');
    }

    return response.json();
  },

  async getAnalysis(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/analyzer/${id}`, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch analysis');
    }

    return response.json();
  }
};
