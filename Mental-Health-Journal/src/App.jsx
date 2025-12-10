
import React, { useState, useEffect, useCallback } from 'react';
import {createClient} from '@supabase/supabase-js'


// --- Icons (inline SVG) ---
const HomeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const PenToolIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3 3z"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L7.3 19.7l-4.7 1.3 1.3-4.7L18.5 2.5z"/>
  </svg>
);
const SettingsIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 0-.75 1.73v.2a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 0-1.25 1.73v.22a2 2 0 0 0 1.25 1.73l.44.25a2 2 0 0 1 1 1.73v.2a2 2 0 0 0 .75 1.73l.43.25a2 2 0 0 1 1 1.73V22a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 0 .75-1.73v-.2a2 2 0 0 1 1-1.73l.44-.25a2 2 0 0 0 1.25-1.73v-.22a2 2 0 0 0-1.25-1.73l-.44-.25a2 2 0 0 1-1-1.73v-.2a2 2 0 0 0-.75-1.73l-.43-.25a2 2 0 0 1-1-1.73V2a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const SunIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);
const MoonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);
const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const ChevronLeft = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);
const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

// Authication / database

 const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

// Auth helpers (email)
const signIn = async(email,password) =>  {
  const {data, error} = await supabase.auth.signInWithPassword({email,password});
  if(error) throw error;
  return data;
};

const signUp = async (email, password) => {
  const {data, error} = await supabase.auth.signUp({email,password});
  if (error) throw error;
  return data;
};

// Helpers
const formatDate = (ts) => {
  try {
    const date = ts instanceof Date ? ts : new Date(ts);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago'
    });
  } catch { return 'Invalid Date'; }
};

// --- Theme (local) ---
const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-gray-100' : 'text-gray-900';
  const cardColor = isDark ? 'bg-gray-800' : 'bg-gray-50';
  const navColor = isDark ? 'bg-gray-900 shadow-xl shadow-gray-700/50' : 'bg-white shadow-xl shadow-gray-300/50';
  const inputColor = isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600' : 'bg-gray-100 placeholder-gray-500 border-gray-300';
  return { theme, isDark, toggleTheme, bgColor, textColor, cardColor, navColor, inputColor };
};

// --- 3. Hook to manage user authentication state ---
const useSupabaseUser = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // Fetch user on mount
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error) setUser(data?.user || null);
      setLoadingUser(false);
    });

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return { user, loadingUser };
};


// --- Journals Hook ---
export const useSupabaseJournals = () => {
  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoading] = useState(true);
  const [isReady, setReady] = useState(false);
  const [user, setUser] = useState(null);

  // --- Detect existing session (after your login runs) ---
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) setUser(data.session.user);
      setReady(true);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // --- Load user’s journals from Supabase ---
  const loadJournals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
        .from('dbJournals')
        .select('user_id, title, body, time_stamp')
        .eq('user_id', user.id)
        .order('time_stamp', { ascending: false });
    if (error) console.error('Error loading journals:', error);
    else setJournals(data || []);
    setLoading(false);
  }, [user]);

  // Automatically load when logged in
  useEffect(() => {
    if (user) loadJournals();
  }, [user, loadJournals]);

  // --- Add a new journal entry ---
  const addJournal = useCallback(
      async (title, body) => {
        if (!user) return false;
        const now = new Date().toLocaleString('en-US', {timeZone: "America/Chicago"});
        const { error } = await supabase.from('dbJournals').insert({
          user_id: user.id,
          title,
          body,
          time_stamp: now,
        });
        if (error) {
          console.error('Error adding journal:', error);
          return false;
        }
        await loadJournals();
        return true;
      },
      [user, loadJournals]
  );

  // --- Update an existing journal ---
  const updateJournal = useCallback(
      async (id, title, body) => {
        if (!user) return false;
        const now = new Date().toISOString();
        const { error } = await supabase
            .from('dbJournals')
            .update({ title, body, time_stamp: now })
            .eq('id', id)
            .eq('user_id', user.id);
        if (error) {
          console.error('Error updating journal:', error);
          return false;
        }
        await loadJournals();
        return true;
      },
      [user, loadJournals]
  );

  // --- Delete a journal ---
  const deleteJournal = useCallback(
      async (id) => {
        if (!user) return false;
        const { error } = await supabase
            .from('dbJournals')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);
        if (error) {
          console.error('Error deleting journal:', error);
          return false;
        }
        await loadJournals();
        return true;
      },
      [user, loadJournals]
  );

  // --- Realtime sync for updates from other clients ---
  useEffect(() => {
    if (!user) return;
    const channel = supabase
        .channel('journals_changes')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'dbjournals', filter: `user_id=eq.${user.id}` },
            () => loadJournals()
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loadJournals]);

  return {
    isReady,
    user,
    journals,
    loadingJournals,
    addJournal,
    updateJournal,
    deleteJournal,
    refresh: loadJournals,
  };
};

