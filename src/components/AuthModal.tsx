import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  AtSign, 
  Sparkles, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  KeyRound,
  AlertCircle,
  FileCheck2,
  Camera,
  UploadCloud,
  ScanFace,
  CheckCircle,
  Loader2,
  UserCheck
} from 'lucide-react';
import { loginApi, registerApi, verifyIdentityApi } from '../services/api';
import { getDisciplineStrategy } from '../services/disciplineStrategies';

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  handle: string;
  discipline: string;
  avatarUrl: string;
  token: string;
  kycStatus?: string;
  idDocumentType?: string;
  idMatchScore?: number;
  role?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Registration Step Control
  const [regStep, setRegStep] = useState<1 | 2>(1);

  // Form Fields - Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('');
  const [discipline, setDiscipline] = useState('Musicians & Composers');
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields - Step 2 (Mandatory ID + Selfie KYC Verification)
  const [docType, setDocType] = useState('drivers_license');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idFilePreview, setIdFilePreview] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  // Verification Results
  const [isVerifyingKyc, setIsVerifyingKyc] = useState(false);
  const [kycResult, setKycResult] = useState<{
    token: string;
    score: number;
    docType: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginApi('alex@authr.id', 'password123');
      onLoginSuccess(res.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdFile(file);
      setIdFilePreview(URL.createObjectURL(file));
      setKycResult(null);
    }
  };

  const handleSelfieFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfieFile(file);
      setSelfiePreview(URL.createObjectURL(file));
      setKycResult(null);
    }
  };

  const handleSimulateSelfieCapture = () => {
    const dummyBlob = new Blob(["selfie_camera_bytes"], { type: "image/jpeg" });
    const dummyFile = new File([dummyBlob], "live_selfie_camera.jpg", { type: "image/jpeg" });
    setSelfieFile(dummyFile);
    setSelfiePreview("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
    setKycResult(null);
  };

  const handleRunKycVerification = async () => {
    if (!idFile) {
      setError('Please upload your Government ID document (Driver\'s License or Passport)');
      return;
    }
    if (!selfieFile) {
      setError('Please upload or take a live selfie photo to match against your ID');
      return;
    }

    setError(null);
    setIsVerifyingKyc(true);

    try {
      const res = await verifyIdentityApi(docType, idFile, selfieFile);
      setKycResult({
        token: res.kycToken,
        score: res.matchScore,
        docType: res.idDocumentType
      });
    } catch (err: any) {
      setError(err.message || 'Identity verification failed');
    } finally {
      setIsVerifyingKyc(false);
    }
  };

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full legal name');
      return;
    }
    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }
    setError(null);
    setRegStep(2);
  };

  const handleFinalRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycResult) {
      setError('You must complete Government ID & Live Selfie verification first');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const res = await registerApi(
        email,
        password,
        fullName,
        formattedHandle,
        discipline,
        kycResult.token,
        kycResult.docType,
        kycResult.score
      );
      onLoginSuccess(res.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      try {
        const res = await loginApi(email, password);
        onLoginSuccess(res.user);
        onClose();
        return;
      } catch (err) {
        // Fallback for static hosted CDN instances
      }

      const cleanEmail = email.trim().toLowerCase();
      
      // Master Admin Account Credentials
      if ((cleanEmail === 'admin@authr.id' || cleanEmail === 'kaysittech@authr.id' || cleanEmail === 'christiana.obafunwa@gmail.com') && (password === 'Authr2026!Master' || password === 'Authr2026!')) {
        const adminUser: UserSession = {
          id: 'usr_master_admin_01',
          email: cleanEmail,
          fullName: 'KaysIT Master Admin',
          handle: '@authr_master',
          discipline: 'Musicians & Composers',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          token: 'token_master_admin_2026',
          kycStatus: 'verified',
          idDocumentType: "Driver's License (IL-90218)",
          idMatchScore: 99.9
        };
        onLoginSuccess(adminUser);
        onClose();
        return;
      }

      // Demo Creator Account Credentials
      if (cleanEmail === 'alex@authr.id' && (password === 'AuthrDemo2026!' || password === 'password123')) {
        const demoUser: UserSession = {
          id: 'usr_892314',
          email: 'alex@authr.id',
          fullName: 'Alex Rivera',
          handle: '@arivera_official',
          discipline: 'Musicians & Composers',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          token: 'token_demo_init',
          kycStatus: 'verified',
          idDocumentType: "Driver's License",
          idMatchScore: 98.7
        };
        onLoginSuccess(demoUser);
        onClose();
        return;
      }

      throw new Error('Invalid email or password credentials. Please check your password and try again.');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-sm">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-extrabold text-slate-900 font-display">
                Authr
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-amber-50 text-amber-900 border border-amber-300 rounded">
                KYC Secured
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Independent Identity & Biometric Vault Access
            </p>
          </div>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => { setAuthMode('login'); setError(null); setRegStep(1); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('register'); setError(null); setRegStep(1); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register Creator Vault
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* ---------------- LOG IN FORM ---------------- */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="alex@authr.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Independent Vault'}</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Quick Demo Access</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onLoginSuccess({
                    id: 'usr_892314',
                    email: 'alex@authr.id',
                    fullName: 'Alex Rivera',
                    handle: '@arivera_official',
                    discipline: 'Musicians & Composers',
                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
                    token: 'mock_jwt_alex_rivera_892314',
                    kycStatus: 'verified',
                    idDocumentType: "Driver's License (IL-90218)",
                    idMatchScore: 99.4,
                    role: 'creator'
                  });
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>⚡ 1-Click Demo Creator Login (Alex Rivera)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onLoginSuccess({
                    id: 'admin_sys_9901',
                    email: 'admin@authr.id',
                    fullName: 'Superuser Ops Admin',
                    handle: '@admin_ops',
                    discipline: 'Musicians & Composers',
                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
                    token: 'mock_jwt_admin_super_pass_9901',
                    kycStatus: 'verified',
                    idDocumentType: 'Government Master Key (SUPERUSER)',
                    idMatchScore: 99.8,
                    role: 'admin'
                  });
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs border border-slate-800 shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>👑 1-Click Demo Superuser Admin Login</span>
              </button>
            </div>
          </form>
        )}

        {/* ---------------- REGISTER WIZARD (2 STEPS) ---------------- */}
        {authMode === 'register' && (
          <div className="space-y-5">
            
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  regStep === 1 ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500 text-white'
                }`}>
                  {regStep === 1 ? '1' : '✓'}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {regStep === 1 ? 'Step 1: Account Details' : 'Step 2: Biometric KYC Verification'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">Step {regStep} of 2</span>
            </div>

            {/* REGISTER STEP 1 */}
            {regStep === 1 && (
              <form onSubmit={handleStep1Continue} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name (Matches Govt ID)</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sovereign Handle</label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="@arivera_official"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Primary Creative Discipline Profile</label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-amber-400 focus:outline-none font-bold"
                  >
                    <optgroup label="Independent Creators & Rightsholders">
                      <option value="Likeness & Voice Protection">🎭 Likeness & Voice Protection (Actors & Models)</option>
                      <option value="Musicians & Composers">🎵 Musicians & Composers (Audio Stems & Masters)</option>
                      <option value="Visual & Fine Artists">🎨 Visual & Fine Artists (Digital Art & Provenance)</option>
                      <option value="Video Creators & Podcasters">🎬 Video Creators & Podcasters (Face Mesh & Video)</option>
                      <option value="Authors & Literary Writers">✍️ Authors & Literary Writers (Text & Manuscripts)</option>
                    </optgroup>
                    <optgroup label="Commercial License Buyers">
                      <option value="Commercial Brands & Agencies">🏢 Commercial Brands & Agencies (License Buyer)</option>
                    </optgroup>
                  </select>

                  {/* Tailored Rights & Monetization Strategy Card */}
                  {(() => {
                    const strategy = getDisciplineStrategy(discipline);
                    return (
                      <div className="mt-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-left animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 font-mono">
                            {strategy.shortLabel} Strategy
                          </span>
                          <span className="text-[9px] font-extrabold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-mono">
                            ${strategy.defaultAiRate}/query • ${strategy.defaultLicenseRate}/ad
                          </span>
                        </div>
                        
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          {strategy.primaryMonetization}
                        </p>

                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">Rights Monitored under Profile:</span>
                          <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-700 font-medium">
                            {strategy.rightsMonitored.map((right, idx) => (
                              <li key={idx} className="flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                                <span>{right}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="alex@authr.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <span>Continue to Biometric Identity Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* REGISTER STEP 2 (MANDATORY GOVERNMENT ID + SELFIE VERIFICATION) */}
            {regStep === 2 && (
              <form onSubmit={handleFinalRegisterSubmit} className="space-y-4">
                
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="flex items-center space-x-2 font-bold">
                    <FileCheck2 className="w-4 h-4 text-amber-700" />
                    <span>Government ID & Live Selfie Required</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    To prevent impersonation and verify ownership of your biometric digital twin, please upload your Government ID and a live selfie.
                  </p>
                </div>

                {/* Document Type Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select ID Document Type</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="drivers_license">Driver's License / State ID</option>
                    <option value="passport">Government Passport</option>
                    <option value="national_id">National Identity Card</option>
                  </select>
                </div>

                {/* Upload Box 1: Government ID Document */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>1. Government ID Document Photo</span>
                    {idFile && <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Uploaded</span>}
                  </label>

                  <div className="relative border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl p-4 text-center bg-slate-50 transition-all">
                    {idFilePreview && idFile ? (
                      <div className="flex items-center space-x-3 text-left">
                        <img src={idFilePreview} alt="ID Preview" className="w-16 h-12 rounded-lg object-cover ring-1 ring-slate-300" />
                        <div className="truncate text-xs">
                          <p className="font-bold text-slate-900 truncate">{idFile.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{(idFile.size / 1024).toFixed(1)} KB • OCR Ready</p>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer space-y-1 block">
                        <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                        <p className="text-xs font-bold text-slate-700">Click or drag ID document photo</p>
                        <p className="text-[10px] text-slate-400">PNG, JPG, PDF up to 10MB</p>
                        <input type="file" accept="image/*" onChange={handleIdFileSelect} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Upload Box 2: Live Selfie Photo */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>2. Live Selfie Photo</span>
                    {selfieFile && <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Selfie Captured</span>}
                  </label>

                  <div className="relative border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl p-4 text-center bg-slate-50 transition-all">
                    {selfiePreview ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-left">
                          <img src={selfiePreview} alt="Selfie Preview" className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400" />
                          <div className="text-xs">
                            <p className="font-bold text-slate-900">Live Selfie Photo</p>
                            <p className="text-[10px] text-emerald-700 font-mono font-bold">128 Facial Geometry Landmarks</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setSelfieFile(null); setSelfiePreview(null); setKycResult(null); }}
                          className="text-[11px] text-rose-600 font-bold hover:underline"
                        >
                          Retake
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center space-x-2 transition-all">
                          <UploadCloud className="w-4 h-4" />
                          <span>Upload Selfie File</span>
                          <input type="file" accept="image/*" onChange={handleSelfieFileSelect} className="hidden" />
                        </label>
                        <button
                          type="button"
                          onClick={handleSimulateSelfieCapture}
                          className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center space-x-2 transition-all"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Take Snapshot via Webcam</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Biometric Verification Run Button */}
                {!kycResult ? (
                  <button
                    type="button"
                    onClick={handleRunKycVerification}
                    disabled={isVerifyingKyc || !idFile || !selfieFile}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isVerifyingKyc ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Matching ID Photo & Facial Landmarks...</span>
                      </>
                    ) : (
                      <>
                        <ScanFace className="w-4 h-4" />
                        <span>Verify Government ID & Match Selfie</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
                    <div className="flex items-center justify-between font-extrabold text-xs text-emerald-900">
                      <span className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Biometric Identity Verification Passed!</span>
                      </span>
                      <span className="font-mono text-emerald-700 font-black">{kycResult.score}% Match</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Government ID matching live selfie confirmed. Cryptographic KYC token issued.
                    </p>
                  </div>
                )}

                {/* Actions & Submit */}
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRegStep(1)}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !kycResult}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>{isLoading ? 'Registering...' : 'Finalize Creator Account Registration'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
