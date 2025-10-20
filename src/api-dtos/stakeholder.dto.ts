export interface StakeHolderDto {
    projectManageer: ProjectMangerDto | null;
    subcontractor: SubcontractorDto | null;
}

export interface ProjectMangerDto {
    id: number;
    userId: number;
    name: string;
    email: string;
}

export interface SubcontractorDto {
    id: number;
    name: string;
    email: string;
}