const useDailyAffirmation = () => {
  const [affirmation, setAffirmation] = useState(null);
  const [loadingAffirmation, setLoadingAffirmation] = useState(true);

  useEffect(() => {
    const loadAffirmation = async () => {
      setLoadingAffirmation(true);

      const { data, error } = await supabase
        .from('affirmations')
        .select('id, text');

      if (error) {
        console.error('Error loading affirmations:', error);
        setLoadingAffirmation(false);
        return;
      }

      if (!data || data.length === 0) {
        setLoadingAffirmation(false);
        return;
      }

      // Pick a "random" but stable affirmation for today
      const today = new Date().toLocaleDateString('en-CA',{timeZone: 'America/Chicago',})
      let hash = 0;
      for (let i = 0; i < today.length; i++) {
        hash = (hash * 31 + today.charCodeAt(i)) >>> 0;
      }
      const index = hash % data.length;

      setAffirmation(data[index]);
      setLoadingAffirmation(false);
    };

    loadAffirmation();
  }, []);

  return { affirmation, loadingAffirmation };
};

// --- Screens ---
const LoginPage = ({ setIsLoggedIn, bgColor, textColor, isDark, goToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // simple front-end validation
    if (!email.trim() || !password.trim())  {
      setError('Please enter both email and password.');      
      return;
    }
    try {
      setIsLoading(true);
      await signIn(email.trim(), password.trim());
      setIsLoggedIn(true); // only after a real sign-in succeeds
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false);
   }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-8 ${bgColor} transition-colors duration-300`}>
      <div className="w-full">
        {/* App title / logo placeholder */}
        <div className="text-center mb-6">
          <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${isDark ? 'bg-indigo-600/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
            <BookOpenIcon className="w-7 h-7" />
          </div>
          <h1 className={`mt-3 text-2xl font-extrabold ${textColor}`}>Mental Health Journal</h1>
          <p className={`text-sm opacity-70 ${textColor}`}>Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${textColor}`}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600 text-gray-100' : 'bg-gray-100 placeholder-gray-500 border-gray-300 text-gray-900'}`}
              placeholder="you@example.com"
              aria-invalid={!!error && !email.trim()}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${textColor}`}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-xs font-semibold text-indigo-500 hover:text-indigo-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600 text-gray-100' : 'bg-gray-100 placeholder-gray-500 border-gray-300 text-gray-900'}`}
              placeholder="••••••••"
              aria-invalid={!!error && !password.trim()}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm font-medium bg-red-600/90 text-white">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in…
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

           <p className={`text-xs mt-6 text-center ${textColor} opacity-60`}>
          Don't have an account?{' '}
          <button onClick={goToRegister} className="text-indigo-400 hover:text-indigo-300 font-semibold">Create one</button>
        </p>    
      </div>
    </div>
  );
};

