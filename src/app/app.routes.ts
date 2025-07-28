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
import { Page1Component } from './main/body/financials/page1/page1.component';
import { Page2Component } from './main/body/financials/page2/page2.component';
import { TimelineCalendarComponent } from './main/body/operations/timeline-calendar/timeline-calendar.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent
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
                component: TimelineCalendarComponent,
            },
            {
                path: 'operations/taskmanager',
                component: TaskmanagerComponent
            },
            {
                path: 'financials/page1',
                component: Page1Component
            },
            {
                path: 'financials/page2',
                component: Page2Component
            }
        ]
    }
];
