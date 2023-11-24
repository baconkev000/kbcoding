import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectGridComponent } from './components/project-grid/project-grid.component';
import { ProjectBoxHoverDirective } from './directives/project-box/project-box-hover.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule],
    declarations: [AppComponent, NavComponent, HomePageComponent, ProjectGridComponent, ProjectBoxHoverDirective],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'kbcoding'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kbcoding');
  });

});