const RegisterPage = ({ setIsLoggedIn, bgColor, textColor, isDark, goToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false); // NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await signUp(email.trim(), password.trim());
      if (error) throw error;
      setSent(true); 
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-8 ${bgColor} transition-colors duration-300`}>
        <div className="w-full text-center">
          <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${isDark ? 'bg-indigo-600/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
            <BookOpenIcon className="w-7 h-7" />
          </div>
          <h1 className={`mt-3 text-2xl font-extrabold ${textColor}`}>Check your email</h1>
          <p className={`mt-2 text-sm ${textColor} opacity-80`}>
            We sent a verification link to <span className="font-semibold">{email}</span>.<br/>
            Click the link to activate your account, then log in.
          </p>
          <button
            onClick={goToLogin}
            className="mt-6 w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center h-full p-8 ${bgColor} transition-colors duration-300`}>
      <div className="w-full">
        <div className="text-center mb-6">
          <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${isDark ? 'bg-indigo-600/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
            <BookOpenIcon className="w-7 h-7" />
          </div>
          <h1 className={`mt-3 text-2xl font-extrabold ${textColor}`}>Create Account</h1>
          <p className={`text-sm opacity-70 ${textColor}`}>Start journaling securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reg-email" className={`block text-sm font-medium mb-1 ${textColor}`}>Email</label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600 text-gray-100' : 'bg-gray-100 placeholder-gray-500 border-gray-300 text-gray-900'}`}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="reg-password" className={`block text-sm font-medium mb-1 ${textColor}`}>Password</label>
              <button type="button" onClick={() => setShowPassword(s => !s)} className="text-xs font-semibold text-indigo-500 hover:text-indigo-400">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600 text-gray-100' : 'bg-gray-100 placeholder-gray-500 border-gray-300 text-gray-900'}`}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="reg-confirm" className={`block text-sm font-medium mb-1 ${textColor}`}>Confirm Password</label>
            <input
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600 text-gray-100' : 'bg-gray-100 placeholder-gray-500 border-gray-300 text-gray-900'}`}
              placeholder="••••••••"
            />
          </div>

          {error && <div className="p-3 rounded-lg text-sm font-medium bg-red-600/90 text-white">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Creating…</>) : 'Create Account'}
          </button>
        </form>

        <p className={`text-xs mt-6 text-center ${textColor} opacity-60`}>
          Already have an account?{' '}
          <button onClick={goToLogin} className="text-indigo-400 hover:text-indigo-300 font-semibold">Log in</button>
        </p>
      </div>
    </div>
  );
};



const ViewJournalPage = ({ journal, setPage, textColor, cardColor, deleteJournal }) => {
  if (!journal) return <div className="p-4"><p className={`${textColor}`}>Error: No entry selected.</p></div>;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => { setIsDeleting(true); const ok = await deleteJournal(journal.id); setIsDeleting(false); ok ? setPage('Home') : setShowDeleteConfirm(false); };
  return (
    <div className="p-4 overflow-y-auto h-full no-scrollbar">
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`p-6 rounded-2xl shadow-2xl w-full max-w-xs ${cardColor} transition-colors duration-300`}>
            <h3 className={`text-xl font-bold mb-3 ${textColor}`}>Confirm Deletion</h3>
            <p className={`text-sm ${textColor} opacity-80 mb-6`}>Are you sure you want to delete this entry? This action cannot be undone.</p>
            <div className="flex justify-between space-x-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="w-1/2 py-2 text-sm font-semibold rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition duration-150" disabled={isDeleting}>Cancel</button>
              <button onClick={handleDelete} className="w-1/2 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 disabled:opacity-50" disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setPage('Home')} className={`flex items-center text-sm font-semibold ${textColor} opacity-80 hover:opacity-100 transition duration-150`}>
          <ChevronLeft className="mr-1 w-5 h-5" /> Back to Entries
        </button>
        <div className="flex space-x-3">
          <button onClick={() => setPage('Edit')} className="flex items-center text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition duration-150">
            <PenToolIcon className="w-4 h-4 mr-1"/> Edit
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center text-sm font-semibold text-red-500 hover:text-red-400 transition duration-150">
            <TrashIcon className="w-4 h-4 mr-1"/> Delete
          </button>
        </div>
      </div>
      <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>{journal.title || 'Untitled Entry'}</h1>
      <p className={`text-sm text-gray-400 mb-6`}>
        Created: {formatDate(journal.time_stamp)}{journal.updatedAt && (<span className="ml-3 italic">(Updated: {formatDate(journal.updatedAt)})</span>)}
      </p>
      <div className={`${cardColor} p-4 rounded-xl shadow-inner min-h-[60%] mb-40`}>
        <p className={`text-base ${textColor} opacity-90 whitespace-pre-wrap`}>{journal.body}</p>
      </div>
    </div>
  );
};

