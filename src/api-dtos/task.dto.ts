export interface TaskDto {
    id: number;
    title: string;
    description?: string;
    startDate?: string;       // Use string to represent DateTime from backend
    endDate?: string;
    assignedTo?: number;
    statusId: number;
    statusName: string;
    statusColor: string;
    activityTypeId: number;
    activityTypeName: string;
}
