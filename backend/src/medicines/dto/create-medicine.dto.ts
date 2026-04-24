export class CreateMedicineDto {
    name: string;
    genericName?: string;
    type: string;
    defaultDosage?: string;
    defaultDuration?: string;
    defaultFreq?: string;
    instruction?: string;
}
