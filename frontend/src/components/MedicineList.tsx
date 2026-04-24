import { usePrescriptionStore } from "@/store/prescriptionStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function MedicineList() {
    const { medicines, removeMedicine, updateMedicine } = usePrescriptionStore();

    if (medicines.length === 0) return null;

    return (
        <div className="space-y-3 mt-6">
            {medicines.map((med) => (
                <div key={med.id} className="grid grid-cols-12 gap-3 items-end p-4 bg-white border rounded-lg shadow-sm animate-in slide-in-from-left-2 duration-300">
                    <div className="col-span-4">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Medicine</label>
                        <p className="font-semibold text-lg text-slate-900">{med.name}</p>
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Dosage</label>
                        <input
                            className="w-full bg-slate-50 border-b border-transparent focus:border-blue-500 outline-none px-1 py-1 font-medium text-slate-900"
                            value={med.dosage}
                            onChange={(e) => updateMedicine(med.id, { dosage: e.target.value })}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Frequency</label>
                        <select
                            className="w-full bg-slate-50 border-b outline-none px-1 py-1 font-medium text-slate-900"
                            value={med.frequency}
                            onChange={(e) => updateMedicine(med.id, { frequency: e.target.value })}
                        >
                            <option value="1-0-1">1-0-1 (BD)</option>
                            <option value="1-0-0">1-0-0 (OD)</option>
                            <option value="0-0-1">0-0-1 (HS)</option>
                            <option value="1-1-1">1-1-1 (TDS)</option>
                            <option value="SOS">SOS</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Duration</label>
                        <select
                            className="w-full bg-slate-50 border-b outline-none px-1 py-1 font-medium text-slate-900"
                            value={med.duration}
                            onChange={(e) => updateMedicine(med.id, { duration: e.target.value })}
                        >
                            <option value="3 days">3 days</option>
                            <option value="5 days">5 days</option>
                            <option value="7 days">7 days</option>
                            <option value="10 days">10 days</option>
                            <option value="15 days">15 days</option>
                            <option value="1 month">1 month</option>
                        </select>
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => removeMedicine(med.id)}>
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="col-span-12 mt-2">
                        <input
                            className="w-full text-sm text-slate-500 italic bg-transparent outline-none placeholder:text-slate-300"
                            placeholder="Add instruction (e.g. After food)..."
                            value={med.instruction}
                            onChange={(e) => updateMedicine(med.id, { instruction: e.target.value })}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
