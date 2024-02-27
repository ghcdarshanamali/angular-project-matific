import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  //let authService : AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule],
      declarations: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check invalid email', () => {

    fixture.whenStable().then(() => {

      let email = component.loginForm.form.controls['email'];
      expect(email.invalid).toBeTruthy();
      expect(email.touched).toBeFalse();
      expect(email.errors["required"]).toBeTrue();
    })
    
  });

  it('should set error msg on submit error',()=>{

    let authService = fixture.debugElement.injector.get(
      AuthService
    );
    spyOn(
      authService,
      'loginOrSignUp'
    ).and.returnValue({success: false, messsage: "Fail"});
   
    //component.onSubmit();
    tick(1000);
    expect(component.errorMessage).toEqual("Fail");
    
 });
});
