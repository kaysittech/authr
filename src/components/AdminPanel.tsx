import React, { useState, useEffect } from 'react';
import { WebServicesDashboard } from './WebServicesDashboard';
import { 
  ShieldCheck, 
  Users, 
  Radar, 
  DollarSign, 
  Activity, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  SlidersHorizontal, 
  Filter, 
  Eye, 
  UserCheck, 
  FileText, 
  Scale, 
  RefreshCw, 
  Trash2, 
  Sparkles,
  Server,
  Zap,
  Globe,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Edit3,
  Plus,
  RotateCcw,
  Quote,
  X,
  BookOpen,
  Fingerprint,
  Radio,
  Briefcase,
  KeyRound,
  Copy,
  Construction
} from 'lucide-react';
import { DetectionMatch, SettlementClaim, CustomerReview, PricingPlan, TrialConfig, UserAccount, HeroStatRow, ManagedPage, ManagedPageSection, CareerOpenRole } from '../types';
import { INITIAL_TESTIMONIALS, INITIAL_PRICING_PLANS, INITIAL_TRIAL_CONFIG, INITIAL_USERS, INITIAL_HERO_STAT_ROWS, INITIAL_MANAGED_PAGES, INITIAL_CAREER_ROLES, mergePagesWithDefaults } from '../services/mockData';
import { Article, BLOG_ARTICLES } from './BlogView';
import { 
  getManagedPagesFromFirestore, 
  saveManagedPageToFirestore,
  getCareerRolesFromFirestore,
  saveCareerRoleToFirestore,
  deleteCareerRoleFromFirestore,
  getHeroStatsFromFirestore,
  saveHeroStatToFirestore,
  getCustomerReviewsFromFirestore,
  saveCustomerReviewToFirestore,
  deleteCustomerReviewFromFirestore,
  getPricingPlansFromFirestore,
  savePricingPlanToFirestore,
  getTrialConfigFromFirestore,
  saveTrialConfigToFirestore,
  getBlogArticlesFromFirestore,
  saveBlogArticleToFirestore,
  deleteBlogArticleFromFirestore,
  getUsersFromFirestore,
  saveUserToFirestore,
  deleteUserFromFirestore,
  getRegistrationConfigFromFirestore,
  saveRegistrationConfigToFirestore,
  RegistrationConfig,
  DEFAULT_REGISTRATION_CONFIG
} from '../firebase';

