import { ProjectDto } from "./project.dto";
import { TaskDto } from "./task.dto";

export interface OperationsSummaryDto {
    project: ProjectDto;
    totalNumberOfEvents: number;
    budgetedNumberOfEvents: number;
    remainingNumberOfEvents: number;
    deliverableTypes: string[];
    tasksCompletedPercent: number;
    latestTodoTasks: TaskDto[];
    latestFinishedTasks: TaskDto[];
    tasks: TaskDto[];
}
