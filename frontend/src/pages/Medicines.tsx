import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MEDICINES_MOCK } from "@/lib/mockData";
import { Plus, Search, Pill, Tablet, Trash2, Edit } from "lucide-react";

export function Medicines() {
    const [searchTerm, setSearchTerm] = useState("");
    const [medicines, setMedicines] = useState(MEDICINES_MOCK);

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Medicine Directory</h2>
                    <p className="text-slate-500 mt-2">Manage your pharmacy database and inventory.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add New Medicine
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search medicines..."
                        className="pl-10 text-lg h-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm text-slate-500">
                    Showing {filteredMedicines.length} results
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedicines.map((med) => (
                    <Card key={med.id} className="hover:shadow-md transition-shadow group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    {med.type === 'Tablet' ? <Tablet className="w-6 h-6" /> : <Pill className="w-6 h-6" />}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <Edit className="w-4 h-4 text-slate-500" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{med.name}</h3>
                                <p className="text-sm text-slate-500 mb-4">{med.type}</p>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-slate-50 p-2 rounded">
                                        <span className="block text-xs text-slate-400 uppercase">Default Dose</span>
                                        <span className="font-medium text-slate-700">{med.defaultDosage}</span>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded">
                                        <span className="block text-xs text-slate-400 uppercase">Frequency</span>
                                        <span className="font-medium text-slate-700">{med.defaultFreq}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
