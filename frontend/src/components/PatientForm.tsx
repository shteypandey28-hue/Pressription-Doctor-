import { usePrescriptionStore } from "@/store/prescriptionStore";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PatientForm() {
    const { patient, setPatient } = usePrescriptionStore();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <Input
                        placeholder="John Doe"
                        value={patient.name}
                        onChange={(e) => setPatient({ name: e.target.value })}
                    />
                </div>
                <div className="col-span-2">
                    <label className="text-sm font-medium mb-1 block">Age</label>
                    <Input
                        placeholder="Age"
                        type="number"
                        value={patient.age}
                        onChange={(e) => setPatient({ age: e.target.value })}
                    />
                </div>
                <div className="col-span-3">
                    <label className="text-sm font-medium mb-1 block">Gender</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={patient.gender}
                        onChange={(e) => setPatient({ gender: e.target.value })}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="text-sm font-medium mb-1 block">Weight (kg)</label>
                    <Input
                        placeholder="Kg"
                        value={patient.weight || ''}
                        onChange={(e) => setPatient({ weight: e.target.value })}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export function PrescriptionDetailsForm() {
    const { diagnosis, notes, setDiagnosis, setNotes } = usePrescriptionStore();

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Diagnosis & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Diagnosis</label>
                    <Input
                        placeholder="e.g. Viral Fever, Type 2 Diabetes"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">Notes / Advice</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="e.g. Drink plenty of water, avoid spicy food..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
