export interface ClaimDto {
    projectId: number;
    claimNumber: number;
    disbursedAmount: number;
    description: string;
    categoryId: number;
    categoryName: string;
    disbursementDate: Date;
    units?: number;
    rate?: number;
}