import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectGridComponent } from './components/project-grid/project-grid.component';
import { ProjectBoxHoverDirective } from './directives/project-box/project-box-hover.directive';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectTypeHoverDirective } from './directives/project-type-hover/project-type-hover.directive';
import { AddProjectPageComponent } from './add-project-page/add-project-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    ProjectGridComponent,
    ProjectBoxHoverDirective,
    ProjectsPageComponent,
    ProjectTypeHoverDirective,
    AddProjectPageComponent,
    ProjectDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
