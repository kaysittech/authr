import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Server, 
  Activity, 
  Users, 
  Scale, 
  DollarSign, 
  LogOut, 
  ExternalLink,
  Clock,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_DETECTION_MATCHES, INITIAL_SETTLEMENT_CLAIMS } from './services/mockData';

export const AdminApp: React.FC = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState('admin@authr.id');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');
  const [matches, setMatches] = useState(INITIAL_DETECTION_MATCHES);
  const [claims, setClaims] = useState(INITIAL_SETTLEMENT_CLAIMS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminAuthenticated(true);
  };

  const handleSimulateScan = () => {
    setToastMsg('Global Crawler Swarm Sweep Dispatched Across 1,420 Nodes!');
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
      
      {/* Superuser Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Subdomain Badge */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-extrabold tracking-tight text-white font-display">
                    Authr <span className="text-amber-400">Admin Ops</span>
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-md font-mono">
                    admin.authr.id
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  Superuser Network Clearinghouse & Node Controller
                </p>
              </div>
            </div>

            {/* Subdomain Switcher & Auth State */}
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <span>Switch to Creator App (app.authr.id)</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>

              {isAdminAuthenticated && (
                <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-white block">Superuser Ops</span>
                    <span className="text-[10px] text-slate-400 font-mono">admin@authr.id</span>
                  </div>

                  <button
                    onClick={() => setIsAdminAuthenticated(false)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 transition-all"
                    title="Lock Admin Session"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!isAdminAuthenticated ? (
          /* Dedicated Admin Login Gateway */
          <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">Superuser Admin Security Gate</h2>
              <p className="text-xs text-slate-500 font-mono">Restricted access portal: admin.authr.id</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Admin Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Master Access Key</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Authenticate Admin Session</span>
              </button>
            </form>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono text-center">
              ✓ Hardware Key YubiKey 2FA Verified • SSL TLS 1.3 Active
            </div>
          </div>
        ) : (
          /* Full Interactive Admin Operations Panel */
          <AdminPanel
            matches={matches}
            claims={claims}
            onSimulateScan={handleSimulateScan}
          />
        )}

      </main>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl font-bold text-xs flex items-center space-x-3 border border-slate-700 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  );
};
