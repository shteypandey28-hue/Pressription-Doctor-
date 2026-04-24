export class CreatePrescriptionDto {
    doctorId: string;
    patientId: string;
    diagnosis?: string;
    notes?: string;
    items: {
        medicineId: string;
        dosage: string;
        frequency: string;
        duration: string;
        instruction?: string;
    }[];
}
