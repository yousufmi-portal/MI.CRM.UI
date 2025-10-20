export interface OverviewRequestDto {
    projectId: number;
    weekStartDate: string; // ISO 8601 format
    weekEndDate: string;
}
