import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Mail, Lock, User, Chrome, Loader2, ArrowLeft, ScanFace } from "lucide-react";

export function AuthPage() {
    const navigate = useNavigate();
    const { login, signup, googleLogin, savedUser, isLocked, verifyPin, logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [pin, setPin] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Parallax Effect Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            await login(formData.get("email") as string, formData.get("password") as string);
            navigate("/app");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            await signup(
                formData.get("name") as string,
                formData.get("email") as string,
                formData.get("password") as string
            );
            navigate("/app");
        } catch (err) {
            setError("Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await googleLogin();
            navigate("/app");
        } catch (err) {
            setError("Google Login failed");
        } finally {
            setIsLoading(false);
        }
    }

    const handlePinLogin = (val: string) => {
        setPin(val);
        if (val.length === 4) {
            if (verifyPin(val)) {
                navigate("/app");
            } else {
                setError("Incorrect PIN");
                setPin("");
            }
        }
    }

    // PIN / Locked Screen Mode
    if ((isLocked || savedUser?.pin) && savedUser) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center font-sans">
                {/* Background Same as Login */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950/80 to-slate-950 animate-aurora opacity-70"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                </div>

                <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-600 p-1 mb-4 shadow-lg shadow-blue-500/30">
                        <img src={savedUser.avatar || "https://github.com/shadcn.png"} alt="User" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">Welcome back, {savedUser.name.split(' ')[0]}</h2>
                    <p className="text-slate-400 text-sm mb-8">Enter your PIN to unlock</p>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-8">
                        <Input
                            type="password"
                            maxLength={4}
                            autoFocus
                            className="text-center text-3xl tracking-[1em] font-bold bg-transparent border-none text-white focus-visible:ring-0 placeholder:text-slate-700 h-10 w-48"
                            placeholder="••••"
                            value={pin}
                            onChange={(e) => handlePinLogin(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm mb-4 animate-shake">{error}</p>}

                    <button onClick={() => { logout(); navigate("/login"); }} className="text-slate-500 hover:text-white text-sm transition-colors">
                        Switch Account / Login with Password
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center font-sans">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {/* Aurora Mesh Gradient */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950/80 to-slate-950 animate-aurora opacity-70"></div>

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>

                {/* Floating Medical Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse duration-3000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] animate-pulse duration-5000 delay-1000"></div>
            </div>

            {/* Main Glass Card */}
            <div
                className="relative z-10 w-full max-w-[1000px] h-[600px] flex rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/5 backdrop-blur-xl bg-slate-900/40 transition-transform duration-100 ease-out"
                style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
                }}
            >

                {/* Left Side: Brand & Feature Showcase */}
                <div className="hidden lg:flex flex-col justify-between p-10 w-5/12 bg-gradient-to-br from-blue-600/20 to-transparent relative">
                    <Link to="/" className="flex items-center gap-3 text-white z-10 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
                            <Activity className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="font-bold text-xl tracking-wide">Prescripto</span>
                    </Link>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">Access the future of healthcare.</h2>
                        <p className="text-blue-200/60 text-sm mb-8">Secure, AI-driven prescription management for the modern era.</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
                                <ScanFace className="w-8 h-8 text-teal-400 bg-teal-500/10 p-1.5 rounded-lg group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="text-white font-medium text-sm">Biometric Access</p>
                                    <p className="text-slate-400 text-xs">TouchID & FaceID Ready</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
                                <div className="relative">
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">System Status: <span className="text-green-400">Operational</span></p>
                                    <p className="text-slate-400 text-xs">99.99% Uptime • Low Latency</p>
                                </div>
                            </div>
                        </div>

                        {/* Simulated News Ticker */}
                        <div className="mt-8 p-4 rounded-xl bg-blue-900/20 border border-blue-500/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Latest Update</span>
                            </div>
                            <p className="text-xs text-blue-100/70 leading-relaxed">
                                "New AI interaction check module v2.4 released. 15,000 new drug pairs added for safety verification."
                            </p>
                        </div>
                    </div>

                    <div className="text-xs text-blue-200/30 font-mono">
                        SECURE CONNECTION // ENCRYPTED
                    </div>
                </div>

                {/* Right Side: Auth Forms */}
                <div className="flex-1 p-10 bg-slate-950/60 backdrop-blur-sm flex flex-col justify-center relative">
                    <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>

                    <div className="max-w-xs mx-auto w-full">
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/20 p-1 border border-white/5 rounded-xl">
                                <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">Sign Up</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login" className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-300 text-xs uppercase tracking-wider">Email</Label>
                                        <div className="relative group">
                                            <Input id="email" name="email" placeholder="doctor@clinic.com" required
                                                className="pl-4 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-300 text-xs uppercase tracking-wider">Password</Label>
                                        <Input id="password" name="password" type="password" required
                                            className="pl-4 h-11 bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl"
                                        />
                                    </div>
                                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                                    <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all transform hover:scale-[1.02]" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin" /> : "Authenticate"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup" className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <form onSubmit={handleSignup} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-300 text-xs uppercase tracking-wider">Full Name</Label>
                                        <Input id="s-name" name="name" placeholder="Dr. Name" required
                                            className="pl-4 h-11 bg-white/5 border-white/10 text-white focus:border-blue-500/50 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-300 text-xs uppercase tracking-wider">Email</Label>
                                        <Input id="s-email" name="email" placeholder="name@example.com" required
                                            className="pl-4 h-11 bg-white/5 border-white/10 text-white focus:border-blue-500/50 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-300 text-xs uppercase tracking-wider">Password</Label>
                                        <Input id="s-password" name="password" type="password" required
                                            className="pl-4 h-11 bg-white/5 border-white/10 text-white focus:border-blue-500/50 rounded-xl"
                                        />
                                    </div>
                                    <Button className="w-full h-11 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white rounded-xl shadow-lg transition-all transform hover:scale-[1.02]" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin" /> : "Initialize Account"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <Button variant="outline" className="h-10 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl" onClick={handleGoogleLogin}>
                                <Chrome className="mr-2 h-4 w-4" /> Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

