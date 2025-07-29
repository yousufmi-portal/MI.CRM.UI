export interface NewTaskDto {
    projectId: number;
    title: string;
    description?: string;
    startDate?: string;       // Use string to represent DateTime from backend
    endDate?: string;
    assignedTo?: number;
    statusId: number;
    activityTypeId: number;
}
