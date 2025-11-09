import supabase from '../config/supabase.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.slice(7);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = { id: data.user.id, ...data.user };
    return next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const { data } = await supabase.auth.getUser(token);
      req.user = data?.user || null;
    } else {
      req.user = null;
    }

    return next();
  } catch (err) {
    console.error('Optional auth error:', err);
    return next();
  }
};
