import { ProjectDto } from "./project.dto";

export interface MainPageDataDto {
    projects: ProjectDto[];
    totalProjects: number;
    states: number;
    totalApprovedBudget: number;
}