export interface UpdateTaskDateTimeDto {
    taskId: number;
    startDateTime: string; // ISO format string e.g., "2025-07-30T09:00:00"
    endDateTime: string;   // ISO format string e.g., "2025-07-30T11:00:00"
}
