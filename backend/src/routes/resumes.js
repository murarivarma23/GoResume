import express from 'express';
import supabase, { supabaseAdmin } from '../config/supabase.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateUser);

// Use admin client to bypass RLS
const dbClient = supabaseAdmin || supabase;

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await dbClient
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ resumes: data });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await dbClient
      .from('resumes')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json({ resume: data });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, templateId, content } = req.body;

    const { data, error } = await dbClient
      .from('resumes')
      .insert({
        user_id: userId,
        title: title || 'Untitled Resume',
        template_id: templateId || 'modern-professional',
        content: content || {}
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Resume created successfully', resume: data });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, templateId, content, isPublic } = req.body;

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (title !== undefined) updateData.title = title;
    if (templateId !== undefined) updateData.template_id = templateId;
    if (content !== undefined) updateData.content = content;
    if (isPublic !== undefined) updateData.is_public = isPublic;

    const { data, error } = await dbClient
      .from('resumes')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Resume updated successfully', resume: data });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await dbClient
      .from('resumes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
