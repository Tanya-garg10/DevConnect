import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { Code2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signInWithGithub, signOut, user } = useAuth();
  const location = useLocation();

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || user?.email;

  const navLinks = [
    { path: '/', label: '~/home' },
    { path: '/create', label: '~/create' },
    { path: '/communities', label: '~/communities' },
    { path: '/communities/create', label: '~/new-community' }
  ];

  return (
    <nav className="bg-slate-950 border-b border-cyan-900/30 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-mono font-bold text-xl hover:text-cyan-400 transition group">
            <Code2 className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
            <span>Dev<span className="text-cyan-400">Connect</span></span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-sm px-2 py-1 rounded transition duration-200 ${
                  location.pathname === link.path ? 'bg-cyan-700/30 text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user?.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
                className="w-9 h-9 rounded-full ring-2 ring-cyan-400/50"
              />
            )}
            {user ? (
              <>
                <span className="font-mono text-sm text-cyan-300">{displayName}</span>
                <button
                  onClick={signOut}
                  className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-500/50 rounded-lg text-red-300 font-mono text-sm transition"
                >
                  logout
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGithub}
                className="px-4 py-2 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-400/50 rounded-lg text-cyan-300 font-mono text-sm transition"
              >
                sign in
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="text-cyan-400 hover:text-cyan-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav + auth */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-cyan-900/30 bg-slate-900/50">
            <div className="flex flex-col gap-3 items-start px-4">
              {/* Links */}
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 font-mono text-sm rounded w-full transition ${
                    location.pathname === link.path
                      ? 'bg-cyan-700/30 text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth */}
              {user?.user_metadata?.avatar_url && (
                <img src={user.user_metadata.avatar_url} alt="User Avatar" className="w-9 h-9 rounded-full ring-2 ring-cyan-400/50" />
              )}
              {user ? (
                <>
                  <span className="font-mono text-sm text-cyan-300">{displayName}</span>
                  <button
                    onClick={signOut}
                    className="w-full px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-500/50 rounded-lg text-red-300 font-mono text-sm transition"
                  >
                    logout
                  </button>
                </>
              ) : (
                <button
                  onClick={signInWithGithub}
                  className="w-full px-4 py-2 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-400/50 rounded-lg text-cyan-300 font-mono text-sm transition"
                >
                  sign in
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
