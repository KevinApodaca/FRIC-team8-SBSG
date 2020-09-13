import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { EventContentViewComponent } from './pages/event-content-view/event-content-view.component';
import { AnalystProgressSummaryContentViewComponent } from './pages/analyst-progress-summary-content-view/analyst-progress-summary-content-view.component';
import { SystemsControlViewComponent } from './pages/systems-control-view/systems-control-view.component';
import { SystemsContentViewComponent } from './pages/systems-content-view/systems-content-view.component';
import { TasksContentViewComponent } from './pages/tasks-content-view/tasks-content-view.component';
import { SubtasksContentViewComponent } from './pages/subtasks-content-view/subtasks-content-view.component';
import { FindingsContentViewComponent } from './pages/findings-content-view/findings-content-view.component';
import { ArchiveContentViewComponent } from './pages/archive-content-view/archive-content-view.component';
import { ConfigurationContentViewComponent } from './pages/configuration-content-view/configuration-content-view.component';
import { NotificationOverlayComponent } from './pages/notification-overlay/notification-overlay.component';
import { SetupContentViewComponent } from './pages/setup-content-view/setup-content-view.component';
import { MenuViewComponent } from './pages/menu-view/menu-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    EventContentViewComponent,
    AnalystProgressSummaryContentViewComponent,
    SystemsControlViewComponent,
    SystemsContentViewComponent,
    TasksContentViewComponent,
    SubtasksContentViewComponent,
    FindingsContentViewComponent,
    ArchiveContentViewComponent,
    ConfigurationContentViewComponent,
    NotificationOverlayComponent,
    SetupContentViewComponent,
    MenuViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
