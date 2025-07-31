export interface DisbursementDto {
    projectId: number;
    categoryId: number;
    description?: string;
    disbursementDate: string; // ISO string format for DateTime
    disbursedAmount: number;
}


export interface NewDisbursementDto extends DisbursementDto {
    documentId?: number; // Optional file for document upload
}