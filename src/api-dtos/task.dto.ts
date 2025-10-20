export interface TaskDto {
    id: number;
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string;

    assignedTo?: number;
    assigneeName?: string;

    statusId: number;
    statusName: string;
    statusColor?: string;

    activityTypeId: number;
    activityTypeName: string;

    deliverableType?: string;

    createdOn?: string;
    createdBy?: number;

    completedOn?: string;
    completedBy?: number;
    completedByName?: string;
}