const JournalFormPage = ({ journalToEdit, addJournal, updateJournal, textColor, inputColor, setPage }) => {
  const isEditMode = !!journalToEdit;
  const [title, setTitle] = useState(isEditMode ? (journalToEdit.title || '') : '');
  const [content, setContent] = useState(isEditMode ? (journalToEdit.content || '') : '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const pageTitle = isEditMode ? 'Edit Entry' : 'New Entry';
  const successMessage = isEditMode ? 'Entry updated successfully!' : 'Entry saved successfully!';
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) { setMessage({ type: 'error', text: 'Journal entry cannot be empty.' }); return; }
    setIsSaving(true); setMessage(null);
    let ok;
    if (isEditMode) ok = await updateJournal(journalToEdit.id, title.trim(), content.trim());
    else ok = await addJournal(title.trim(), content.trim());
    setIsSaving(false);
    if (ok) {
      setMessage({ type: 'success', text: successMessage });
      if (!isEditMode) { setTitle(''); setContent(''); }
      setTimeout(() => setPage('Home'), 800);
    } else setMessage({ type: 'error', text: 'Failed to save entry.' });
  };
  return (
    <div className="p-4 overflow-y-auto h-full no-scrollbar">
      <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>{pageTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (Optional)"
          className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${inputColor} ${textColor} text-lg font-medium`} disabled={isSaving} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind today?" rows="15"
          className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none ${inputColor} ${textColor}`} disabled={isSaving}></textarea>
        {message && (<p className={`text-sm font-medium ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</p>)}
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50" disabled={isSaving}>
          {isSaving ? 'Saving....' : (isEditMode ? 'Update Entry' : 'Save Entry')}
        </button>
      </form>
    </div>
  );
};

const HomePage = ({ journals, loadingJournals, cardColor, textColor, setSelectedJournal, setPage, affirmation, loadingAffirmation }) => {
  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      <h1 className={`text-3xl font-bold ${textColor}`}>My Journal Entries</h1>
      {loadingJournals && <p className="text-center text-lg italic text-gray-500">Loading entries...</p>}

      <div className={`${cardColor} p-4 rounded-xl shadow-md`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400 mb-1">
          Daily affirmation
        </p>

        {loadingAffirmation ? (
          <p className={`text-sm ${textColor} opacity-70`}>Loading...</p>
        ) : affirmation ? (
          <p className={`text-base ${textColor} italic`}>
            “{affirmation.text}”
          </p>
        ) : (
          <p className={`text-sm ${textColor} opacity-70`}>
            No affirmations available yet.
          </p>
        )}
      </div>

      {!loadingJournals && journals.length === 0 && (
        <div className="text-center p-8 mt-10 rounded-xl border border-dashed border-gray-500">
          <p className={`text-lg ${textColor} opacity-70`}>You haven't written anything yet. Click the pen icon to start journaling!</p>
        </div>
      )}
      <div className="space-y-4 pb-20">
        {journals.map((journal) => (
          <div key={journal.id} className={`${cardColor} p-4 rounded-xl shadow-lg transition duration-200 hover:shadow-2xl cursor-pointer`}
            onClick={() => { setSelectedJournal(journal); setPage('View'); }}>
            <h2 className={`text-xl font-semibold mb-1 ${textColor}`}>{journal.title || 'Untitled Entry'}</h2>
            <p className={`text-sm text-gray-400 mb-2`}>{formatDate(journal.time_stamp)}</p>
            <p className={`text-base ${textColor} line-clamp-3 opacity-90`}>{journal.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsPage = ({ toggleTheme, isDark, textColor, cardColor, userId }) => {
  return (
    <div className="p-4 space-y-6 overflow-y-auto">
      <h1 className={`text-3xl font-bold ${textColor}`}>Settings</h1>
      <div className={`${cardColor} p-4 rounded-xl shadow-lg space-y-3`}>
        <h2 className={`text-xl font-semibold ${textColor}`}>Theme</h2>
        <div className="flex items-center justify-between">
          <span className={`${textColor} opacity-80`}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <button onClick={toggleTheme} className={`p-2 rounded-full transition duration-200 ${isDark ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200 hover:bg-gray-300'} shadow-md`} aria-label="Toggle theme">
            {isDark ? <SunIcon className="w-6 h-6 text-white" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </div>
      <div className={`${cardColor} p-4 rounded-xl shadow-lg space-y-3`}>
        <h2 className={`text-xl font-semibold ${textColor}`}>Account Info</h2>
        <p className={`text-sm ${textColor} opacity-70 break-all`}>User ID: <span className="font-mono text-xs">{userId || 'N/A'}</span></p>
        <p className={`text-sm ${textColor} opacity-70`}>Status: <span className="text-green-500 font-medium">Local Only</span></p>
      </div>
    </div>
  );
};

const NavBar = ({ currentPage, setPage, navColor }) => {
  const navItems = [
    { name: 'Home', page: 'Home', Icon: HomeIcon },
    { name: 'Write', page: 'Write', Icon: PenToolIcon },
    { name: 'Settings', page: 'Settings', Icon: SettingsIcon },
  ];
  return (
    <nav className={`absolute bottom-0 left-0 right-0 h-16 ${navColor} flex justify-around items-center rounded-t-xl z-10 border-t border-gray-700/50`}>
      {navItems.map(({ name, page, Icon }) => {
        const isActive = currentPage === page;
        const iconColor = isActive ? 'text-indigo-500' : 'text-gray-400 hover:text-indigo-300';
        return (
          <button key={page} onClick={() => setPage(page)} className="flex flex-col items-center justify-center p-2 transition duration-200">
            <Icon className={`w-6 h-6 ${iconColor}`} />
            <span className={`text-xs mt-1 font-medium ${iconColor}`}>{name}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default function App() {
  const { isReady, userId, journals, loadingJournals, addJournal, updateJournal, deleteJournal, login } = useSupabaseJournals();
  const { isDark, toggleTheme, bgColor, textColor, cardColor, navColor, inputColor } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [authPage, setAuthPage] = useState('login');
  const {affirmation, loadingAffrimation} = useDailyAffirmation();

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Initializing…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gray-950' : 'bg-gray-100'}`}>
        <div className={`relative w-full max-w-sm h-[800px] border-8 rounded-[48px] overflow-hidden shadow-2xl transition-colors duration-300 ${isDark ? 'border-gray-800 bg-black' : 'border-gray-300 bg-white'}`}>
          {authPage === 'login' ? (
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              bgColor={bgColor}
              textColor={textColor}
              isDark={isDark}
              goToRegister={() => setAuthPage('register')}
            />
          ) : (
            <RegisterPage
              setIsLoggedIn={setIsLoggedIn}
              bgColor={bgColor}
              textColor={textColor}
              isDark={isDark}
              goToLogin={() => setAuthPage('login')}
            />
          )}
        </div>
      </div>
    );
  }

  const formProps = { addJournal, updateJournal, textColor, inputColor, setPage: setCurrentPage };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage journals={journals} loadingJournals={loadingJournals} cardColor={cardColor} textColor={textColor} setSelectedJournal={setSelectedJournal} setPage={setCurrentPage} affirmation={affirmation} loadingAffrimation= {loadingAffrimation} />;
      case 'Write':
        return <JournalFormPage {...formProps} journalToEdit={null} />;
      case 'Edit':
        if (!selectedJournal) setCurrentPage('Home');
        return <JournalFormPage {...formProps} journalToEdit={selectedJournal} />;
      case 'Settings':
        return <SettingsPage toggleTheme={toggleTheme} isDark={isDark} textColor={textColor} cardColor={cardColor} userId={userId} />;
      case 'View':
        return <ViewJournalPage journal={selectedJournal} setPage={setCurrentPage} textColor={textColor} cardColor={cardColor} deleteJournal={deleteJournal} />;
      default:
        return <HomePage journals={journals} loadingJournals={loadingJournals} cardColor={cardColor} textColor={textColor} setSelectedJournal={setSelectedJournal} setPage={setCurrentPage} />;
    }
  };

  const showNavBar = currentPage === 'Home' || currentPage === 'Settings';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gray-950' : 'bg-gray-100'}`}>
      <div className={`relative w-full max-w-sm h-[800px] border-8 rounded-[48px] overflow-hidden shadow-2xl transition-colors duration-300 ${isDark ? 'border-gray-800 bg-black' : 'border-gray-300 bg-white'}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl z-20 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
        <div className={`flex flex-col h-full pt-6 ${showNavBar ? 'pb-16' : 'pb-0'} ${bgColor} ${textColor} transition-colors duration-300`}>
          <div className="flex-grow overflow-y-auto">
            {renderPage()}
          </div>
        </div>
        {showNavBar && (<NavBar currentPage={currentPage} setPage={setCurrentPage} navColor={navColor} />)}
      </div>
    </div>
  );
}
