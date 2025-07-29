export interface OverviewResponseDto {
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
