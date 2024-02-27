import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService : AuthService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule],
      declarations: [HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the username once logged in', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(component.firstName);
  });
});
