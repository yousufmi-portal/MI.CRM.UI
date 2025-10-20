export interface CreateProjectDto {
    projectDetails: {
        title: string;
        awardNumber: string;
        category: string;
        agency: string;
        company: string;
        state: string;
        startDate: string;
        endDate: string;
        projectStatus: string;
    };
    subcontractorDetails: {
        subcontractorName: string;
        email?: string;
    };
    projectBudgetInfo: {
        categoryId: number; // or string, depending on your backend
        approvedAmount: number;
    }[];
}
