export interface ProjectDto {
    projectId: number;
    awardNumber: string;
    title: string;
    category: string;
    agency: string;
    company: string;
    state: string;
    projectManagerId?: number;
    subContractorId?: number;
    totalApprovedBudget?: number;
    totalDisbursedBudget?: number;
    totalRemainingBudget?: number;
}
