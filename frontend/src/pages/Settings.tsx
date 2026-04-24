import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetupPin } from "@/components/SetupPin";
import { usePrescriptionStore } from "@/store/prescriptionStore";

export function Settings() {
    const { template, setTemplate } = usePrescriptionStore();
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
                <p className="text-slate-500 mt-2">Manage your clinic details and preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Clinic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Clinic Name</label>
                            <Input defaultValue="Dr. Strange Health Clinic" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Doctor Name</label>
                            <Input defaultValue="Dr. Stephen Strange" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Qualification</label>
                            <Input defaultValue="MBBS, MD (General Medicine)" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Registration No.</label>
                            <Input defaultValue="12345678" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium">Address</label>
                            <Input defaultValue="177A Bleecker Street, New York, NY" />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Application Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-sm text-slate-500">Switch between light and dark themes.</p>
                        </div>
                        <Button variant="outline">Coming Soon</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Auto-Print</p>
                            <p className="text-sm text-slate-500">Automatically open print dialog after saving.</p>
                        </div>
                        <Button variant="outline">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50 border-blue-100">
                        <div>
                            <p className="font-medium text-blue-900">Quick Access PIN</p>
                            <p className="text-sm text-blue-600">Set a 4-digit PIN for faster login.</p>
                        </div>
                        <SetupPin />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Prescription Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${template === 'default' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                            onClick={() => setTemplate('default')}
                        >
                            <h3 className="font-bold text-lg mb-2">Default</h3>
                            <div className="h-32 bg-white border border-slate-200 rounded shadow-sm flex flex-col p-2 gap-2 text-[8px]">
                                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                                <div className="flex gap-2 border-b pb-1">
                                    <div className="h-2 bg-slate-100 rounded w-1/4"></div>
                                    <div className="h-2 bg-slate-100 rounded w-1/4"></div>
                                </div>
                                <div className="h-10 bg-slate-50 rounded"></div>
                                <div className="h-4 bg-slate-100 rounded w-1/3 mt-auto"></div>
                            </div>
                        </div>

                        <div 
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${template === 'modern' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                            onClick={() => setTemplate('modern')}
                        >
                            <h3 className="font-bold text-lg mb-2">Modern</h3>
                            <div className="h-32 bg-white border-t-4 border-t-blue-500 border-x border-b border-slate-200 rounded shadow-sm flex flex-col p-2 gap-2 text-[8px]">
                                <div className="flex justify-between items-center">
                                    <div className="h-4 bg-blue-100 rounded w-1/2"></div>
                                    <div className="h-3 bg-blue-50 rounded w-1/4"></div>
                                </div>
                                <div className="flex gap-2 border-b pb-1">
                                    <div className="h-2 bg-slate-100 rounded w-1/3"></div>
                                </div>
                                <div className="h-10 bg-slate-50 rounded"></div>
                            </div>
                        </div>

                        <div 
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${template === 'classic' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                            onClick={() => setTemplate('classic')}
                        >
                            <h3 className="font-bold text-lg mb-2">Classic</h3>
                            <div className="h-32 bg-amber-50 border border-amber-200 rounded shadow-sm flex flex-col p-2 gap-2 text-[8px]">
                                <div className="h-4 bg-amber-200/50 rounded w-1/2 mx-auto mb-1"></div>
                                <div className="flex gap-2 border-b border-amber-200 pb-1">
                                    <div className="h-2 bg-amber-100 rounded w-full"></div>
                                </div>
                                <div className="h-10 bg-amber-100/30 rounded"></div>
                                <div className="flex justify-end mt-auto">
                                    <div className="h-4 bg-amber-200/50 rounded w-1/3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
