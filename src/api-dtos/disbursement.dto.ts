export interface DisbursementDto {
    disbursementLogId: number; 
    projectId: number;
    categoryId: number;
    description?: string;
    disbursementDate: string; // ISO string format for DateTime
    disbursedAmount: number;
    units?: number;
    rate?: number;
    documentId?: number; // Optional file for document upload
    claimNumber?: number; // Optional claim number to link to
}


export interface NewDisbursementDto extends DisbursementDto {
    budgetEntryId: number;
}