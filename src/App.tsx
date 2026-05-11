import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  BarChart3, 
  Target, 
  MessageSquare, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Globe, 
  Sparkles,
  Search,
  LineChart,
  Bot,
  PenTool,
  Users,
  PieChart,
  RefreshCw,
  Layout,
  Split,
  TrendingUp,
  Clock,
  Activity,
  ShieldAlert,
  Sword,
  FileText,
  Volume2,
  VolumeX,
  Languages,
  BookOpen,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { io, Socket } from 'socket.io-client';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart as ReLineChart, 
  Line as ReLine, 
  BarChart as ReBarChart, 
  Bar as ReBar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell
} from 'recharts';
import { 
  generateContentIdeas, 
  generateAudienceSegments, 
  generateCampaignAnalytics,
  compareCreatives,
  generateCompetitorAnalysis,
  generateBlogArticle,
  type ContentIdeas,
  type AudienceSegment,
  type CampaignAnalytics,
  type ABTestResult,
  type CompetitorAnalysis,
  type BlogArticle
} from './services/aiService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
            <BrainCircuit className="text-white" size={20} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-primary uppercase">AdMind<span className="text-blue-500 italic lowercase tracking-wider">AI</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          <a href="#services" className="hover:text-primary transition-colors">Platform</a>
          <a href="#dashboard" className="hover:text-primary transition-colors">KPIs</a>
          <a href="#toolkit" className="hover:text-primary transition-colors">Tools</a>
          <a href="#demo" className="hover:text-primary transition-colors">Solutions</a>

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="#connect" className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-slate-200 transition-all active:scale-95">
            Launch Campaign
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-xl border-b border-line p-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg text-primary">Services</a>
            <a href="#dashboard" onClick={() => setIsOpen(false)} className="text-lg text-primary">KPIs</a>
            <a href="#toolkit" onClick={() => setIsOpen(false)} className="text-lg text-primary">Tools</a>
            <a href="#demo" onClick={() => setIsOpen(false)} className="text-lg text-primary">AI Engine</a>

            <a href="#connect" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white py-4 rounded-xl font-bold text-center">Launch Campaign</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            Predictive ROI Engine 2.0
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight mb-8">
            Marketing that <br />
            <span className="gradient-text">Thinks for Itself.</span>
          </h1>
          <p className="text-lg text-secondary max-w-md leading-relaxed mb-10">
            Our neural network analyzes billions of signals to deploy high-converting campaigns across every channel, automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#connect" className="btn-primary px-8 py-4 text-lg text-center">
              Book a Demo
            </a>
            <div className="flex items-center gap-4 px-2">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-bg bg-slate-800" />
                ))}
              </div>
              <span className="text-xs text-slate-500 leading-tight">Trusted by 500+ <br />Agencies Worldwide</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-6 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-semibold text-secondary">Real-time Optimization</span>
              <span className="text-xs text-blue-400 font-mono tracking-tighter uppercase">Active Engine · 12ms Latency</span>
            </div>
            
            <div className="space-y-4">
              <div className="h-14 bg-white/5 rounded-2xl flex items-center px-6 justify-between border border-line">
                <span className="text-sm font-medium text-primary">Conversion Rate</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-blue-500/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <span className="text-emerald-400 text-sm font-bold">+24.8%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <div className="text-xs text-secondary mb-2">Cost per Acq.</div>
                  <div className="text-3xl font-bold text-primary tracking-tight">$12.40</div>
                  <div className="text-[10px] text-blue-400 mt-2 font-mono">-15% Performance Gain</div>
                </div>
                <div className="h-28 bg-purple-500/5 rounded-2xl p-5 border border-purple-500/10">
                  <div className="text-xs text-secondary mb-2">Neural ROAS</div>
                  <div className="text-3xl font-bold text-primary tracking-tight">8.4<span className="text-purple-400">x</span></div>
                  <div className="text-[10px] text-purple-400 mt-2 font-mono">Peak Signal Efficiency</div>
                </div>
              </div>

              <div className="h-36 bg-white/5 rounded-2xl p-5 flex flex-col justify-end gap-2 overflow-hidden border border-white/5">
                <div className="flex items-end gap-1.5 h-full">
                  {[20, 45, 30, 65, 50, 85, 60, 90, 75, 95].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05 + 0.5 }}
                      className={`w-full rounded-t-sm ${i === 9 ? 'bg-blue-500' : 'bg-blue-500/20'}`}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-slate-600 flex justify-between pt-3 border-t border-white/5 font-mono uppercase tracking-widest">
                  <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Zap className="text-blue-400" size={24} />,
      title: "Autonomous Creative",
      desc: "Neural network generates high-velocity visuals and copy that resonate with individual user clusters."
    },
    {
      icon: <Target className="text-purple-400" size={24} />,
      title: "Audience Synthesis",
      desc: "Identify high-value segments instantly using zero-party data mapping and behavioral intent engines."
    },
    {
      icon: <BarChart3 className="text-emerald-400" size={24} />,
      title: "Dynamic Bidding",
      desc: "Real-time cost optimization at scale across 40+ ad networks, executing 100k+ adjustments per hour."
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/5 group"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIDemo = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { score: number, insight: string }>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/ai/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignData: "Simulated market data for a generic AI-first marketing platform." })
      });
      const data = await response.json();
      setLoading(false);
      setResult({
        score: Math.floor(Math.random() * 15) + 85,
        insight: data.prediction || "Campaign signal parity reached. ROI threshold projection: +31.4% with current creative trajectory."
      });
    } catch (err) {
      setLoading(false);
      setResult({
        score: 91,
        insight: "Neural pathways temporarily offline. Reverting to base projection: High-conversion potential in upper tier segments."
      });
    }
  };

  return (
    <section id="demo" className="py-24 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight italic">
            Intelligence <br/><span className="text-blue-500">Unbound.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            While others analyze historical data, we synthesize future outcomes. Our engine doesn't report to you; it operates for you.
          </p>
          <div className="space-y-6">
            {[
              "End-to-end campaign deployment",
              "Sub-100ms latency execution",
              "Self-healing budget allocation",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative glass-card p-8 border-white/10">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
             </div>
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">Neural_Cluster_09</span>
          </div>

          {!result && !loading ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold text-white mb-4">Initialize Intelligence Simulation</h3>
              <p className="text-slate-500 text-sm mb-10 max-w-xs mx-auto">Analyze thousands of hypothetical market shifts in seconds.</p>
              <button 
                onClick={runAnalysis}
                className="btn-primary px-10 py-4 w-full sm:w-auto"
              >
                Compute Outcomes
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-10">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute inset-2 border-2 border-purple-500/20 border-t-purple-500 rounded-full"
                />
              </div>
              <p className="text-xs font-mono text-blue-400 tracking-[0.2em] animate-pulse">SYNTHESIZING MARKET VECTORS...</p>
            </div>
          ) : result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                   <div className="text-[10px] text-slate-500 uppercase mb-1 font-mono">Efficiency Index</div>
                   <div className="text-5xl font-bold text-white tracking-tighter">{result.score}%</div>
                </div>
                <div className="flex items-end pb-1.5">
                  <div className="h-8 w-full bg-white/5 rounded-lg overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest italic">Synthetic Insight</div>
                <p className="text-sm text-slate-400 leading-relaxed font-mono">
                  "{result.insight}"
                </p>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="text-xs text-slate-600 hover:text-white transition-colors uppercase tracking-widest font-bold"
              >
                Reset Engine
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const AIToolkit = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'audience' | 'analytics' | 'abtest' | 'competitor' | 'blog'>('content');
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState('');
  const [keywords, setKeywords] = useState('');
  const [versionA, setVersionA] = useState('');
  const [versionB, setVersionB] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleGenerate = async () => {
    if (activeTab !== 'abtest' && activeTab !== 'competitor' && activeTab !== 'blog' && !inputData.trim()) return;
    if (activeTab === 'competitor' && (!inputData.trim() || !competitorUrls.trim())) return;
    if (activeTab === 'blog' && (!inputData.trim())) return;
    if (activeTab === 'abtest' && (!versionA.trim() || !versionB.trim() || !targetAudience.trim())) return;
    
    setLoading(true);
    setResult(null);
    try {
      if (activeTab === 'content') {
        const data = await generateContentIdeas(inputData);
        setResult(data);
      } else if (activeTab === 'audience') {
        const data = await generateAudienceSegments(inputData);
        setResult(data);
      } else if (activeTab === 'analytics') {
        const data = await generateCampaignAnalytics(inputData);
        setResult(data);
      } else if (activeTab === 'abtest') {
        const data = await compareCreatives(versionA, versionB, targetAudience);
        setResult(data);
      } else if (activeTab === 'competitor') {
        const data = await generateCompetitorAnalysis(inputData, competitorUrls);
        setResult(data);
      } else if (activeTab === 'blog') {
        const data = await generateBlogArticle(inputData, keywords);
        setResult(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'content', label: 'Content Ideas', icon: <PenTool size={18} /> },
    { id: 'audience', label: 'Audience Segments', icon: <Users size={18} /> },
    { id: 'analytics', label: 'Campaign Analyst', icon: <PieChart size={18} /> },
    { id: 'abtest', label: 'A/B Creative Lab', icon: <Split size={18} /> },
    { id: 'competitor', label: 'Competitor Intel', icon: <Sword size={18} /> },
    { id: 'blog', label: 'Neural Blog', icon: <FileText size={18} /> },
  ];

  return (
    <section id="toolkit" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">AI Strategy <span className="text-blue-500">Suite</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Direct access to our most powerful predictive engines. Enter your data and let the neural network plan your growth.
          </p>
        </div>

        <div className="glass-card overflow-hidden border-white/5">
          <div className="flex border-b border-white/5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setResult(null);
                  setInputData('');
                }}
                className={`flex-1 py-6 flex items-center justify-center gap-3 transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white/5 text-blue-500 border-b-2 border-blue-500' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                }`}
              >
                {tab.icon}
                <span className="font-bold text-sm uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                {activeTab !== 'abtest' ? (
                  <>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                      {activeTab === 'content' && 'Describe your business or product'}
                      {activeTab === 'audience' && 'Paste raw user data or customer profiles'}
                      {activeTab === 'analytics' && 'Provide campaign performance data (CPC, CTR, Conversion)'}
                    </label>
                    <textarea
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder={
                        activeTab === 'content' 
                          ? 'e.g., A boutique plant shop specializing in rare succulents for city apartments...' 
                          : activeTab === 'audience'
                          ? 'e.g., Active in last 3 months, High average order value, Prefers mobile shopping...'
                          : activeTab === 'competitor'
                          ? 'Describe your business model and target market...'
                          : activeTab === 'blog'
                          ? 'What is the topic of the blog? (e.g., The Future of AI in Crypto Marketing...)'
                          : 'e.g., Facebook Ads: $500 spend, 250 clicks, 12 sales, ROI 1.5x...'
                      }
                      className="w-full h-48 bg-bg border border-white/10 rounded-2xl p-6 text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none mb-6"
                    />

                    {activeTab === 'competitor' && (
                      <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Competitor URLs / Names</label>
                        <input 
                          value={competitorUrls}
                          onChange={(e) => setCompetitorUrls(e.target.value)}
                          placeholder="e.g., competitor-a.com, competitor-b.ai..."
                          className="w-full bg-bg border border-white/10 rounded-xl p-4 text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    )}

                    {activeTab === 'blog' && (
                      <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Target Keywords (Optional)</label>
                        <input 
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          placeholder="e.g., neural marketing, predictive ROI, AI automation..."
                          className="w-full bg-bg border border-white/10 rounded-xl p-4 text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Audience Context</label>
                      <input 
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="e.g., Tech-savvy millennials interested in sustainable living"
                        className="w-full bg-bg border border-white/10 rounded-xl p-4 text-slate-300 text-sm focus:border-blue-500/50 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Version A</label>
                        <textarea 
                          value={versionA}
                          onChange={(e) => setVersionA(e.target.value)}
                          placeholder="Headline, subtext, or creative description..."
                          className="w-full h-32 bg-bg border border-white/10 rounded-xl p-4 text-slate-300 text-xs focus:border-blue-500/50 outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-2">Version B</label>
                        <textarea 
                          value={versionB}
                          onChange={(e) => setVersionB(e.target.value)}
                          placeholder="Headline, subtext, or creative description..."
                          className="w-full h-32 bg-bg border border-white/10 rounded-xl p-4 text-slate-300 text-xs focus:border-purple-500/50 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={loading || (activeTab === 'abtest' ? (!versionA.trim() || !versionB.trim() || !targetAudience.trim()) : !inputData.trim())}
                  className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <Sparkles size={20} />
                  )}
                  {loading ? 'Synthesizing...' : `Generate ${tabs.find(t => t.id === activeTab)?.label}`}
                </button>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 min-h-[300px] relative">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                    >
                      <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
                      <h4 className="text-xl font-bold text-white mb-2 italic">Thinking...</h4>
                      <p className="text-sm text-slate-500">Mapping data clusters and calculating predictive trajectories.</p>
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full overflow-y-auto space-y-6"
                    >
                      {activeTab === 'content' && (
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Blog Post Vectors</h4>
                            <div className="space-y-3">
                              {result.blogPosts.map((post: any, i: number) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                  <div className="font-bold text-white mb-2">{post.title}</div>
                                  <div className="text-[10px] text-slate-500 italic flex gap-2">
                                    <Zap size={12} /> {post.focus}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Social Media Signals</h4>
                            <div className="space-y-3">
                              {result.socialMedia.map((social: any, i: number) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                  <div className="text-[10px] text-emerald-500 uppercase mb-2 font-mono tracking-widest">{social.platform}</div>
                                  <div className="text-slate-300 text-sm mb-3">{social.content}</div>
                                  <div className="text-[10px] text-slate-500 italic">Strategy: {social.focus}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-purple-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Ad Copy Variants</h4>
                            <div className="space-y-3">
                              {result.adCopy.map((ad: any, i: number) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                  <div className="text-[10px] text-gray-500 uppercase mb-2 font-mono tracking-widest">{ad.platform}</div>
                                  <div className="text-slate-300 text-sm mb-3 leading-relaxed">"{ad.copy}"</div>
                                  <div className="text-[10px] text-purple-400 font-bold bg-purple-500/10 w-fit px-2 py-0.5 rounded">AI Rationale: {ad.focus}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'audience' && (
                        <div className="space-y-6">
                          <h4 className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Neural Audience Segments</h4>
                          {result.map((segment: any, i: number) => (
                            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all">
                              <h5 className="text-white font-bold text-lg mb-2">{segment.name}</h5>
                              <p className="text-xs text-slate-400 mb-4 font-medium">{segment.characteristics}</p>
                              <div className="bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
                                <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Recommended Engagement</div>
                                <div className="text-xs text-slate-300 leading-relaxed font-mono italic">"{segment.marketingStrategy}"</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'analytics' && (
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Performance Trends</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {result.trends.map((trend: any, i: number) => (
                                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-300 font-medium flex gap-2 items-center">
                                  <LineChart size={14} className="text-emerald-500" /> {trend}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                            <h4 className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-2 italic">Success Prediction</h4>
                            <p className="text-white font-bold text-xl leading-snug">{result.prediction}</p>
                          </div>
                          <div>
                            <h4 className="text-purple-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Actionable Optimizations</h4>
                            <div className="space-y-2">
                              {result.recommendations.map((rec: any, i: number) => (
                                <div key={i} className="flex gap-3 text-sm text-slate-400 items-start">
                                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                  {rec}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'abtest' && (
                        <div className="space-y-8">
                          <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Creative Combat Results</h4>
                            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded-full tracking-widest border border-emerald-500/20">
                              Winner: Version {result.winner}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className={`p-4 rounded-2xl border ${result.winner === 'A' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-white/5 border-white/5 opacity-60'}`}>
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-slate-400">VERSION A</span>
                                <span className={`text-xl font-bold ${result.winner === 'A' ? 'text-blue-500' : 'text-slate-500'}`}>{result.versionA.score}</span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <div className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Strengths</div>
                                  <div className="space-y-1">
                                    {result.versionA.strengths.map((s: string, i: number) => (
                                      <div key={i} className="text-[10px] text-slate-300 flex gap-2">
                                        <CheckCircle2 size={10} className="text-emerald-500 mt-0.5" /> {s}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-red-400 uppercase font-bold mb-1">Weaknesses</div>
                                  <div className="space-y-1">
                                    {result.versionA.weaknesses.map((w: string, i: number) => (
                                      <div key={i} className="text-[10px] text-slate-500 flex gap-2">
                                        <X size={10} className="text-red-400 mt-0.5" /> {w}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className={`p-4 rounded-2xl border ${result.winner === 'B' ? 'bg-purple-500/5 border-purple-500/20' : 'bg-white/5 border-white/5 opacity-60'}`}>
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-slate-400">VERSION B</span>
                                <span className={`text-xl font-bold ${result.winner === 'B' ? 'text-purple-500' : 'text-slate-500'}`}>{result.versionB.score}</span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <div className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Strengths</div>
                                  <div className="space-y-1">
                                    {result.versionB.strengths.map((s: string, i: number) => (
                                      <div key={i} className="text-[10px] text-slate-300 flex gap-2">
                                        <CheckCircle2 size={10} className="text-emerald-500 mt-0.5" /> {s}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-red-400 uppercase font-bold mb-1">Weaknesses</div>
                                  <div className="space-y-1">
                                    {result.versionB.weaknesses.map((w: string, i: number) => (
                                      <div key={i} className="text-[10px] text-slate-500 flex gap-2">
                                        <X size={10} className="text-red-400 mt-0.5" /> {w}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                            <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 font-bold">Neural Rationale</h4>
                            <p className="text-sm text-slate-300 leading-relaxed font-mono italic">
                              "{result.rationale}"
                            </p>
                          </div>
                        </div>
                      )}
                      {activeTab === 'competitor' && (
                        <div className="space-y-10">
                           <div>
                              <h4 className="text-red-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Competitor Differentiators</h4>
                              <div className="grid md:grid-cols-2 gap-4">
                                 {result.differentiators.map((diff: string, i: number) => (
                                   <div key={i} className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 flex items-start gap-3">
                                     <Search size={16} className="text-red-500 mt-1" />
                                     <span className="text-sm text-slate-300">{diff}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>

                           <div>
                              <h4 className="text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Industry Benchmarks</h4>
                              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                 <table className="w-full text-left">
                                    <thead>
                                       <tr className="bg-white/5">
                                          <th className="p-4 text-[10px] text-slate-500 uppercase">Metric</th>
                                          <th className="p-4 text-[10px] text-slate-500 uppercase">Comp. Avg</th>
                                          <th className="p-4 text-[10px] text-slate-500 uppercase font-bold text-orange-400">Target</th>
                                       </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                       {result.benchmarks.map((bench: any, i: number) => (
                                         <tr key={i}>
                                            <td className="p-4 text-white text-sm font-medium">{bench.metric}</td>
                                            <td className="p-4 text-slate-400 text-sm">{bench.competitorAvg}</td>
                                            <td className="p-4 text-orange-400 text-sm font-bold">{bench.targetGoal}</td>
                                         </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                 <h4 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Market Entry Points</h4>
                                 <ul className="space-y-3">
                                    {result.entryPoints.map((point: string, i: number) => (
                                      <li key={i} className="flex gap-3 text-slate-400 text-xs text-left">
                                        <ArrowRight size={14} className="text-blue-400 shrink-0" />
                                        {point}
                                      </li>
                                    ))}
                                 </ul>
                              </div>
                              <div className="glass-card p-6 border-white/10">
                                 <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4">Neural SWOT Analysis</h4>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <div className="text-[8px] text-emerald-500 uppercase font-black">Strengths</div>
                                       <div className="text-[10px] text-slate-500">{result.swot.strengths.slice(0, 2).join(', ')}...</div>
                                    </div>
                                    <div className="space-y-2">
                                       <div className="text-[8px] text-red-500 uppercase font-black">Weaknesses</div>
                                       <div className="text-[10px] text-slate-500">{result.swot.weaknesses.slice(0, 2).join(', ')}...</div>
                                    </div>
                                    <div className="space-y-2">
                                       <div className="text-[8px] text-blue-500 uppercase font-black">Opportunities</div>
                                       <div className="text-[10px] text-slate-500">{result.swot.opportunities.slice(0, 2).join(', ')}...</div>
                                    </div>
                                    <div className="space-y-2">
                                       <div className="text-[8px] text-orange-500 uppercase font-black">Threats</div>
                                       <div className="text-[10px] text-slate-500">{result.swot.threats.slice(0, 2).join(', ')}...</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      )}

                      {activeTab === 'blog' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-start">
                              <div className="max-w-2xl">
                                <h4 className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">Generated SEO Article</h4>
                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{result.title}</h3>
                              </div>
                              <div className="flex gap-2">
                                {!isSpeaking ? (
                                  <button 
                                    onClick={() => speak(result.content)}
                                    className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
                                  >
                                    <Volume2 size={16} /> Listen
                                  </button>
                                ) : (
                                  <button 
                                    onClick={stopSpeaking}
                                    className="p-3 bg-red-600/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold border-red-500"
                                  >
                                    <VolumeX size={16} /> Stop
                                  </button>
                                )}
                              </div>
                           </div>

                           <div className="glass-card p-8 border-white/10 bg-white/[0.02]">
                              <div className="prose prose-invert max-w-none">
                                {result.content.split('\n').map((para: string, i: number) => (
                                  <p key={i} className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                                    {para}
                                  </p>
                                ))}
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                 <h5 className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Languages size={14} /> Optimized Keywords
                                 </h5>
                                 <div className="flex flex-wrap gap-2">
                                    {result.keywords.map((kw: string, i: number) => (
                                      <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-mono">
                                        #{kw.replace(/\s+/g, '')}
                                      </span>
                                    ))}
                                 </div>
                              </div>
                              <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                                 <h5 className="text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <BookOpen size={14} /> Meta Description
                                 </h5>
                                 <p className="text-xs text-slate-400 italic leading-relaxed">
                                    "{result.metaDescription}"
                                 </p>
                              </div>
                           </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center opacity-30">
                      <Layout className="mb-6" size={48} />
                      <h4 className="text-xl font-bold text-white mb-2">Awaiting Synthesis</h4>
                      <p className="text-sm">Enter your data on the left to activate the engine.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const AIDashboard = () => {
  const successData = [
    { name: 'Jan', rate: 62 },
    { name: 'Feb', rate: 68 },
    { name: 'Mar', rate: 75 },
    { name: 'Apr', rate: 82 },
    { name: 'May', rate: 88 },
    { name: 'Jun', rate: 94 },
  ];

  const roiData = [
    { name: 'W1', value: 2.4 },
    { name: 'W2', value: 3.8 },
    { name: 'W3', value: 3.2 },
    { name: 'W4', value: 5.6 },
    { name: 'W5', value: 7.2 },
    { name: 'W6', value: 8.4 },
  ];

  const timeSavedData = [
    { label: 'Manual', hours: 42, color: '#475569' },
    { label: 'AI Hybrid', hours: 14, color: '#3b82f6' },
    { label: 'Autonomous', hours: 0.2, color: '#8b5cf6' },
  ];

  return (
    <section id="dashboard" className="py-32 bg-bg/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">Performance <span className="text-blue-500">Analytics</span></h2>
            <p className="text-secondary text-lg leading-relaxed">
              Real-time visualization of the engine's impact. Monitoring neural efficiency, ROI velocity, and operational compression.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="glass-card px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Activity className="text-emerald-500" size={20} />
              </div>
              <div>
                <div className="text-[10px] text-secondary uppercase font-bold tracking-widest">Network Load</div>
                <div className="text-lg font-bold text-primary">Optimal</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* KPI Card 1: Success Rate */}
          <div className="lg:col-span-2 glass-card p-8 border-line">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-primary font-bold text-lg mb-1 flex items-center gap-2">
                  <Target size={18} className="text-blue-500" />
                  Campaign Success Rate
                </h3>
                <p className="text-xs text-secondary">Neural accuracy scaling over deployment cycles</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">94.2%</div>
                <div className="text-[10px] text-secondary font-mono tracking-widest uppercase">Current Peak</div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={successData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0C10', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#3b82f6', fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRate)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KPI Card 2: Strategy Time Saved */}
          <div className="glass-card p-8 border-white/10 flex flex-col">
            <div className="mb-10">
              <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                <Clock size={18} className="text-purple-500" />
                Strategy Compression
              </h3>
              <p className="text-xs text-slate-500">Drastic reduction in manual strategy development time</p>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8">
              {timeSavedData.map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{item.label}</span>
                    <span className="text-sm font-mono text-white">{item.hours}h</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.hours / 42) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Time Saved</span>
              <span className="text-2xl font-bold text-purple-400">97.4%</span>
            </div>
          </div>

          {/* KPI Card 3: Neural ROAS Acceleration */}
          <div className="lg:col-span-3 glass-card p-8 border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                  <TrendingUp size={18} className="text-emerald-500" />
                  Neural ROAS Acceleration
                </h3>
                <p className="text-xs text-slate-500">Autonomous budget steering across global ad inventories</p>
              </div>
              
              <div className="flex gap-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white tracking-tighter">8.4x</div>
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Avg Multiplier</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white tracking-tighter">12ms</div>
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Decision Latency</div>
                </div>
              </div>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}x`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0C10', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981', fontSize: '12px' }}
                  />
                  <ReLine 
                    type="stepAfter" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#0A0C10' }}
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadCapture = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ email: '', company: '', interest: 'Predictive Analytics' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="connect" className="py-32 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Sync Your <span className="text-blue-500">Growth</span></h2>
        <p className="text-slate-400 text-lg mb-12">Connect your ecosystem to our neural network. Our strategists will help you map your AI migration path.</p>
        
        <div className="glass-card p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Lead Synced to CRM</h3>
                <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Awaiting Engine Response...</p>
              </motion.div>
            ) : (
              <motion.form 
                exit={{ opacity: 0, y: 20 }}
                onSubmit={handleSubmit} 
                className="grid md:grid-cols-2 gap-6 text-left"
              >
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Work Email</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.ai"
                    className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Company Velocity</label>
                  <input 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Your Company Name"
                    className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Neural Focus</label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all appearance-none"
                  >
                    <option>Predictive Analytics</option>
                    <option>Autonomous Creative</option>
                    <option>Audience Synthesis</option>
                    <option>Full Engine Integration</option>
                  </select>
                </div>
                <div className="col-span-2 pt-4">
                  <button 
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg"
                  >
                    {status === 'loading' ? <RefreshCw className="animate-spin" /> : <Sparkles />}
                    Initialize Integration
                  </button>
                  {status === 'error' && <p className="text-red-400 text-xs mt-4 text-center">Engine connection timeout. Please try again.</p>}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 pb-20">
         <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BrainCircuit className="text-white" size={18} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white uppercase">AdMind<span className="text-blue-500 italic lowercase tracking-wider">AI</span></span>
            </div>
            <p className="text-slate-500 max-w-sm mb-12 leading-relaxed text-sm">
              Revolutionizing digital marketing through autonomous intelligence. Built in the Cloud for the scale of tomorrow.
            </p>
            <div className="flex gap-8 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
         </div>
         <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-xs text-slate-600 mb-4 uppercase tracking-widest">Connect with Engine</p>
              <div className="flex gap-4 justify-end mb-8">
                {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
                  <a key={s} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-500 text-slate-400 hover:text-white transition-all cursor-pointer">
                    <span className="text-xs font-bold">{s[0]}</span>
                  </a>
                ))}
              </div>
              <a href="#connect" className="px-8 py-4 bg-blue-600 text-white rounded-full text-sm font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 inline-block">
                Initialize Integration
              </a>
            </div>
            <div className="text-[10px] text-slate-700 tracking-widest uppercase mt-20">
              Powered by NeuralMesh 4.0 · Status: All Systems Nominal
            </div>
         </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string, text: string, sender: 'user' | 'agent', timestamp: string }[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    { text: "What is Neural ROAS?", icon: <TrendingUp size={12} /> },
    { text: "How does the AI optimize ad spend?", icon: <Activity size={12} /> },
    { text: "Show me a strategy demo", icon: <Layout size={12} /> },
    { text: "Compare with competitors", icon: <Sword size={12} /> },
  ];

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.sender === 'agent') {
        setIsTyping(false);
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (textToSend?: string) => {
    const text = textToSend || message;
    if (!text.trim() || !socket) return;

    socket.emit('message', {
      text,
      sender: 'user'
    });
    setMessage('');
    setIsTyping(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card w-[380px] h-[550px] mb-4 flex flex-col overflow-hidden border-white/10 shadow-2xl"
          >
            <div className="p-4 bg-blue-600 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest">Neural Support</div>
                  <div className="text-[10px] opacity-80">All systems nominal</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg/50 scroll-smooth">
              {messages.length === 0 && !isTyping && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare size={32} className="text-blue-500" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Awaiting Command</h4>
                  <p className="text-xs text-slate-500 mb-8 max-w-[200px] mx-auto">Select a neural vector or ask the engine directly.</p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm shadow-lg shadow-blue-600/10'
                        : 'bg-white/5 border border-white/10 text-slate-300 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[9px] opacity-40 mt-1 uppercase font-mono">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 text-slate-400 p-3 rounded-2xl rounded-bl-sm flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1 h-1 bg-current rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1 h-1 bg-current rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-1 h-1 bg-current rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-bg border-t border-white/5 space-y-4">
              {messages.length < 5 && (
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion.text)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/30 transition-all active:scale-95 whitespace-nowrap"
                    >
                      {suggestion.icon}
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              )}

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }} 
                className="flex gap-2"
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Talk to the engine..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-700"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  <Zap size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 transition-all active:scale-90 relative group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        {messages.length > 0 && !isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-bg">
            {messages.length}
          </div>
        )}
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg relative selection:bg-blue-500 selection:text-white">
      {/* Background Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>
      
      <Navbar />
      <Hero />
      <Services />
      <AIDashboard />
      <AIDemo />
      <AIToolkit />
      <LeadCapture />
      <Footer />
      <ChatWidget />
    </div>
  );
}

