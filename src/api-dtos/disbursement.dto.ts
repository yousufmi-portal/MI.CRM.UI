export interface DisbursementDto {
    projectId: number;
    categoryId: number;
    description?: string;
    disbursementDate: string; // ISO string format for DateTime
    disbursedAmount: number;
    units?: number;
    rate?: number;
}


export interface NewDisbursementDto extends DisbursementDto {
    budgetEntryId: number;
    documentId?: number; // Optional file for document upload
    claimNumber?: number; // Optional claim number to link to
}