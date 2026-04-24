import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { LayoutDashboard, Pill, User, FileText, Settings, LogOut } from "lucide-react";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/app" },
    { icon: FileText, label: "Prescriptions", href: "/app/prescriptions" },
    { icon: Pill, label: "Medicines", href: "/app/medicines" },
    { icon: User, label: "Patients", href: "/app/patients" },
    { icon: Settings, label: "Settings", href: "/app/settings" },
];

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, lockApp } = useAuthStore();

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
                    Prescripto
                </h1>
                {user ? (
                    <div className="flex items-center gap-3 mt-4 p-2 bg-slate-800 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold overflow-hidden">
                            {user.avatar ? <img src={user.avatar} alt="avatar" /> : user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-slate-400 mt-1">Smart Doctor Assistant</p>
                )}
            </div>

            <nav className="flex-1 px-4 space-y-2 py-4">
                {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.href || (item.href !== '/app' && location.pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={() => {
                        logout();
                        navigate("/");
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
