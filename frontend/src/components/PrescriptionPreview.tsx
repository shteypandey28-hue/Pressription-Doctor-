import { forwardRef } from 'react';
import { usePrescriptionStore } from '@/store/prescriptionStore';
import { format } from 'date-fns';

export const PrescriptionPreview = forwardRef<HTMLDivElement>((_, ref) => {
    const { patient, medicines, template } = usePrescriptionStore();
    const date = format(new Date(), 'dd MMM yyyy');

    const getTemplateClasses = () => {
        switch (template) {
            case 'modern':
                return 'bg-white text-slate-800 border-t-[12px] border-t-blue-600 border-x border-b border-slate-200 shadow-xl rounded-b-lg font-sans';
            case 'classic':
                return 'bg-[#fdfbf7] text-slate-900 border-[16px] border-double border-amber-900/10 shadow-md font-serif';
            case 'default':
            default:
                return 'bg-white text-black shadow-sm border border-slate-100';
        }
    };

    const getHeaderClasses = () => {
        switch (template) {
            case 'modern':
                return 'border-b border-blue-100 pb-6 mb-6 flex justify-between items-start';
            case 'classic':
                return 'border-b-[3px] border-double border-amber-900/20 pb-4 mb-6 flex justify-between items-start items-center text-center';
            case 'default':
            default:
                return 'border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-start';
        }
    };

    return (
        <div ref={ref} className={`${getTemplateClasses()} p-8 mx-auto w-full aspect-[1/1.4142] flex flex-col text-sm relative transition-all duration-300`} style={{ maxWidth: '210mm', maxHeight: '297mm' }}>
            {/* Header / Clinic Info */}
            <header className={getHeaderClasses()}>
                <div className={template === 'classic' ? 'mx-auto' : ''}>
                    <h1 className="text-2xl font-bold text-slate-900">Dr. Strange Health Clinic</h1>
                    <p className="font-semibold text-slate-700">Dr. Stephen Strange</p>
                    <p className="text-xs text-slate-500">MBBS, MD (General Medicine)</p>
                    <p className="text-xs text-slate-500">Reg. No: 12345678</p>
                </div>
                {template !== 'classic' && (
                    <div className="text-right text-xs text-slate-600">
                        <p>177A Bleecker Street, New York, NY</p>
                        <p>Phone: +1 555-0199</p>
                        <p>Timing: 10:00 AM - 08:00 PM</p>
                    </div>
                )}
            </header>

            {template === 'classic' && (
                <div className="text-center text-xs text-amber-900/70 mb-6 -mt-4 border-b border-amber-900/10 pb-4">
                    177A Bleecker Street, New York, NY • +1 555-0199
                </div>
            )}

            {/* Patient Info */}
            <div className={`grid grid-cols-2 gap-4 mb-6 text-sm border-b pb-4 ${template === 'classic' ? 'border-amber-900/20' : template === 'modern' ? 'border-blue-100' : 'border-slate-200'}`}>
                <div><span className={`font-semibold ${template === 'modern' ? 'text-blue-900' : 'text-slate-600'}`}>Patient:</span> <span className="text-lg font-bold" contentEditable suppressContentEditableWarning>{patient.name || '___________'}</span></div>
                <div className="text-right"><span className={`font-semibold ${template === 'modern' ? 'text-blue-900' : 'text-slate-600'}`}>Date:</span> {date}</div>
                <div><span className={`font-semibold ${template === 'modern' ? 'text-blue-900' : 'text-slate-600'}`}>Age/Gender:</span> {patient.age || '__'} / {patient.gender}</div>
                <div className="text-right"><span className={`font-semibold ${template === 'modern' ? 'text-blue-900' : 'text-slate-600'}`}>Weight:</span> {patient.weight ? `${patient.weight} kg` : '__ kg'}</div>
            </div>

            {/* Diagnosis */}
            {(usePrescriptionStore.getState().diagnosis || true) && (
                <div className="mb-4">
                    <span className={`font-semibold mr-2 ${template === 'modern' ? 'text-blue-900' : 'text-slate-600'}`}>Diagnosis:</span>
                    <span className="font-bold text-slate-900" contentEditable suppressContentEditableWarning>{usePrescriptionStore.getState().diagnosis || '____________________'}</span>
                </div>
            )}

            {/* Medicines */}
            <div className="flex-1">
                <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${template === 'modern' ? 'text-blue-800' : template === 'classic' ? 'text-amber-900' : 'text-slate-800'}`}>
                    <span className="text-2xl">Rx</span>
                </h3>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={`border-b text-xs uppercase ${template === 'modern' ? 'border-blue-200 text-blue-700 bg-blue-50/50' : template === 'classic' ? 'border-amber-900/30 text-amber-900/80' : 'border-slate-300 text-slate-500'}`}>
                            <th className={`py-2 w-1/2 ${template === 'modern' ? 'pl-2' : ''}`}>Medicine</th>
                            <th className="py-2">Dosage</th>
                            <th className="py-2">Freq</th>
                            <th className={`py-2 text-right ${template === 'modern' ? 'pr-2' : ''}`}>Duration</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {medicines.map((med, index) => (
                            <tr key={index} className={`border-b last:border-0 ${template === 'modern' ? 'border-blue-50 hover:bg-slate-50 transition-colors' : template === 'classic' ? 'border-amber-900/10' : 'border-slate-100'}`}>
                                <td className={`py-3 pr-2 align-top ${template === 'modern' ? 'pl-2' : ''}`}>
                                    <span className="font-bold text-slate-900 block" contentEditable suppressContentEditableWarning>{index + 1}. {med.name}</span>
                                    {med.instruction && <span className="text-xs text-slate-500 italic" contentEditable suppressContentEditableWarning>({med.instruction})</span>}
                                </td>
                                <td className="py-3 align-top" contentEditable suppressContentEditableWarning>{med.dosage}</td>
                                <td className="py-3 align-top" contentEditable suppressContentEditableWarning>{med.frequency}</td>
                                <td className="py-3 align-top text-right" contentEditable suppressContentEditableWarning>{med.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {medicines.length === 0 && (
                    <div className="text-center py-20 text-slate-300 italic">
                        No medicines prescribed yet.
                    </div>
                )}
            </div>

            {/* Footer / Notes */}
            <footer className={`mt-auto pt-8 border-t ${template === 'modern' ? 'border-blue-100' : template === 'classic' ? 'border-amber-900/20' : 'border-slate-200'}`}>
                {/* Notes Section */}
                <div className="mb-8 min-h-[60px]">
                    <p className={`font-semibold mb-1 text-xs uppercase ${template === 'modern' ? 'text-blue-800' : 'text-slate-600'}`}>Advice / Notes:</p>
                    <div className="text-sm text-slate-900 whitespace-pre-wrap" contentEditable suppressContentEditableWarning>
                        {usePrescriptionStore.getState().notes || '• Avoid alcohol and smoking.\n• Drink plenty of water.\n• Come for review after 5 days.'}
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="text-xs text-slate-400">
                        <p>Prescripto Generated</p>
                    </div>
                    <div className="text-center">
                        {/* Signature Placeholder */}
                        <div className="h-12 mb-2 font-script text-2xl text-slate-400 select-none">
                            Sign
                        </div>
                        <p className="font-bold text-slate-900">Dr. Stephen Strange</p>
                    </div>
                </div>
            </footer>
        </div>
    );
});

PrescriptionPreview.displayName = 'PrescriptionPreview';
