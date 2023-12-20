import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProjectPageComponent } from './add-project-page/add-project-page.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'projects', component: ProjectsPageComponent},
  {path: 'projects/:id', component: ProjectDetailComponent},
  {path: 'add-project', component: AddProjectPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
