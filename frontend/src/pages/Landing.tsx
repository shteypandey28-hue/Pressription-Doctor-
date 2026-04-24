import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, Zap, Play, ShieldCheck, HeartPulse, Stethoscope, Microscope, Users, Star } from "lucide-react";

export function Landing() {
    return (
        <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden bg-white">
            {/* Navbar Overlay */}
            <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 p-2 pr-4 rounded-full border border-white/20 shadow-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-slate-800 md:text-white tracking-wide mix-blend-difference">Prescripto</span>
                </div>
                <div className="space-x-3 md:space-x-4 flex items-center">
                    <Link to="/login">
                        <Button variant="ghost" className="text-slate-800 md:text-white hover:bg-white/10 hover:text-white rounded-full px-6 mix-blend-difference">Log In</Button>
                    </Link>
                    <Link to="/login">
                        <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section with Video */}
            <main className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden selection:bg-blue-500/30 text-white perspective-1000">
                {/* Video Background */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-white z-10 opacity-90"></div>
                    {/* HD Medicine / Lab Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-105"
                    >
                        {/* Alternative High Quality Lab/Medicine Video */}
                        <source src="https://videos.pexels.com/video-files/7578796/7578796-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" alt="Doctor Background" className="w-full h-full object-cover" />
                    </video>
                </div>

                <div className="relative z-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-6xl mx-auto mt-10">
                    {/* Floating Elements */}
                    <div className="absolute -left-20 top-0 lg:block hidden animate-bounce duration-[3000ms]">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl rotate-12">
                            <Microscope className="w-12 h-12 text-blue-300" />
                        </div>
                    </div>
                    <div className="absolute -right-20 bottom-20 lg:block hidden animate-bounce duration-[4000ms]">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl -rotate-6">
                            <Stethoscope className="w-10 h-10 text-teal-300" />
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        #1 Choice for Modern Clinics
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[1] drop-shadow-2xl">
                        FUTURE OF <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 animate-gradient-x bg-[length:200%_auto]">PRESCRIBING</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-lg glass-text">
                        Generate error-free, AI-verified prescriptions in seconds.
                        Trusted by top hospitals worldwide.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link to="/app">
                            <Button size="lg" className="h-16 px-12 text-xl font-bold gap-3 rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-400/50 shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(37,99,235,0.7)]">
                                Get Started Free <Zap className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                            </Button>
                        </Link>
                        <button className="flex items-center gap-3 text-white font-semibold hover:text-blue-200 transition-colors group">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110">
                                <Play className="w-6 h-6 fill-white ml-1" />
                            </div>
                        </button>
                    </div>

                    {/* Stats Strip */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto w-full">
                        {[
                            { label: "Doctors", value: "10k+" },
                            { label: "Prescriptions", value: "5M+" },
                            { label: "Accuracy", value: "99.9%" },
                            { label: "Saved Hours", value: "500k+" },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                                <span className="text-slate-300 text-sm uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Features Grid - Asymmetrical Layout */}
            <section className="relative z-20 py-32 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Built for Speed & Safety.</h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">We redesigned the entire prescription workflow to be 10x faster than traditional software.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/30">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">Lightning Fast</h3>
                                <p className="text-slate-500 text-lg leading-relaxed">Type-free experience. Our AI predicts your next medicine, dosage, and advice instantly as you type.</p>
                            </div>
                        </div>

                        {/* Feature 2 - Large Card */}
                        <div className="lg:col-span-2 p-10 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 text-white relative overflow-hidden group">
                            {/* Animated Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-50"></div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 h-full">
                                <div className="flex-1">
                                    <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-teal-500/30">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Clinical Grade Safety</h3>
                                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                        Real-time interaction checks against a database of 50,000+ drugs.
                                        <br />Detailed allergy warnings and contraindications alerts.
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 text-teal-400 bg-teal-500/10 px-4 py-2 rounded-full border border-teal-500/20">
                                            <Check /> FDA Database
                                        </div>
                                        <div className="flex items-center gap-2 text-teal-400 bg-teal-500/10 px-4 py-2 rounded-full border border-teal-500/20">
                                            <Check /> WHO Guidelines
                                        </div>
                                    </div>
                                </div>
                                {/* Abstract UI representation */}
                                <div className="flex-1 w-full p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 opacity-80 rotate-2 transition-transform group-hover:rotate-0 duration-500">
                                    <div className="h-4 w-32 bg-white/20 rounded mb-4"></div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-white/10 rounded"></div>
                                        <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                                        <div className="h-2 w-4/6 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <div className="h-8 w-8 bg-teal-500 rounded-full"></div>
                                        <div className="h-8 w-24 bg-blue-600 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-purple-600/30">
                                <HeartPulse className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-slate-900">Patient History</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">Securely store patient records. Access past prescriptions and trends instantly from any device.</p>
                        </div>
                        {/* Feature 4 */}
                        <div className="lg:col-span-2 p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/30">
                                    <Star className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">Smart Templates</h3>
                                <p className="text-slate-500 text-lg leading-relaxed">Create custom templates for common ailments (e.g., "Viral Fever", "Hypertension") and prescribe in 1 click.</p>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                {["Fever", "Cold", "Diabetes", "Pain"].map(t => (
                                    <div key={t} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 font-medium text-center hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer">
                                        {t} Protocol
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-slate-950 text-slate-400 py-20 text-center text-sm border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center justify-center gap-4 mb-8 opacity-80">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-2xl text-white tracking-tight">Prescripto</span>
                    </div>
                    <p className="mb-8 max-w-md mx-auto">Empowering 10,000+ doctors to deliver better care through technology.</p>
                    <div className="flex gap-6 justify-center text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <p className="mt-12 opacity-30">© 2026 Prescripto Inc. Built with care for Doctors.</p>
                </div>
            </footer>
        </div>
    );
}

function Check() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    )
}
