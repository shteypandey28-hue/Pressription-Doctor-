import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PatientForm, PrescriptionDetailsForm } from "@/components/PatientForm";
import { MedicineSearch } from "@/components/MedicineSearch";
import { MedicineList } from "@/components/MedicineList";
import { PrescriptionPreview } from "@/components/PrescriptionPreview";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function Dashboard() {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });

    return (
        <div className="grid grid-cols-12 gap-8 h-full">
            <div className="col-span-12 xl:col-span-7 flex flex-col gap-6 pb-20">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">1. Patient Details</h2>
                    <PatientForm />
                    <PrescriptionDetailsForm />
                </section>

                <section className="flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">2. Prescribe Medicines</h2>
                    <MedicineSearch />
                    <MedicineList />
                </section>
            </div>

            <div className="col-span-12 xl:col-span-5 xl:border-l xl:pl-8">
                <div className="sticky top-0 space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-blue-900">Ready to Print?</h3>
                            <p className="text-sm text-blue-700">Review details before generating.</p>
                        </div>
                        <Button
                            onClick={() => handlePrint()}
                            className="h-12 px-6 gap-2 shadow-lg shadow-blue-900/10"
                        >
                            <Printer className="w-5 h-5" />
                            Print
                        </Button>
                    </div>

                    {/* Live Preview */}
                    <div className="border border-slate-200 rounded-xl bg-slate-100 p-4 overflow-hidden">
                        <div className="scale-[0.6] origin-top mx-auto">
                            <PrescriptionPreview ref={componentRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
