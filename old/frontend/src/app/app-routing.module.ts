import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystProgressSummaryContentViewComponent } from './pages/analyst-progress-summary-content-view/analyst-progress-summary-content-view.component';
import { ArchiveContentViewComponent } from './pages/archive-content-view/archive-content-view.component';
import { ConfigurationContentViewComponent } from './pages/configuration-content-view/configuration-content-view.component';
import { EventContentViewComponent } from './pages/event-content-view/event-content-view.component';
import { FindingsContentViewComponent } from './pages/findings-content-view/findings-content-view.component';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { MenuViewComponent } from './pages/menu-view/menu-view.component';
import { NotificationOverlayComponent } from './pages/notification-overlay/notification-overlay.component';
import { SetupContentViewComponent } from './pages/setup-content-view/setup-content-view.component';
import { SubtasksContentViewComponent } from './pages/subtasks-content-view/subtasks-content-view.component';
import { SystemsContentViewComponent } from './pages/systems-content-view/systems-content-view.component';
import { TasksContentViewComponent } from './pages/tasks-content-view/tasks-content-view.component';


const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'analyst-progress-summary-content-view', component: AnalystProgressSummaryContentViewComponent },
  { path: 'archive-content-view', component: ArchiveContentViewComponent },
  { path: 'configuration-content-view', component: ConfigurationContentViewComponent },
  { path: 'event-content-view', component: EventContentViewComponent },
  { path: 'findings-content-view', component: FindingsContentViewComponent },
  { path: 'menu-view', component: MenuViewComponent },
  { path: 'notification-overlay', component: NotificationOverlayComponent },
  { path: 'setup-content-view', component: SetupContentViewComponent },
  { path: 'subtasks-content-view', component: SubtasksContentViewComponent },
  { path: 'systems-content-view', component: SystemsContentViewComponent },
  { path: 'tasks-content-view', component: TasksContentViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
