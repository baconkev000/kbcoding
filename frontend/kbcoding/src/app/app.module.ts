import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CourseGridComponent } from './components/course-grid/course-grid.component';
import { CourseBoxHoverDirective } from './directives/course-box/course-box-hover.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    CourseGridComponent,
    CourseBoxHoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
