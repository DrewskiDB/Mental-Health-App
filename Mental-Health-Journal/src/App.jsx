
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
  import.meta.env.REACT_APP_SUPABASE_URL,
  import.meta.env.REACT_APP_ANON_KEY,
)

// Helpers
const formatDate = (ts) => {
  try {
    const date = ts instanceof Date ? ts : new Date(ts);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
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

// --- Local Store (no backend) ---
const KEY = 'journal_store_v1';
const loadJournals = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
};
const saveJournals = (arr) => {
  localStorage.setItem(KEY, JSON.stringify(arr));
};

const useLocalJournals = () => {
  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoading] = useState(true);
  const [isReady, setReady] = useState(true);
  const [userId, setUserId] = useState(() => {
    const k = 'journal_user_id';
    let u = localStorage.getItem(k);
    if (!u) { u = (crypto?.randomUUID?.() || String(Math.random())).slice(0, 12); localStorage.setItem(k, u); }
    return u;
  });

  useEffect(() => {
    const data = loadJournals();
    data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setJournals(data);
    setLoading(false);

    const onStorage = (e) => {
      if (e.key === KEY) {
        const d = loadJournals();
        d.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJournals(d);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback(async () => true, []);

  const addJournal = useCallback(async (title, content) => {
    const now = new Date().toISOString();
    const id = (crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
    const next = [{ id, title, content, createdAt: now }, ...journals];
    setJournals(next); saveJournals(next);
    return true;
  }, [journals]);

  const updateJournal = useCallback(async (id, title, content) => {
    const now = new Date().toISOString();
    const next = journals.map(j => j.id === id ? { ...j, title, content, updatedAt: now } : j);
    setJournals(next); saveJournals(next);
    return true;
  }, [journals]);

  const deleteJournal = useCallback(async (id) => {
    const next = journals.filter(j => j.id != id);
    setJournals(next); saveJournals(next);
    return true;
  }, [journals]);

  return { isReady, userId, journals, loadingJournals, addJournal, updateJournal, deleteJournal, login };
};

// --- Screens ---
const LoginPage = ({ login, setIsLoggedIn, bgColor, textColor, isDark }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // simple front-end validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both a username and password.');
      return;
    }

    setIsLoading(true);
    const ok = await login(); // stubbed login from your local store
    if (ok) {
      setIsLoggedIn(true);
    } else {
      setError('Login failed. Please try again.');
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
            <label htmlFor="username" className={`block text-sm font-medium mb-1 ${textColor}`}>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${isDark ? 'bg-gray-700 placeholder-gray-400 border-gray-600 text-gray-100' : 'bg-gray-100 placeholder-gray-500 border-gray-300 text-gray-900'}`}
              placeholder="e.g. johndoe"
              aria-invalid={!!error && !username.trim()}
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
          Your entries are currently saved <span className="font-semibold">locally</span> in this browser.
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
    <div className="p-4 overflow-y-auto h-full">
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
        Created: {formatDate(journal.createdAt)}{journal.updatedAt && (<span className="ml-3 italic">(Updated: {formatDate(journal.updatedAt)})</span>)}
      </p>
      <div className={`${cardColor} p-4 rounded-xl shadow-inner min-h-[60%] mb-40`}>
        <p className={`text-base ${textColor} opacity-90 whitespace-pre-wrap`}>{journal.content}</p>
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
    <div className="p-4 overflow-y-auto h-full">
      <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>{pageTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (Optional)"
          className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${inputColor} ${textColor} text-lg font-medium`} disabled={isSaving} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind today?" rows="15"
          className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none ${inputColor} ${textColor}`} disabled={isSaving}></textarea>
        {message && (<p className={`text-sm font-medium ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</p>)}
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50" disabled={isSaving}>
          {isSaving ? 'Saving...' : (isEditMode ? 'Update Entry' : 'Save Entry')}
        </button>
      </form>
    </div>
  );
};

const HomePage = ({ journals, loadingJournals, cardColor, textColor, setSelectedJournal, setPage }) => {
  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      <h1 className={`text-3xl font-bold ${textColor}`}>My Journal Entries</h1>
      {loadingJournals && <p className="text-center text-lg italic text-gray-500">Loading entries...</p>}
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
            <p className={`text-sm text-gray-400 mb-2`}>{formatDate(journal.createdAt)}</p>
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
  const { isReady, userId, journals, loadingJournals, addJournal, updateJournal, deleteJournal, login } = useLocalJournals();
  const { isDark, toggleTheme, bgColor, textColor, cardColor, navColor, inputColor } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedJournal, setSelectedJournal] = useState(null);

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
          <LoginPage login={login} setIsLoggedIn={setIsLoggedIn} bgColor={bgColor} textColor={textColor} isDark={isDark} />
        </div>
      </div>
    );
  }

  const formProps = { addJournal, updateJournal, textColor, inputColor, setPage: setCurrentPage };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage journals={journals} loadingJournals={loadingJournals} cardColor={cardColor} textColor={textColor} setSelectedJournal={setSelectedJournal} setPage={setCurrentPage} />;
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
