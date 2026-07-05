import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectGridComponent } from './components/project-grid/project-grid.component';
import { ProjectBoxHoverDirective } from './directives/project-box/project-box-hover.directive';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectTypeHoverDirective } from './directives/project-type-hover/project-type-hover.directive';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AboutContentComponent } from './about-page/about-content/about-content.component';
import { AboutSkillsComponent } from './about-page/about-skills/about-skills.component';
import { BracketsComponent } from './components/brackets/brackets.component';
import { MemberAccessComponent } from './components/member-access/member-access.component';
import { CodeParensComponent } from './components/code-parens/code-parens.component';
import { DevHeaderComponent } from './components/dev-header/dev-header.component';
import { TypewriterTextComponent } from './components/typewriter-text/typewriter-text.component';
import { TerminalBannerComponent } from './components/terminal-banner/terminal-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    ProjectGridComponent,
    ProjectBoxHoverDirective,
    ProjectsPageComponent,
    ProjectTypeHoverDirective,
    ProjectDetailComponent,
    AboutPageComponent,
    AboutContentComponent,
    AboutSkillsComponent,
    BracketsComponent,
    MemberAccessComponent,
    CodeParensComponent,
    DevHeaderComponent,
    TypewriterTextComponent,
    TerminalBannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
