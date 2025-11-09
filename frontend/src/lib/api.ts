import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

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
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const result = await response.json();
    
    if (result.session) {
      const { error } = await supabase.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      
      if (error) console.error('Error setting session:', error);
    }

    return result;
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      console.log('Sign in successful:', data);
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      console.log('Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
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
    if (!response.ok) throw new Error('Failed to fetch resumes');
    return response.json();
  },

  async getResume(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch resume');
    return response.json();
  },

  async createResume(data: { title?: string; templateId?: string; content?: any }) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create resume');
    return response.json();
  },

  async updateResume(id: string, data: { title?: string; templateId?: string; content?: any; isPublic?: boolean }) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update resume');
    return response.json();
  },

  async deleteResume(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Failed to delete resume');
    return response.json();
  }
};

// ----------------------------
// ✅ FIXED ANALYZER API SECTION
// ----------------------------
export const analyzerAPI = {
  async analyzeResume(file: File, jobDescription?: string, resumeId?: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      throw new Error('You are not logged in. Please log in to analyze resumes.');
    }

    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) formData.append('jobDescription', jobDescription);
    if (resumeId) formData.append('resumeId', resumeId);

    try {
      const res = await fetch(`${API_BASE_URL}/analyzer/analyze`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
        credentials: 'include' // ensures proper CORS & cookie handling
      });

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const err = await res.json();
          msg = err.error || msg;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      console.log('✅ Analyzer API success:', data);
      return data;
    } catch (err: any) {
      console.error('❌ Analyzer API error:', err);
      throw new Error(err.message || 'Failed to analyze resume.');
    }
  },

  async optimizeText(text: string, context?: string) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/analyzer/optimize`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, context }),
      credentials: 'include'
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to optimize text');
    }

    return res.json();
  },

  async getAnalysisHistory() {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/analyzer/history`, {
      headers,
      credentials: 'include'
    });

    if (!res.ok) throw new Error('Failed to fetch analysis history');
    return res.json();
  },

  async getAnalysis(id: string) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/analyzer/${id}`, {
      headers,
      credentials: 'include'
    });

    if (!res.ok) throw new Error('Failed to fetch analysis');
    return res.json();
  }
};
