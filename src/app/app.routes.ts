import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { OverviewComponent } from './main/body/overview/overview.component';
// import { AnalyticsComponent } from './main/body/overview/analytics/analytics.component';
import { StakeholderDirectoryComponent } from './main/body/operations/stakeholder-directory/stakeholder-directory.component';
import { TimelineComponent } from './main/body/operations/timeline/timeline.component';
import { TaskmanagerComponent } from './main/body/operations/taskmanager/taskmanager.component';
import { DashboardComponent } from './main/body/dashboard/dashboard.component';
import { CompletedCashflowByAwardComponent } from './main/charts/completed-cashflow-by-award/completed-cashflow-by-award.component';

export const routes: Routes = [
    {
        path: '',
        component: CompletedCashflowByAwardComponent
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent,
            },
            {
                path: 'operations/stakeholder-directory',
                component: StakeholderDirectoryComponent,
            },
            {
                path: 'operations/timeline',
                component: TimelineComponent,
            },
            {
                path: 'operations/taskmanager',
                component: TaskmanagerComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
