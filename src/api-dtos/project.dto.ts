export interface ProjectDto {
    projectId: number;
    awardNumber: string;
    title: string;
    category: string;
    agency: string;
    company: string;
    state: string;
    projectManagerId?: number;
    projectManagerName?: string;
    subContractorId?: number;
    subContractorName?: string;
    totalApprovedBudget?: number;
    totalDisbursedBudget?: number;
    totalRemainingBudget?: number;
    billedAndPaid?: number;
    billedNotPaid?: number;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    projectStatus?: string;
}
