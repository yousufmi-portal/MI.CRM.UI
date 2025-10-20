import { ProjectDto } from "./project.dto";

export interface OverviewResponseDto {
    project : ProjectDto;

    activeTasks: number;
    upcomingTasks: number;
    pendingTasks: number;
    budgetPercentageUsed: number;

    toDoTasks: number;
    completedTasks: number;
    remainingTasks: number;
    progressPercentage: number;

    notifications: TaskNotificationDto[];
}

export interface TaskNotificationDto {
    title: string;
    scheduledDate: string;
    timeRemaining: string;
}
