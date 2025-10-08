export interface DocumentDto {
    id: number;
    documentUrl: string;
    documentName: string;
    projectId: number;
    uploadedById: number;
    uploadedByName: string;
    uploadedAt: string; // ISO string
}