interface AdminPanelProps {
  matches: DetectionMatch[];
  claims: SettlementClaim[];
  onResolveMatch?: (id: string, action?: 'approve' | 'reject') => void;
  onSimulateScan?: () => void;
  onSwitchDemoUser?: (userSession: any) => void;
  activeAdminTab?: string;
  setActiveAdminTab?: (tab: any) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  matches,
  claims,
  onResolveMatch = () => {},
  onSimulateScan = () => {},
  onSwitchDemoUser,
  activeAdminTab: propsActiveAdminTab,
  setActiveAdminTab: propsSetActiveAdminTab
}) => {
  const [internalAdminTab, setInternalAdminTab] = useState<'overview' | 'pages' | 'pricing' | 'users' | 'matches' | 'system' | 'webservices' | 'audit' | 'reviews' | 'blog_posts'>('overview');
  
  const activeAdminTab = propsActiveAdminTab || internalAdminTab;
  const setActiveAdminTab = propsSetActiveAdminTab || setInternalAdminTab;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKycFilter, setSelectedKycFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Registration & Invite-Only Config State
  const [regConfig, setRegConfig] = useState<RegistrationConfig>(DEFAULT_REGISTRATION_CONFIG);
  const [newInviteCode, setNewInviteCode] = useState('');

  // Sync state with Firebase Firestore on mount
  useEffect(() => {
    getManagedPagesFromFirestore().then(pages => setManagedPagesList(mergePagesWithDefaults(pages)));
    getCareerRolesFromFirestore().then(roles => setCareerRolesList(roles));
    getHeroStatsFromFirestore().then(stats => setAdminHeroStats(stats));
    getCustomerReviewsFromFirestore().then(revs => setTestimonialsList(revs));
    getPricingPlansFromFirestore().then(plans => setAdminPricingPlans(plans));
    getTrialConfigFromFirestore().then(config => setAdminTrialConfig(config));
    getBlogArticlesFromFirestore().then(arts => setArticlesList(arts));
    getUsersFromFirestore().then(users => setUsersList(users));
    getRegistrationConfigFromFirestore().then(config => setRegConfig(config));
  }, []);

  const handleToggleInviteOnly = async () => {
    const updated = { ...regConfig, inviteOnlyEnabled: !regConfig.inviteOnlyEnabled };
    setRegConfig(updated);
    await saveRegistrationConfigToFirestore(updated);
    showToast(updated.inviteOnlyEnabled ? 'Invite-Only Registration Mode Enabled!' : 'Open Public Registration Enabled!');
  };

  const handleToggleUnderConstruction = async () => {
    const isCurrentlyOn = Boolean(regConfig.underConstructionMode);
    const updated = { ...regConfig, underConstructionMode: !isCurrentlyOn };
    setRegConfig(updated);
    localStorage.setItem('rg_under_construction_mode', JSON.stringify(updated.underConstructionMode));
    await saveRegistrationConfigToFirestore(updated);
    window.dispatchEvent(new Event('rg_site_status_updated'));
    showToast(updated.underConstructionMode ? '🚧 Site placed under Construction Mode! Public access restricted to Google Sign-In.' : '🟢 Site restored to Normal Live Mode!');
  };

  const handleAddInviteCode = async () => {
    const clean = newInviteCode.trim().toUpperCase();
    if (!clean) return;
    if (regConfig.validInviteCodes.some(c => c.toUpperCase() === clean)) {
      showToast('Invite code already exists!');
      return;
    }
    const updated = {
      ...regConfig,
      validInviteCodes: [...regConfig.validInviteCodes, clean]
    };
    setRegConfig(updated);
    setNewInviteCode('');
    await saveRegistrationConfigToFirestore(updated);
    showToast(`Added invite code: ${clean}`);
  };

  const handleGenerateRandomCode = async () => {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedCode = `AUTHR-${randomSuffix}-VIP`;
    const updated = {
      ...regConfig,
      validInviteCodes: [...regConfig.validInviteCodes, generatedCode]
    };
    setRegConfig(updated);
    await saveRegistrationConfigToFirestore(updated);
    showToast(`Generated VIP Code: ${generatedCode}`);
  };

  const handleDeleteInviteCode = async (codeToDelete: string) => {
    const updated = {
      ...regConfig,
      validInviteCodes: regConfig.validInviteCodes.filter(c => c !== codeToDelete)
    };
    setRegConfig(updated);
    await saveRegistrationConfigToFirestore(updated);
    showToast(`Deleted invite code: ${codeToDelete}`);
  };

  // Managed Page Content (CMS) State
  const [managedPagesList, setManagedPagesList] = useState<ManagedPage[]>(() => {
    const saved = localStorage.getItem('rg_managed_pages');
    if (saved) {
      try {
        const parsed: ManagedPage[] = JSON.parse(saved);
        return mergePagesWithDefaults(parsed);
      } catch (e) {}
    }
    return INITIAL_MANAGED_PAGES;
  });

  const [editingPageModal, setEditingPageModal] = useState<ManagedPage | null>(null);
  const [previewPageModal, setPreviewPageModal] = useState<ManagedPage | null>(null);
  const [pageCategoryFilter, setPageCategoryFilter] = useState<string>('all');

  const saveManagedPagesList = (newList: ManagedPage[]) => {
    setManagedPagesList(newList);
    localStorage.setItem('rg_managed_pages', JSON.stringify(newList));
    newList.forEach(p => saveManagedPageToFirestore(p));
    window.dispatchEvent(new Event('rg_page_content_updated'));
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPageModal) return;
    if (!editingPageModal.title.trim() || !editingPageModal.summary.trim()) {
      alert('Please provide a page title and summary introduction');
      return;
    }

    const updatedPage: ManagedPage = {
      ...editingPageModal,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    const updatedList = managedPagesList.map(p => p.id === updatedPage.id ? updatedPage : p);
    saveManagedPagesList(updatedList);
    saveManagedPageToFirestore(updatedPage);
    setEditingPageModal(null);
    showToast(`Page "${updatedPage.title}" text updated successfully!`);
  };

  // Career Open Roles Management State
  const [careerRolesList, setCareerRolesList] = useState<CareerOpenRole[]>(() => {
    const saved = localStorage.getItem('rg_career_roles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_CAREER_ROLES;
  });

  const [editingCareerRoleModal, setEditingCareerRoleModal] = useState<CareerOpenRole | null>(null);

  const saveCareerRolesList = (newList: CareerOpenRole[]) => {
    setCareerRolesList(newList);
    localStorage.setItem('rg_career_roles', JSON.stringify(newList));
    newList.forEach(r => saveCareerRoleToFirestore(r));
    window.dispatchEvent(new Event('rg_career_roles_updated'));
  };

  const handleSaveCareerRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareerRoleModal) return;
    if (!editingCareerRoleModal.title.trim() || !editingCareerRoleModal.desc.trim()) {
      alert('Please fill out the role title and description.');
      return;
    }

    const exists = careerRolesList.some(r => r.id === editingCareerRoleModal.id);
    let updated: CareerOpenRole[];
    if (exists) {
      updated = careerRolesList.map(r => r.id === editingCareerRoleModal.id ? editingCareerRoleModal : r);
    } else {
      updated = [...careerRolesList, editingCareerRoleModal];
    }

    saveCareerRolesList(updated);
    saveCareerRoleToFirestore(editingCareerRoleModal);
    setEditingCareerRoleModal(null);
    showToast(exists ? `Updated open role "${editingCareerRoleModal.title}"` : `Added new open role "${editingCareerRoleModal.title}"`);
  };

  const handleDeleteCareerRole = (id: string) => {
    deleteCareerRoleFromFirestore(id);
    const updated = careerRolesList.filter(r => r.id !== id);
    saveCareerRolesList(updated);
    showToast('Career open role deleted successfully.');
  };

  // Customer Reviews State
  const [testimonialsList, setTestimonialsList] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('rg_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TESTIMONIALS;
  });

  const [editingReviewModal, setEditingReviewModal] = useState<CustomerReview | null>(null);

  const saveTestimonialsList = (newList: CustomerReview[]) => {
    setTestimonialsList(newList);
    localStorage.setItem('rg_testimonials', JSON.stringify(newList));
    newList.forEach(rev => saveCustomerReviewToFirestore(rev));
    window.dispatchEvent(new Event('rg_testimonials_updated'));
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReviewModal) return;
    if (!editingReviewModal.author.trim() || !editingReviewModal.quote.trim()) {
      alert('Please provide an author name and review quote');
      return;
    }

    const exists = testimonialsList.some(r => r.id === editingReviewModal.id);
    let updated: CustomerReview[];
    if (exists) {
      updated = testimonialsList.map(r => r.id === editingReviewModal.id ? editingReviewModal : r);
    } else {
      updated = [...testimonialsList, editingReviewModal];
    }
    saveTestimonialsList(updated);
    saveCustomerReviewToFirestore(editingReviewModal);
    setEditingReviewModal(null);
    showToast(exists ? `Updated review for "${editingReviewModal.author}"` : `Added new review for "${editingReviewModal.author}"`);
  };

  const handleDeleteReview = (id: string) => {
    deleteCustomerReviewFromFirestore(id);
    const updated = testimonialsList.filter(r => r.id !== id);
    saveTestimonialsList(updated);
    showToast('Review deleted successfully');
  };

  // Blog & Articles Management State
  const [articlesList, setArticlesList] = useState<Article[]>(() => {
    const saved = localStorage.getItem('rg_blog_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return BLOG_ARTICLES;
  });

  const [editingArticleModal, setEditingArticleModal] = useState<Article | null>(null);

  const saveArticlesList = (newList: Article[]) => {
    setArticlesList(newList);
    localStorage.setItem('rg_blog_articles', JSON.stringify(newList));
    newList.forEach(art => saveBlogArticleToFirestore(art));
    window.dispatchEvent(new Event('rg_blog_articles_updated'));
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticleModal) return;
    if (!editingArticleModal.title.trim() || !editingArticleModal.excerpt.trim()) {
      alert('Please provide an article title and excerpt');
      return;
    }

    const exists = articlesList.some(a => a.id === editingArticleModal.id);
    let updated: Article[];
    if (exists) {
      updated = articlesList.map(a => a.id === editingArticleModal.id ? editingArticleModal : a);
    } else {
      updated = [editingArticleModal, ...articlesList];
    }
    saveArticlesList(updated);
    saveBlogArticleToFirestore(editingArticleModal);
    setEditingArticleModal(null);
    showToast(exists ? `Updated article "${editingArticleModal.title}"` : `Published new article "${editingArticleModal.title}"`);
  };

  const handleDeleteArticle = (id: string) => {
    deleteBlogArticleFromFirestore(id);
    const updated = articlesList.filter(a => a.id !== id);
    saveArticlesList(updated);
    showToast('Article deleted successfully');
  };

  // Subscription Plans & 30-Day Trial Manager State
  const [adminPricingPlans, setAdminPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('rg_pricing_plans');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_PRICING_PLANS;
  });

  const [adminTrialConfig, setAdminTrialConfig] = useState<TrialConfig>(() => {
    const saved = localStorage.getItem('rg_trial_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TRIAL_CONFIG;
  });

  const [editingPlanModal, setEditingPlanModal] = useState<PricingPlan | null>(null);

  const savePricingData = (plans: PricingPlan[], config: TrialConfig) => {
    setAdminPricingPlans(plans);
    setAdminTrialConfig(config);
    localStorage.setItem('rg_pricing_plans', JSON.stringify(plans));
    localStorage.setItem('rg_trial_config', JSON.stringify(config));
    plans.forEach(p => savePricingPlanToFirestore(p));
    saveTrialConfigToFirestore(config);
    window.dispatchEvent(new Event('rg_pricing_updated'));
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlanModal) return;
    if (!editingPlanModal.name.trim()) {
      alert('Please enter a plan name');
      return;
    }

    const exists = adminPricingPlans.some(p => p.id === editingPlanModal.id);
    let updatedPlans: PricingPlan[];
    if (exists) {
      updatedPlans = adminPricingPlans.map(p => p.id === editingPlanModal.id ? editingPlanModal : p);
    } else {
      updatedPlans = [...adminPricingPlans, editingPlanModal];
    }
    savePricingData(updatedPlans, adminTrialConfig);
    savePricingPlanToFirestore(editingPlanModal);
    setEditingPlanModal(null);
    showToast(exists ? `Updated plan "${editingPlanModal.name}"` : `Created new plan "${editingPlanModal.name}"`);
  };

  const handleDeletePlan = (id: string) => {
    const updated = adminPricingPlans.filter(p => p.id !== id);
    savePricingData(updated, adminTrialConfig);
    showToast('Plan deleted successfully');
  };

  const handleSaveTrialConfig = (e: React.FormEvent) => {
    e.preventDefault();
    savePricingData(adminPricingPlans, adminTrialConfig);
    saveTrialConfigToFirestore(adminTrialConfig);
    showToast('30-Day Free Trial & Header settings saved');
  };

  // Hero Stat Cards & Badge Metrics State
  const [adminHeroStats, setAdminHeroStats] = useState<HeroStatRow[]>(() => {
    const saved = localStorage.getItem('rg_hero_stat_rows');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_HERO_STAT_ROWS;
  });

  const saveHeroStats = (newList: HeroStatRow[]) => {
    setAdminHeroStats(newList);
    localStorage.setItem('rg_hero_stat_rows', JSON.stringify(newList));
    newList.forEach(stat => saveHeroStatToFirestore(stat));
    window.dispatchEvent(new Event('rg_hero_stats_updated'));
  };

  const handleSaveHeroStats = () => {
    saveHeroStats(adminHeroStats);
    showToast('Hero Stat Cards & Badge Metrics saved successfully');
  };

  const handleAddHeroStat = () => {
    const newStat: HeroStatRow = {
      id: `stat_${Date.now()}`,
      label: 'New Protection Metric',
      value: '100% Verified',
      iconType: 'shield'
    };
    const updated = [...adminHeroStats, newStat];
    saveHeroStats(updated);
    saveHeroStatToFirestore(newStat);
    showToast('Added new Hero Stat Card');
  };

  const handleDeleteHeroStat = (id: string) => {
    const updated = adminHeroStats.filter(s => s.id !== id);
    saveHeroStats(updated);
    showToast('Deleted Hero Stat Card');
  };

  // Admin Pricing & Commission Take-Rate State
  const [platformTakeRate, setPlatformTakeRate] = useState<number>(15.0);
  const [singleModuleFee, setSingleModuleFee] = useState<number>(29.00);
  const [allAccessFee, setAllAccessFee] = useState<number>(79.00);
  const [gracePeriodHours, setGracePeriodHours] = useState<number>(48);

  // Per-Discipline Benchmark Floor Rates State
  const [disciplineRates, setDisciplineRates] = useState({
    music: { name: 'Musicians & Composers', queryRate: 0.08, adRate: 250.00, status: 'Active' },
    visual: { name: 'Visual & Fine Artists', queryRate: 0.15, adRate: 350.00, status: 'Active' },
    video: { name: 'Video Creators & Podcasters', queryRate: 0.12, adRate: 450.00, status: 'Active' },
    literary: { name: 'Authors & Literary Writers', queryRate: 0.05, adRate: 500.00, status: 'Active' }
  });
  
  // Inspection Modal State
  const [selectedUserDocModal, setSelectedUserDocModal] = useState<any | null>(null);

  // User Management State with localStorage persistence
  const [usersList, setUsersList] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('rg_admin_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USERS;
  });

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [editingUserModal, setEditingUserModal] = useState<UserAccount | null>(null);

  const saveUsersList = (newList: UserAccount[]) => {
    setUsersList(newList);
    localStorage.setItem('rg_admin_users', JSON.stringify(newList));
    newList.forEach(u => saveUserToFirestore(u));
    window.dispatchEvent(new Event('rg_users_updated'));
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserModal) return;
    if (!editingUserModal.fullName.trim() || !editingUserModal.email.trim()) {
      alert('Please enter user full name and email address');
      return;
    }

    const exists = usersList.some(u => u.id === editingUserModal.id);
    let updated: UserAccount[];
    if (exists) {
      updated = usersList.map(u => u.id === editingUserModal.id ? editingUserModal : u);
    } else {
      updated = [editingUserModal, ...usersList];
    }
    saveUsersList(updated);
    saveUserToFirestore(editingUserModal);
    setEditingUserModal(null);
    showToast(exists ? `Updated user "${editingUserModal.fullName}"` : `Added new user "${editingUserModal.fullName}"`);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${name}"?`)) return;
    deleteUserFromFirestore(id);
    const updated = usersList.filter(u => u.id !== id);
    saveUsersList(updated);
    showToast(`User "${name}" has been deleted.`);
  };

  const handleApproveKyc = (userId: string) => {
    const updated = usersList.map(u => u.id === userId ? { ...u, kycStatus: 'verified' as const, idMatchScore: 99.4 } : u);
    saveUsersList(updated);
    showToast(`KYC Verification manually approved for User ID: ${userId}`);
  };

  const handleToggleSuspendUser = (userId: string) => {
    const targetUser = usersList.find(u => u.id === userId);
    if (!targetUser) return;
    const newStatus: 'active' | 'suspended' = targetUser.accountStatus === 'suspended' ? 'active' : 'suspended';
    const updated = usersList.map(u => u.id === userId ? { ...u, accountStatus: newStatus } : u);
    saveUsersList(updated);
    showToast(`Account status for ${targetUser.fullName} set to ${newStatus.toUpperCase()}`);
  };

  const handleResetUsers = () => {
    saveUsersList(INITIAL_USERS);
    showToast('User directory reset to default initial accounts');
  };

  const filteredUsers = usersList.filter(u => {
    const matchesQuery = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKyc = selectedKycFilter === 'all' || u.kycStatus === selectedKycFilter;
    const matchesStatus = selectedStatusFilter === 'all' || u.accountStatus === selectedStatusFilter;
    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesQuery && matchesKyc && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Admin Panel Hero Header - CLEAN BLUE & WHITE DESIGN */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden text-slate-900">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0144e4] border border-blue-200/60 rounded-full flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Operations Portal
              </span>
              <span className="text-xs text-slate-400 font-medium">Node #SW-ADMIN-PROD-01 • Mode: Superuser</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-display">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
              Overview of system telemetry, creator vaults, content CMS, pricing plans, and security compliance.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <button
              onClick={() => { onSimulateScan(); showToast('Global Crawler Swarm Sweep Dispatched Across 1,420 Nodes!'); }}
              className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4 text-white" />
              <span>Trigger Global Crawler Sweep</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Creator Vaults</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">8,942</div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">✓ 99.2% KYC Verified</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Volume Cleared</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">$1,248,920</div>
            <p className="text-xs text-slate-500 mt-1">Platform Fee (15%): $187,338</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Crawler Swarms</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <Radar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">1,420 Nodes</div>
            <p className="text-xs text-blue-600 font-semibold mt-1">● 0.04ms Latency Feed</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">BIPA & C2PA Compliance</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0144e4] border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900">100% Compliant</div>
            <p className="text-xs text-slate-500 mt-1">Zero Security Failures</p>
          </div>
        </div>
      </div>


      {/* ---------------- ADMIN TAB 1: OVERVIEW & SYSTEM OPS ---------------- */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Admin Demo Account Selector Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0144e4] flex items-center justify-center font-bold border border-blue-100">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Admin Demo Accounts & Creator Simulator</h3>
                  <p className="text-xs text-slate-500">Click any creator account to log in as that user and test their vault, registered works, and telemetry.</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[#0144e4] border border-blue-200/60 w-fit">
                SITE ADMIN ACCESS ONLY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {usersList.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    if (onSwitchDemoUser) {
                      onSwitchDemoUser({
                        id: u.id,
                        email: u.email,
                        fullName: u.fullName,
                        handle: u.handle,
                        discipline: u.discipline,
                        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                        token: `jwt_demo_switch_${u.id}`,
                        kycStatus: u.kycStatus,
                        idDocumentType: u.idDocumentType,
                        idMatchScore: u.idMatchScore,
                        role: 'creator'
                      });
                      showToast(`Switched session to Demo Creator: ${u.fullName}`);
                    }
                  }}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center space-x-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0144e4] text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
                    {u.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#0144e4] truncate">{u.fullName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{u.discipline}</div>
                    <div className="text-[10px] text-[#0144e4] font-bold mt-0.5">⚡ Click to Test Vault</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Clearinghouse Volume & Settlement Flow</h3>
                  <p className="text-xs text-slate-500">Real-time breakdown of automated DMCA licensing settlements across disciplines.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
                  98.4% Resolution Rate
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Visual Art Settlements</span>
                  <span className="text-lg font-extrabold text-slate-900">$482,100</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Voice & Acoustic Licensing</span>
                  <span className="text-lg font-extrabold text-slate-900">$390,450</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Music Master Stems</span>
                  <span className="text-lg font-extrabold text-slate-900">$376,370</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Superuser System Controls</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Node Status: HEALTHY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <button
                    onClick={() => showToast('Triggered full clearinghouse re-index sweep!')}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-blue-50/60 text-xs font-bold text-slate-700 hover:text-[#0144e4] border border-slate-200 hover:border-blue-300 shadow-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#0144e4]" />
                    <span>Flush Redis Cache</span>
                  </button>
                  <button
                    onClick={() => showToast('Master Cryptographic C2PA Keys Rotated Successfully!')}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-blue-50/60 text-xs font-bold text-slate-700 hover:text-[#0144e4] border border-slate-200 hover:border-blue-300 shadow-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#0144e4]" />
                    <span>Rotate C2PA Keys</span>
                  </button>
                  <button
                    onClick={() => showToast('Dispatched BIPA Statutory Compliance Audit across 8,942 accounts!')}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-blue-50/60 text-xs font-bold text-slate-700 hover:text-[#0144e4] border border-slate-200 hover:border-blue-300 shadow-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0144e4]" />
                    <span>Audit BIPA Logs</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrape Daemon & Crawler Cluster Controls */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 text-slate-900 space-y-4 shadow-xs">
              <div className="flex flex-col justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center space-x-2">
                    <Radar className="w-5 h-5 text-[#0144e4]" />
                    <h3 className="text-base font-extrabold text-slate-900">Background Scrape Controls</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Configures automated cron scrape interval for 1,420 distributed crawler nodes.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    ● Daemon Active (6 Hours)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => showToast('Scrape Daemon frequency set to Every 1 Hour')}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/40 text-xs font-bold text-slate-700 border border-slate-200 hover:border-blue-300 text-left space-y-1 transition-all"
                >
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Ultra High Frequency</span>
                  <span className="text-sm font-extrabold block text-slate-900">Every 1 Hour</span>
                  <span className="text-[10px] text-slate-500 block font-normal">High System Bandwidth</span>
                </button>

                <button
                  onClick={() => showToast('Scrape Daemon frequency set to Every 6 Hours (Default)')}
                  className="p-3 rounded-xl bg-[#0144e4] text-white border border-[#0144e4] text-left space-y-1 font-bold shadow-xs transition-all"
                >
                  <span className="text-[10px] text-blue-100 uppercase font-semibold block">Recommended (Active)</span>
                  <span className="text-sm font-extrabold block">Every 6 Hours</span>
                  <span className="text-[10px] text-blue-100 block font-normal">Balanced Node Performance</span>
                </button>

                <button
                  onClick={() => showToast('Scrape Daemon frequency set to Every 12 Hours')}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/40 text-xs font-bold text-slate-700 border border-slate-200 hover:border-blue-300 text-left space-y-1 transition-all"
                >
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Standard Frequency</span>
                  <span className="text-sm font-extrabold block text-slate-900">Every 12 Hours</span>
                  <span className="text-[10px] text-slate-500 block font-normal">Eco Mode Crawl</span>
                </button>

                <button
                  onClick={() => {
                    onSimulateScan();
                    showToast('Emergency Swarm Scrape Job Dispatched across 1,420 Nodes!');
                  }}
                  className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0144e4] border border-blue-200 text-left space-y-1 shadow-xs transition-all"
                >
                  <span className="text-[10px] text-[#0144e4] uppercase font-semibold block">Emergency Trigger</span>
                  <span className="text-sm font-extrabold block flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-[#0144e4]" />
                    <span>Run Full Sweep</span>
                  </span>
                  <span className="text-[10px] text-blue-700 block font-normal">Immediate Redis Job Queue</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Platform Health & Swarm Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">PostgreSQL Main DB:</span>
                <span className="text-emerald-700 font-bold">● Connected (1.2ms)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">Faiss Vector Index:</span>
                <span className="text-emerald-700 font-bold">● 4.2M Vectors</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">C2PA Signature Engine:</span>
                <span className="text-emerald-700 font-bold">● Active (HSM-v2)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">BIPA Verification Node:</span>
                <span className="text-emerald-700 font-bold">● Operational</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB: PAGE CONTENT MANAGEMENT (CMS) ---------------- */}
      {activeAdminTab === 'pages' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-extrabold text-slate-900">Page Content & Text CMS</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Manage and customize page titles, subtitles, summary intros, and body text sections for all 18 public, feature, and legal pages.
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 font-mono text-xs">
            {[
              { id: 'all', label: `All Pages (${managedPagesList.length})` },
              { id: 'COMPANY', label: `Company (${managedPagesList.filter(p => p.category.includes('COMPANY') || p.category.includes('ABOUT') || p.category.includes('BLOG')).length})` },
              { id: 'FEATURES', label: `Features (${managedPagesList.filter(p => p.category.includes('FEATURES')).length})` },
              { id: 'LEGAL & SECURITY', label: `Legal & Security (${managedPagesList.filter(p => p.category.includes('LEGAL') || p.category.includes('COMPLIANCE')).length})` },
              { id: 'HOME & LANDING', label: `Home & Landing (${managedPagesList.filter(p => p.category === 'HOME & LANDING').length})` },
              { id: 'PRICING', label: `Pricing (${managedPagesList.filter(p => p.category.includes('PRICING')).length})` }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setPageCategoryFilter(filter.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                  pageCategoryFilter === filter.id
                    ? 'bg-[#0144e4] text-white font-black shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {managedPagesList
              .filter(p => {
                if (pageCategoryFilter === 'all') return true;
                if (pageCategoryFilter === 'COMPANY') return p.category.includes('COMPANY') || p.category.includes('ABOUT') || p.category.includes('BLOG');
                if (pageCategoryFilter === 'FEATURES') return p.category.includes('FEATURES');
                if (pageCategoryFilter === 'LEGAL & SECURITY') return p.category.includes('LEGAL') || p.category.includes('COMPLIANCE');
                if (pageCategoryFilter === 'PRICING') return p.category.includes('PRICING');
                return p.category === pageCategoryFilter;
              })
              .map((page) => (
                <div key={page.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase ${
                        ['HOME & LANDING', 'PRICING MENU', 'BLOG MENU'].includes(page.category)
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : page.category.includes('FEATURES')
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : page.category.includes('ABOUT')
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}>
                        {page.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-medium">
                        {page.sections.length} Sections
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 font-display line-clamp-1">{page.title}</h3>
                      <p className="text-[11px] font-mono text-indigo-600 font-bold mt-0.5">{page.badge}</p>
                    </div>

                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      {page.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewPageModal(page)}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => setEditingPageModal(JSON.parse(JSON.stringify(page)))}
                        className="px-3 py-1.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-xs flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Text</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Section: Careers Open Roles Manager */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Briefcase className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Careers Page Open Roles ({careerRolesList.length})</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Add, edit, or remove job listings displayed on the public Careers page.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setEditingCareerRoleModal({
                    id: `job_${Date.now()}`,
                    title: '',
                    dept: 'Security & Core Infrastructure',
                    location: 'Remote',
                    type: 'Full-Time',
                    desc: ''
                  })}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xs flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Add Open Role</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {careerRolesList.map((job) => (
                <div key={job.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-indigo-600">{job.dept}</span>
                      <span className="text-slate-500 font-bold">{job.location} • {job.type}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-display">{job.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{job.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleDeleteCareerRole(job.id)}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingCareerRoleModal({ ...job })}
                      className="px-3 py-1.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-white" />
                      <span>Edit Role</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB: PLANS, PRICING & HERO METRICS MANAGER ---------------- */}
      {activeAdminTab === 'pricing' && (
        <div className="space-y-6 animate-fadeIn">

          {/* Section 0: Hero Graphic Stat Cards & Badge Metrics Manager */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-blue-50 text-[#0144e4] border border-blue-200">
                  <Fingerprint className="w-5 h-5 text-[#0144e4]" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Hero Graphic Stat Cards & Metric Badges ({adminHeroStats.length})</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Edit the name/label, values, numbers, and icons rendered in the public hero mockup card (e.g. Facial Geometry Vector, Acoustic Voice Spectrum, Royalties Cleared).</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddHeroStat}
                  className="px-3.5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add Metric Card</span>
                </button>

                <button
                  onClick={handleSaveHeroStats}
                  className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Save Stat Cards</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {adminHeroStats.map((stat, idx) => (
                <div key={stat.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">Card #{idx + 1}</span>
                    <button
                      onClick={() => handleDeleteHeroStat(stat.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all border border-rose-200"
                      title="Delete Stat Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Data Name / Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...adminHeroStats];
                          updated[idx].label = e.target.value;
                          setAdminHeroStats(updated);
                        }}
                        placeholder="e.g. Facial Geometry Vector"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Value / Number</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...adminHeroStats];
                          updated[idx].value = e.target.value;
                          setAdminHeroStats(updated);
                        }}
                        placeholder="e.g. 128 Nodes Hashed or $1,248,500.00"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Metric Icon</label>
                      <select
                        value={stat.iconType}
                        onChange={(e) => {
                          const updated = [...adminHeroStats];
                          updated[idx].iconType = e.target.value as any;
                          setAdminHeroStats(updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                      >
                        <option value="fingerprint">Fingerprint Vector (Blue)</option>
                        <option value="radio">Radio Acoustic (Purple)</option>
                        <option value="dollar">Dollar Cleared (Green)</option>
                        <option value="shield">Shield Security (Amber)</option>
                        <option value="zap">Zap Crawler (Indigo)</option>
                        <option value="check">Check Verified (Blue)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: 30-Day Free Trial & Offer Settings */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">30-Day Free Trial & Public Header Offer Settings</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Configure credit card requirements, free trial length, money-back guarantees, and public header banner copy.</p>
                </div>
              </div>

              <button
                onClick={handleSaveTrialConfig}
                className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2 whitespace-nowrap self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Save Trial Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Top Badge Text</label>
                <input
                  type="text"
                  value={adminTrialConfig.topBadge}
                  onChange={(e) => setAdminTrialConfig({ ...adminTrialConfig, topBadge: e.target.value })}
                  placeholder="e.g. No credit card required"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                />
                <span className="text-[10px] text-slate-400 block">Highlighted upper label above pricing title</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Pricing Title</label>
                <input
                  type="text"
                  value={adminTrialConfig.title}
                  onChange={(e) => setAdminTrialConfig({ ...adminTrialConfig, title: e.target.value })}
                  placeholder="e.g. Plans & Pricing"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                />
                <span className="text-[10px] text-slate-400 block">Main section heading</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Subtitle & Guarantee Notice</label>
                <input
                  type="text"
                  value={adminTrialConfig.subtitle}
                  onChange={(e) => setAdminTrialConfig({ ...adminTrialConfig, subtitle: e.target.value })}
                  placeholder="e.g. No risk, 30-day money back guarantee!"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                />
                <span className="text-[10px] text-slate-400 block">Subtitle under section title</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Free Trial Duration (Days)</label>
                <input
                  type="number"
                  value={adminTrialConfig.trialDurationDays}
                  onChange={(e) => setAdminTrialConfig({ ...adminTrialConfig, trialDurationDays: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                />
                <span className="text-[10px] text-slate-400 block">Number of days included in cardless trial</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Credit Card Requirement</label>
                <div className="flex items-center space-x-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setAdminTrialConfig({ ...adminTrialConfig, requireCreditCard: false })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      !adminTrialConfig.requireCreditCard
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    ✓ Credit Card-Less Trial
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdminTrialConfig({ ...adminTrialConfig, requireCreditCard: true })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      adminTrialConfig.requireCreditCard
                        ? 'bg-[#0144e4] text-white border-blue-600 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    Card Required upfront
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block">Determines if signup prompts for credit card</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Custom Plan Contact CTA</label>
                <input
                  type="text"
                  value={adminTrialConfig.customPlanText}
                  onChange={(e) => setAdminTrialConfig({ ...adminTrialConfig, customPlanText: e.target.value })}
                  placeholder="e.g. Need a Customized Plan? Please contact us."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                />
                <span className="text-[10px] text-slate-400 block">Bottom section CTA button label</span>
              </div>
            </div>
          </div>

          {/* Section 2: Subscription Tiers & Plans Manager */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Subscription Plans & Pricing Tiers ({adminPricingPlans.length})</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage pricing plans, monthly costs, feature lists, and popular tier badges shown on the landing page.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingPlanModal({
                    id: `plan_${Date.now()}`,
                    name: '',
                    price: 29,
                    period: '/ month',
                    popular: false,
                    popularBadgeText: 'Most Popular',
                    features: ['New Feature 1', 'New Feature 2'],
                    buttonText: 'Choose plan'
                  })}
                  className="px-4 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add New Plan</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {adminPricingPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between space-y-5 transition-all ${
                    plan.popular
                      ? 'border-2 border-[#0144e4] bg-blue-50/20 shadow-md relative'
                      : 'border-slate-200 bg-white shadow-xs'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#0144e4] text-white font-black text-[9px] uppercase tracking-widest font-mono shadow-xs">
                      {plan.popularBadgeText || 'Most Popular'}
                    </span>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xs font-bold text-[#0144e4]">$</span>
                      <span className="text-2xl font-black text-slate-900 font-mono">{plan.price}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{plan.period}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display">{plan.name}</h3>
                    <div className="h-0.5 w-8 bg-[#0144e4]"></div>

                    <ul className="space-y-2 text-xs text-slate-600 pt-1 font-medium">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0144e4] mt-0.5 flex-shrink-0" />
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setEditingPlanModal({ ...plan })}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Edit Plan</span>
                    </button>

                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all border border-rose-200"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Platform Take-Rate & Pricing Control Suite</h2>
                <p className="text-xs text-slate-500 mt-0.5">Configure global app license commission percentages, cross-discipline add-on subscription fees, and default floor rates across all 4 disciplines.</p>
              </div>

              <button
                onClick={() => showToast(`Global platform pricing & ${platformTakeRate}% take-rate configuration saved!`)}
                className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2 whitespace-nowrap self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Save Pricing Configuration</span>
              </button>
            </div>

            {/* Global Take-Rate & Add-on Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="text-[11px] font-bold text-blue-900 uppercase block">App Platform Commission Fee</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.5"
                    value={platformTakeRate}
                    onChange={(e) => setPlatformTakeRate(parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white border border-blue-300 rounded-xl px-3 py-2 text-sm font-extrabold text-slate-900 focus:outline-none focus:border-[#0144e4]"
                  />
                  <span className="text-sm font-bold text-[#0144e4]">%</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Applied to gross settlement claims & license clearings.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase block">Single Discipline Add-on</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-black font-mono text-slate-700">$</span>
                  <input
                    type="number"
                    value={singleModuleFee}
                    onChange={(e) => setSingleModuleFee(parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ mo</span>
                </div>
                <p className="text-[10px] text-slate-500">Per additional discipline module add-on.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase block">All-Access Creator Pass</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-black font-mono text-slate-700">$</span>
                  <input
                    type="number"
                    value={allAccessFee}
                    onChange={(e) => setAllAccessFee(parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ mo</span>
                </div>
                <p className="text-[10px] text-slate-500">Unlocks all 4 creative discipline modules.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase block">Statutory Grace Period</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={gracePeriodHours}
                    onChange={(e) => setGracePeriodHours(parseInt(e.target.value) || 0)}
                    className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-mono">Hours</span>
                </div>
                <p className="text-[10px] text-slate-500">Grace period before automated DMCA takedown.</p>
              </div>
            </div>

            {/* Discipline Default Floor Rates Matrix */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900">Per-Discipline Default Floor Rates & Commercial Caps</h3>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 font-sans">Creative Discipline</th>
                      <th className="p-4 font-sans">AI Training / Scrape Query Floor</th>
                      <th className="p-4 font-sans">Commercial Ad / Placement Floor</th>
                      <th className="p-4 font-sans">Discipline Status</th>
                      <th className="p-4 text-right font-sans">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(disciplineRates).map(([key, disc]) => (
                      <tr key={key} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-900 font-sans">
                          {disc.name}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-500 font-bold">$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={disc.queryRate}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setDisciplineRates({
                                  ...disciplineRates,
                                  [key]: { ...disc, queryRate: val }
                                });
                              }}
                              className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900"
                            />
                            <span className="text-[10px] text-slate-400 font-sans">/ query</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-500 font-bold">$</span>
                            <input
                              type="number"
                              value={disc.adRate}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setDisciplineRates({
                                  ...disciplineRates,
                                  [key]: { ...disc, adRate: val }
                                });
                              }}
                              className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900"
                            />
                            <span className="text-[10px] text-slate-400 font-sans">/ ad</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase font-sans">
                            {disc.status}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => showToast(`Floor rates updated for ${disc.name}!`)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 font-sans"
                          >
                            Update Floor
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Commission Revenue Calculator Box */}
            <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#0144e4] uppercase tracking-wider">Live Platform Revenue Split Model</span>
                <span className="text-[11px] text-slate-500 font-medium">Current App Take Rate: {platformTakeRate}%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Gross Volume Cleared</span>
                  <span className="text-lg font-extrabold text-slate-900">$1,248,920.00</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-blue-200 space-y-1 shadow-2xs">
                  <span className="text-[10px] text-[#0144e4] uppercase font-bold block">App Take-Rate Revenue ({platformTakeRate}%)</span>
                  <span className="text-lg font-extrabold text-[#0144e4]">${(1248920 * (platformTakeRate / 100)).toFixed(2)}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-2xs">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold block">Net Creator Payout ({(100 - platformTakeRate).toFixed(1)}%)</span>
                  <span className="text-lg font-extrabold text-emerald-700">${(1248920 * (1 - (platformTakeRate / 100))).toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 2: USER IDENTITY & ACCOUNT MANAGEMENT ---------------- */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Invite-Only Registration Status & Quick Management Banner */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className={`p-3 rounded-2xl border ${regConfig.inviteOnlyEnabled ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                <KeyRound className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-extrabold text-slate-900">User Sign-Up Mode:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black font-mono border uppercase ${
                    regConfig.inviteOnlyEnabled ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  }`}>
                    {regConfig.inviteOnlyEnabled ? '🔒 Invite-Only Active' : '🌐 Open Public Registration Active'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {regConfig.inviteOnlyEnabled
                    ? `New creators must enter a valid VIP code. ${regConfig.validInviteCodes.length} active invite codes configured in Firestore.`
                    : 'Anyone can register an account on Authr without an invite code.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveAdminTab('system')}
              className="px-4 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-xs transition-all flex items-center space-x-2 whitespace-nowrap self-start sm:self-auto"
            >
              <KeyRound className="w-4 h-4 text-white" />
              <span>Configure Invite-Only Rules & VIP Codes</span>
            </button>
          </div>

          {/* User Stats Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">Total Registered Accounts</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{usersList.length} Accounts</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">KYC Verified Users</span>
                <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
                  {usersList.filter(u => u.kycStatus === 'verified').length} / {usersList.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">Active Creator Vaults</span>
                <span className="text-2xl font-black text-indigo-700 font-mono mt-1 block">
                  {usersList.filter(u => u.accountStatus !== 'suspended').length} Active
                </span>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">Suspended / Restricted</span>
                <span className="text-2xl font-black text-rose-600 font-mono mt-1 block">
                  {usersList.filter(u => u.accountStatus === 'suspended').length} Suspended
                </span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">User Identity & Account Management Directory ({filteredUsers.length})</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage user accounts, edit creator profiles, approve KYC verification, and control suspension access.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingUserModal({
                    id: `usr_${Date.now()}`,
                    fullName: '',
                    email: '',
                    handle: '@new_creator',
                    discipline: 'Musicians & Composers',
                    role: 'creator',
                    kycStatus: 'pending',
                    accountStatus: 'active',
                    idDocumentType: "Driver's License (Pending)",
                    idMatchScore: 98.0,
                    registeredAssetsCount: 0,
                    totalEarnings: 0,
                    joinedDate: new Date().toISOString().split('T')[0],
                    bipaHash: `bipa_hash_0x${Date.now()}_vector`
                  })}
                  className="px-4 py-2 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add New User</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by full name, email, or handle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-[#0144e4] focus:outline-none font-sans"
                />
              </div>

              <div className="flex items-center space-x-2 flex-wrap">
                <select
                  value={selectedRoleFilter}
                  onChange={(e) => setSelectedRoleFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:border-amber-400 focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="creator">Creator</option>
                  <option value="agency">Agency / Commercial</option>
                  <option value="admin">Superuser Admin</option>
                </select>

                <select
                  value={selectedKycFilter}
                  onChange={(e) => setSelectedKycFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:border-amber-400 focus:outline-none"
                >
                  <option value="all">All KYC Statuses</option>
                  <option value="verified">KYC Verified Only</option>
                  <option value="review_required">Review Required</option>
                  <option value="pending">Pending KYC</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:border-amber-400 focus:outline-none"
                >
                  <option value="all">All Account Statuses</option>
                  <option value="active">Active Accounts</option>
                  <option value="suspended">Suspended Accounts</option>
                </select>
              </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    <th className="p-4">User Account</th>
                    <th className="p-4">Discipline Profile</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4">Government ID KYC</th>
                    <th className="p-4">Match Score</th>
                    <th className="p-4">Works / Revenue</th>
                    <th className="p-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-xs text-slate-500 font-medium">
                        No users found matching current search and filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div>
                            <div className="font-bold text-slate-900 flex items-center space-x-2">
                              <span>{u.fullName}</span>
                              <span className="text-[10px] font-mono text-slate-400">({u.handle})</span>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider font-mono ${
                                u.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : u.role === 'agency'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {u.role || 'creator'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono mt-0.5">{u.email} • ID: {u.id}</div>
                          </div>
                        </td>

                        <td className="p-4 font-bold text-slate-700">
                          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-mono">
                            {u.discipline}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 w-fit font-mono ${
                            u.accountStatus === 'suspended'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${u.accountStatus === 'suspended' ? 'bg-rose-600' : 'bg-emerald-500'}`}></span>
                            <span>{u.accountStatus === 'suspended' ? 'SUSPENDED' : 'ACTIVE'}</span>
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 w-fit ${
                            u.kycStatus === 'verified'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : u.kycStatus === 'review_required'
                              ? 'bg-amber-50 text-amber-800 border border-amber-300'
                              : 'bg-slate-100 text-slate-600 border border-slate-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              u.kycStatus === 'verified' ? 'bg-emerald-500' : u.kycStatus === 'review_required' ? 'bg-amber-500' : 'bg-slate-400'
                            }`}></span>
                            <span>{u.kycStatus === 'verified' ? 'VERIFIED' : u.kycStatus === 'review_required' ? 'REVIEW REQUIRED' : 'PENDING'}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1 font-mono">{u.idDocumentType}</span>
                        </td>

                        <td className="p-4">
                          <span className="font-mono font-bold text-slate-900 text-xs">{u.idMatchScore}% Match</span>
                        </td>

                        <td className="p-4 font-mono">
                          <div className="font-bold text-slate-900 text-xs">{u.registeredAssetsCount} Works</div>
                          <div className="text-[11px] text-amber-700 font-extrabold mt-0.5">${(u.totalEarnings || 0).toFixed(2)}</div>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => {
                                if (onSwitchDemoUser) {
                                  onSwitchDemoUser({
                                    id: u.id,
                                    email: u.email,
                                    fullName: u.fullName,
                                    handle: u.handle,
                                    discipline: u.discipline,
                                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                                    token: `jwt_demo_switch_${u.id}`,
                                    kycStatus: u.kycStatus,
                                    idDocumentType: u.idDocumentType,
                                    idMatchScore: u.idMatchScore,
                                    role: u.role || 'creator'
                                  });
                                  showToast(`Switched active session to ${u.fullName}!`);
                                }
                              }}
                              className="px-2 py-1 rounded-lg bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-[10px] transition-all flex items-center space-x-1 shadow-2xs"
                              title="Switch active session to this user"
                            >
                              <Zap className="w-3 h-3 fill-white" />
                              <span>Test Demo</span>
                            </button>

                            <button
                              onClick={() => setEditingUserModal({ ...u })}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
                              title="Edit User Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setSelectedUserDocModal(u)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
                              title="Inspect Government ID OCR Data"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {u.kycStatus !== 'verified' && (
                              <button
                                onClick={() => handleApproveKyc(u.id)}
                                className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-all"
                                title="Approve KYC Verification"
                              >
                                Approve KYC
                              </button>
                            )}

                            <button
                              onClick={() => handleToggleSuspendUser(u.id)}
                              className={`px-2 py-1 rounded-lg font-bold text-[10px] border transition-all ${
                                u.accountStatus === 'suspended'
                                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                              }`}
                              title={u.accountStatus === 'suspended' ? 'Reactivate Account' : 'Suspend Account'}
                            >
                              {u.accountStatus === 'suspended' ? 'Reactivate' : 'Suspend'}
                            </button>

                            <button
                              onClick={() => handleDeleteUser(u.id, u.fullName)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all border border-rose-200"
                              title="Delete User Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 3: GLOBAL INFRINGEMENT QUEUE ---------------- */}
      {activeAdminTab === 'matches' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Global Infringement Clearinghouse Queue</h2>
              <p className="text-xs text-slate-500 mt-0.5">Review system-wide detected web scrapes, AI voice clones, and automated DMCA notices.</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-mono text-xs font-bold">
              {matches.length} Total Matches Flagged
            </span>
          </div>

          <div className="space-y-3">
            {matches.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{m.assetTitle}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-white text-slate-700 border border-slate-200">
                      {m.targetPlatform}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-100 text-amber-900">
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    Uploader: <strong className="text-slate-800">{m.uploaderName}</strong> • Similarity: <strong className="text-amber-700">{m.visualSimilarity || m.audioSimilarity}%</strong> • Est. Views: {m.viewCount.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Calculated Fee</span>
                    <span className="text-sm font-black text-amber-700 font-mono">${m.estimatedLostRevenue.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => showToast(`DMCA Legal Takedown Notice forcefully dispatched to ${m.targetPlatform}!`)}
                    className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-300 transition-all whitespace-nowrap"
                  >
                    Force DMCA
                  </button>

                  <a
                    href={m.infringingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB 4: SYSTEM CRAWLER NODES & ACCESS CONTROL ---------------- */}
      {activeAdminTab === 'system' && (
        <div className="space-y-6">
          
          {/* Invite-Only Registration & Access Control Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            
            {/* Under Construction & Site Status Master Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <Construction className="w-5 h-5 text-amber-600" />
                    <h3 className="text-base font-extrabold text-slate-900">Under Construction Mode</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                    Place the site under construction. Public visitors will see a restricted maintenance view displaying <strong>ONLY the Google Sign-In button</strong> for admin/staff access.
                  </p>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex-shrink-0 self-start sm:self-auto">
                  <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Site Status</div>
                    <div className={`text-xs font-extrabold font-mono ${regConfig.underConstructionMode ? 'text-amber-600 animate-pulse' : 'text-emerald-600'}`}>
                      {regConfig.underConstructionMode ? '🚧 UNDER CONSTRUCTION' : '🟢 NORMAL LIVE MODE'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleUnderConstruction}
                    className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                      regConfig.underConstructionMode ? 'bg-amber-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      regConfig.underConstructionMode ? 'translate-x-7' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {regConfig.underConstructionMode ? (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Under Construction Mode is ACTIVE. Unauthenticated visitors are restricted to Google Login.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event('rg_trigger_preview_public'))}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-2xs cursor-pointer flex-shrink-0 self-start sm:self-auto flex items-center space-x-1.5"
                  >
                    <span>👁️ Preview Public Screen</span>
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>Site is running normally. Public visitors can access all landing pages, documentation, and features.</span>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event('rg_trigger_preview_public'))}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-2xs cursor-pointer flex-shrink-0 self-start sm:self-auto flex items-center space-x-1.5"
                  >
                    <span>👁️ Preview Public Screen</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2.5">
                  <KeyRound className="w-5 h-5 text-[#0144e4]" />
                  <h2 className="text-lg font-extrabold text-slate-900">User Registration & Access Control</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Configure whether user sign-up requires a VIP invite code or is open to everyone.
                </p>
              </div>

              {/* Master Toggle */}
              <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registration Mode</div>
                  <div className={`text-xs font-extrabold ${regConfig.inviteOnlyEnabled ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {regConfig.inviteOnlyEnabled ? '🔒 Invite Only Active' : '🌐 Open Registration Active'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleInviteOnly}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                    regConfig.inviteOnlyEnabled ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    regConfig.inviteOnlyEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Active Mode Notice */}
            <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-4 ${
              regConfig.inviteOnlyEnabled
                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-center space-x-3">
                {regConfig.inviteOnlyEnabled ? (
                  <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                ) : (
                  <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
                <div>
                  <span className="font-extrabold">
                    {regConfig.inviteOnlyEnabled
                      ? 'Invite-Only Mode is currently ACTIVE'
                      : 'Open Registration Mode is currently ACTIVE'}
                  </span>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {regConfig.inviteOnlyEnabled
                      ? 'New creators must enter a valid VIP invite code during registration. Flip the toggle switch anytime to open registration to everyone.'
                      : 'Anyone can register an account on Authr without needing an invite code.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Invite Codes Manager */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Active VIP Invite Codes ({regConfig.validInviteCodes.length})
                </h3>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleGenerateRandomCode}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0144e4] border border-blue-200 text-xs font-bold transition-all flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate VIP Code</span>
                  </button>
                </div>
              </div>

              {/* Add Code Form */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter custom code (e.g. SUMMER2026)"
                  value={newInviteCode}
                  onChange={(e) => setNewInviteCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddInviteCode()}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold font-mono uppercase text-slate-900 focus:outline-none focus:border-[#0144e4]"
                />
                <button
                  type="button"
                  onClick={handleAddInviteCode}
                  className="px-4 py-2 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white text-xs font-bold transition-all flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Code</span>
                </button>
              </div>

              {/* List of active codes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {regConfig.validInviteCodes.map((code, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between group">
                    <div className="flex items-center space-x-2">
                      <KeyRound className="w-3.5 h-3.5 text-[#0144e4]" />
                      <span className="font-mono font-bold text-xs text-slate-900 tracking-wider">{code}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(code);
                          showToast(`Copied code ${code} to clipboard!`);
                        }}
                        title="Copy Code"
                        className="p-1 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-[#0144e4] transition-all"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteInviteCode(code)}
                        title="Delete Code"
                        className="p-1 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crawler Swarms Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Crawler Swarms & Node Infrastructure</h2>
                <p className="text-xs text-slate-500 mt-0.5">Real-time status of cross-platform scraping detection nodes across social platforms and AI model datasets.</p>
              </div>
              <button
                onClick={() => showToast('All 1,420 Crawler Swarm Nodes restarted!')}
                className="px-4 py-2 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-xs transition-all flex items-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-white" />
                <span>Restart Swarms</span>
              </button>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'YouTube Shorts Crawler Swarm', nodes: 380, status: 'Operational', ping: '12ms', platform: 'YouTube' },
              { name: 'TikTok Video Stream Scraper', nodes: 420, status: 'Operational', ping: '18ms', platform: 'TikTok' },
              { name: 'Instagram Reels Media Node', nodes: 290, status: 'Operational', ping: '15ms', platform: 'Instagram' },
              { name: 'Common Crawl AI Dataset Scanner', nodes: 180, status: 'Operational', ping: '42ms', platform: 'Common Crawl' },
              { name: 'Midjourney & SD Image Scraper', nodes: 150, status: 'Operational', ping: '38ms', platform: 'AI Generators' },
            ].map((crawler, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{crawler.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {crawler.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 pt-2 border-t border-slate-200">
                  <span>Nodes: <strong>{crawler.nodes} Active</strong></span>
                  <span>Latency: <strong>{crawler.ping}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* ---------------- ADMIN TAB 5: BIPA & SECURITY AUDIT LOG ---------------- */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">BIPA & Security Event Audit Feed</h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time immutable compliance ledger for biometric vectors, C2PA signatures, and DMCA legal notice dispatches.</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { time: '2026-08-09 00:28:12', event: 'KYC VERIFICATION PASSED', user: 'Alex Rivera (usr_892314)', detail: 'BIPA biometric face vector and voice spectral print matched with 99.4% confidence.' },
              { time: '2026-08-09 00:24:05', event: 'C2PA SIGNATURE ISSUED', user: 'Sarah Conner (usr_902184)', detail: 'Cryptographic master signature 0x89f2a4b8 attached to original digital art.' },
              { time: '2026-08-09 00:19:40', event: 'SETTLEMENT FEE COLLECTED', user: 'BrandCorp HQ (usr_119284)', detail: '$750.00 retroactive license fee collected from GlobalFashionVendor_99.' },
              { time: '2026-08-09 00:12:00', event: 'BIPA CEASE & DESIST DISPATCHED', user: 'Jane Doe (usr_441092)', detail: 'Formal statutory notice dispatched to SyntheticVoices_Lab.' }
            ].map((log, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-50 text-[#0144e4] border border-blue-200">{log.event}</span>
                    <span className="text-slate-800 font-bold">{log.user}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB: WEB SERVICES & DAEMON HEALTH ---------------- */}
      {activeAdminTab === 'webservices' && (
        <WebServicesDashboard />
      )}

      {/* ---------------- ADMIN TAB: CUSTOMER REVIEWS & TESTIMONIALS MANAGER ---------------- */}
      {activeAdminTab === 'reviews' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-widest bg-blue-100 text-[#0144e4] rounded-full font-mono">
                  LANDING PAGE TESTIMONIALS
                </span>
                <span className="text-xs text-slate-500 font-mono">{testimonialsList.length} Active Reviews</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
                Customer Reviews &amp; Testimonials Manager
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Add, edit, or remove customer quotes, author names, professional roles, and profile avatars displayed on the landing page carousel.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setEditingReviewModal({
                  id: `rev_${Date.now()}`,
                  author: '',
                  title: '',
                  quote: '',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                })}
                className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Review</span>
              </button>
            </div>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsList.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between relative group hover:border-blue-200 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-[#0144e4]/30" />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingReviewModal(item)}
                        className="p-2 rounded-lg bg-blue-50 text-[#0144e4] hover:bg-blue-100 transition-colors"
                        title="Edit Review"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(item.id)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 italic font-medium leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0144e4] shrink-0 shadow-2xs"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-extrabold text-slate-900 font-display truncate">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Review Edit/Create Modal */}
      {editingReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0144e4] flex items-center justify-center font-bold border border-blue-100">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {testimonialsList.some(r => r.id === editingReviewModal.id) ? 'Edit Customer Review' : 'Add New Customer Review'}
                </h3>
              </div>
              <button onClick={() => setEditingReviewModal(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Author Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Conner"
                  value={editingReviewModal.author}
                  onChange={(e) => setEditingReviewModal({ ...editingReviewModal, author: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#0144e4] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Title / Profession</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Voice Actor & Podcast Host"
                  value={editingReviewModal.title}
                  onChange={(e) => setEditingReviewModal({ ...editingReviewModal, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-[#0144e4] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Avatar Image URL</label>
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={editingReviewModal.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0144e4]"
                  />
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={editingReviewModal.avatar}
                    onChange={(e) => setEditingReviewModal({ ...editingReviewModal, avatar: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 focus:border-[#0144e4] focus:outline-none"
                  />
                </div>
                {/* Preset Avatar Selection */}
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">Quick Pick Avatar:</span>
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                  ].map((url, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setEditingReviewModal({ ...editingReviewModal, avatar: url })}
                      className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                        editingReviewModal.avatar === url ? 'border-[#0144e4] scale-110 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={url} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Customer Quote / Review Text</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter customer feedback or testimonial quote..."
                  value={editingReviewModal.quote}
                  onChange={(e) => setEditingReviewModal({ ...editingReviewModal, quote: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:border-[#0144e4] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReviewModal(null)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- ADMIN TAB: BLOG & ARTICLE MANAGER ---------------- */}
      {activeAdminTab === 'blog_posts' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 rounded-full font-mono">
                  BLOG &amp; KNOWLEDGE BASE
                </span>
                <span className="text-xs text-slate-500 font-mono">{articlesList.length} Published Articles</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-display">
                Blog &amp; Resource Article Manager
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Publish new articles, edit existing blog content, update categories, legal guides, and cover images across the Resource Center.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setEditingArticleModal({
                  id: `post_${Date.now()}`,
                  title: '',
                  excerpt: '',
                  content: [''],
                  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                  readMin: '3 min read time',
                  author: 'Authr Legal Team',
                  category: 'Legal',
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
                })}
                className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Create New Article</span>
              </button>
            </div>
          </div>

          {/* Articles List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesList.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#0144e4] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-left">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readMin}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 line-clamp-2 font-display">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 font-mono truncate">By {article.author}</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingArticleModal(article)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0144e4] hover:bg-blue-100 font-bold text-xs transition-colors flex items-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit/Create Blog Article Modal */}
      {editingArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn overflow-y-auto max-h-screen py-10">
          <div className="relative w-full max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0144e4] flex items-center justify-center font-bold border border-blue-100">
                  <BookOpen className="w-5 h-5 text-slate-900" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {articlesList.some(a => a.id === editingArticleModal.id) ? 'Edit Blog Article' : 'Publish New Blog Article'}
                </h3>
              </div>
              <button onClick={() => setEditingArticleModal(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Understanding BIPA & Statutory Likeness Protection"
                  value={editingArticleModal.title}
                  onChange={(e) => setEditingArticleModal({ ...editingArticleModal, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:border-[#0144e4] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Legal, C2PA, Voice"
                    value={editingArticleModal.category}
                    onChange={(e) => setEditingArticleModal({ ...editingArticleModal, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#0144e4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Author</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Authr Legal Team"
                    value={editingArticleModal.author}
                    onChange={(e) => setEditingArticleModal({ ...editingArticleModal, author: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#0144e4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Read Time / Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 min read time"
                    value={editingArticleModal.readMin}
                    onChange={(e) => setEditingArticleModal({ ...editingArticleModal, readMin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:border-[#0144e4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Cover Image URL</label>
                <div className="flex items-center space-x-3">
                  {editingArticleModal.image && (
                    <img
                      src={editingArticleModal.image}
                      alt="Preview"
                      className="w-12 h-10 rounded-lg object-cover border border-slate-200"
                    />
                  )}
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={editingArticleModal.image}
                    onChange={(e) => setEditingArticleModal({ ...editingArticleModal, image: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:border-[#0144e4] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short summary displayed on article card..."
                  value={editingArticleModal.excerpt}
                  onChange={(e) => setEditingArticleModal({ ...editingArticleModal, excerpt: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-[#0144e4] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Article Paragraphs (Separate paragraphs with double enter)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Enter full article body text..."
                  value={Array.isArray(editingArticleModal.content) ? editingArticleModal.content.join('\n\n') : editingArticleModal.content}
                  onChange={(e) => setEditingArticleModal({
                    ...editingArticleModal,
                    content: e.target.value.split('\n\n').filter(Boolean)
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#0144e4] focus:outline-none font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingArticleModal(null)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Publish Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD PRICING PLAN MODAL */}
      {editingPlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {adminPricingPlans.some(p => p.id === editingPlanModal.id) ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure plan title, price, features, and popularity badges.</p>
                </div>
              </div>

              <button
                onClick={() => setEditingPlanModal(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Plan Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPlanModal.name}
                    onChange={(e) => setEditingPlanModal({ ...editingPlanModal, name: e.target.value })}
                    placeholder="e.g. Basic, Professional, Enterprise"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Monthly Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingPlanModal.price}
                    onChange={(e) => setEditingPlanModal({ ...editingPlanModal, price: parseFloat(e.target.value) || 0 })}
                    placeholder="75"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Billing Period</label>
                  <input
                    type="text"
                    value={editingPlanModal.period}
                    onChange={(e) => setEditingPlanModal({ ...editingPlanModal, period: e.target.value })}
                    placeholder="/ month"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Button CTA Text</label>
                  <input
                    type="text"
                    value={editingPlanModal.buttonText}
                    onChange={(e) => setEditingPlanModal({ ...editingPlanModal, buttonText: e.target.value })}
                    placeholder="Choose plan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="popularPlan"
                    checked={!!editingPlanModal.popular}
                    onChange={(e) => setEditingPlanModal({ ...editingPlanModal, popular: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <label htmlFor="popularPlan" className="text-xs font-extrabold text-slate-900 cursor-pointer">
                    Highlight as "Most Popular" Plan
                  </label>
                </div>

                {editingPlanModal.popular && (
                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Popular Badge Label</label>
                    <input
                      type="text"
                      value={editingPlanModal.popularBadgeText || ''}
                      onChange={(e) => setEditingPlanModal({ ...editingPlanModal, popularBadgeText: e.target.value })}
                      placeholder="Most Popular"
                      className="w-full bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none font-sans"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">Feature Bullet Points ({editingPlanModal.features.length})</label>
                  <button
                    type="button"
                    onClick={() => setEditingPlanModal({
                      ...editingPlanModal,
                      features: [...editingPlanModal.features, `Feature ${editingPlanModal.features.length + 1}`]
                    })}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Bullet Point</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editingPlanModal.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-slate-400 w-5">{idx + 1}.</span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...editingPlanModal.features];
                          updated[idx] = e.target.value;
                          setEditingPlanModal({ ...editingPlanModal, features: updated });
                        }}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingPlanModal.features.filter((_, i) => i !== idx);
                          setEditingPlanModal({ ...editingPlanModal, features: updated });
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingPlanModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Save Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD USER ACCOUNT MODAL */}
      {editingUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {usersList.some(u => u.id === editingUserModal.id) ? 'Edit User Account' : 'Add New User Account'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure creator profile, discipline, KYC status, and access role.</p>
                </div>
              </div>

              <button
                onClick={() => setEditingUserModal(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingUserModal.fullName}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, fullName: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editingUserModal.email}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, email: e.target.value })}
                    placeholder="alex@authr.id"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Handle / Username</label>
                  <input
                    type="text"
                    value={editingUserModal.handle}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, handle: e.target.value })}
                    placeholder="@handle"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Discipline Profile</label>
                  <select
                    value={editingUserModal.discipline}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, discipline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  >
                    <option value="Musicians & Composers">Musicians & Composers</option>
                    <option value="Visual & Fine Artists">Visual & Fine Artists</option>
                    <option value="Video Creators & Podcasters">Video Creators & Podcasters</option>
                    <option value="Authors & Literary Writers">Authors & Literary Writers</option>
                    <option value="Commercial Brands & Agencies">Commercial Brands & Agencies</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Account Role</label>
                  <select
                    value={editingUserModal.role}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, role: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  >
                    <option value="creator">Creator</option>
                    <option value="agency">Commercial Agency</option>
                    <option value="admin">Superuser Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Government ID KYC</label>
                  <select
                    value={editingUserModal.kycStatus}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, kycStatus: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  >
                    <option value="verified">Verified</option>
                    <option value="review_required">Review Required</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Account Status</label>
                  <select
                    value={editingUserModal.accountStatus}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, accountStatus: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">ID Document Label</label>
                  <input
                    type="text"
                    value={editingUserModal.idDocumentType}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, idDocumentType: e.target.value })}
                    placeholder="e.g. Driver's License (IL-90218)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">KYC Facial Match Score (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingUserModal.idMatchScore}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, idMatchScore: parseFloat(e.target.value) || 0 })}
                    placeholder="99.4"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Registered Works Count</label>
                  <input
                    type="number"
                    value={editingUserModal.registeredAssetsCount}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, registeredAssetsCount: parseInt(e.target.value) || 0 })}
                    placeholder="5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Total Revenue Cleared ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingUserModal.totalEarnings}
                    onChange={(e) => setEditingUserModal({ ...editingUserModal, totalEarnings: parseFloat(e.target.value) || 0 })}
                    placeholder="1521.92"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingUserModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Save User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Government ID Document Inspection Modal */}
      {selectedUserDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Government ID & OCR Document Data</h3>
              </div>
              <button onClick={() => setSelectedUserDocModal(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">User Name:</span>
                <span className="font-bold text-slate-900">{selectedUserDocModal.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Document Type:</span>
                <span className="font-bold text-slate-900">{selectedUserDocModal.idDocumentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">KYC Facial Match Score:</span>
                <span className="font-bold text-emerald-700">{selectedUserDocModal.idMatchScore}% Match</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">BIPA Biometric Vector Hash:</span>
                <span className="font-bold text-slate-700 text-[10px]">{selectedUserDocModal.bipaHash}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-mono">
              ✓ Government ID verified against state driver database. Facial geometry match score exceeds statutory 95.0% threshold.
            </div>

            <button
              onClick={() => setSelectedUserDocModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-xs"
            >
              Close Inspection Window
            </button>
          </div>
        </div>
      )}

      {/* Page Content Editor Modal */}
      {editingPageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn text-left">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Edit Page Text: {editingPageModal.title}
                </h3>
              </div>
              <button onClick={() => setEditingPageModal(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSavePage} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Page Title</label>
                  <input
                    type="text"
                    required
                    value={editingPageModal.title}
                    onChange={(e) => setEditingPageModal({ ...editingPageModal, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Header Subtitle / Badge</label>
                  <input
                    type="text"
                    required
                    value={editingPageModal.badge}
                    onChange={(e) => setEditingPageModal({ ...editingPageModal, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Main Summary / Intro Paragraph</label>
                <textarea
                  rows={3}
                  required
                  value={editingPageModal.summary}
                  onChange={(e) => setEditingPageModal({ ...editingPageModal, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Action Button Text (Optional)</label>
                <input
                  type="text"
                  value={editingPageModal.actionButtonText || ''}
                  onChange={(e) => setEditingPageModal({ ...editingPageModal, actionButtonText: e.target.value })}
                  placeholder="e.g. Create Your Free Account"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Content Sections Editor */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider font-mono text-slate-800">
                    Page Content Sections ({editingPageModal.sections.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newSec: ManagedPageSection = {
                        id: `sec_${Date.now()}`,
                        title: 'New Section Title',
                        content: 'Section detailed text content goes here...'
                      };
                      setEditingPageModal({
                        ...editingPageModal,
                        sections: [...editingPageModal.sections, newSec]
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-bold text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Add Section</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {editingPageModal.sections.map((sec, idx) => (
                    <div key={sec.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-indigo-600">Section {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSections = editingPageModal.sections.filter((_, i) => i !== idx);
                            setEditingPageModal({ ...editingPageModal, sections: updatedSections });
                          }}
                          className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Section Title</label>
                        <input
                          type="text"
                          required
                          value={sec.title}
                          onChange={(e) => {
                            const updatedSections = [...editingPageModal.sections];
                            updatedSections[idx].title = e.target.value;
                            setEditingPageModal({ ...editingPageModal, sections: updatedSections });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block">Section Text Body</label>
                        <textarea
                          rows={3}
                          required
                          value={sec.content}
                          onChange={(e) => {
                            const updatedSections = [...editingPageModal.sections];
                            updatedSections[idx].content = e.target.value;
                            setEditingPageModal({ ...editingPageModal, sections: updatedSections });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400 leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingPageModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Save Page Text</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Live Visitor View Preview Modal */}
      {previewPageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn text-left">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                ● Live Visitor View Preview
              </span>
              <button onClick={() => setPreviewPageModal(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-4 text-center border-b border-slate-200 pb-6">
              <div className="inline-flex items-center space-x-2 text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
                <span>{previewPageModal.category} • {previewPageModal.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                {previewPageModal.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                {previewPageModal.summary}
              </p>
            </div>

            <div className="space-y-4">
              {previewPageModal.sections.map((sec, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 font-display">{sec.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{sec.content}</p>
                </div>
              ))}
            </div>

            {previewPageModal.actionButtonText && (
              <div className="pt-2 text-center">
                <button className="px-6 py-3 rounded-xl bg-[#0144e4] text-white text-xs font-bold shadow-md">
                  {previewPageModal.actionButtonText}
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setPreviewPageModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0144e4] hover:bg-[#0038c7] text-white font-extrabold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Career Open Role Editor Modal */}
      {editingCareerRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn text-left">
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {careerRolesList.some(r => r.id === editingCareerRoleModal.id) ? 'Edit Open Role' : 'Add New Open Role'}
                </h3>
              </div>
              <button onClick={() => setEditingCareerRoleModal(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSaveCareerRole} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Cryptography Engineer (C2PA & Rust)"
                  value={editingCareerRoleModal.title}
                  onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Security & Core Infrastructure"
                    value={editingCareerRoleModal.dept}
                    onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, dept: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Remote (US / EU)"
                    value={editingCareerRoleModal.location}
                    onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Employment Type</label>
                <select
                  value={editingCareerRoleModal.type}
                  onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Job Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of responsibilities and technical scope..."
                  value={editingCareerRoleModal.desc}
                  onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, desc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingCareerRoleModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md"
                >
                  Save Open Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0144e4] text-white shadow-2xl font-bold text-xs flex items-center space-x-3 animate-fadeIn border border-blue-500">
          <ShieldCheck className="w-5 h-5 text-white flex-shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

    </div>
  );
};
