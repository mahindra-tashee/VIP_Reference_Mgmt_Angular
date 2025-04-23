import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermgmtService } from '../../service/usermgmt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../interface/user.model';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public hide: boolean = true; // Password hiding

  private userMgmtService = inject(UsermgmtService);
  private toastr= inject(ToastrService);
  private router= inject(Router);
  private ngxService= inject(NgxUiLoaderService);

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  public onLogin(): void {
    this.ngxService.start();
    this.markAsDirty(this.loginForm);
    this.userMgmtService.loginVipUser(this.loginForm.value).subscribe({
      next:(res:User)=>{
        if(res !== undefined && res !== null){
           this.router.navigate(['/dashboard']);
           localStorage.setItem('user', JSON.stringify(res));
           this.ngxService.stop();
        }
        else{
          this.toastr.error("Invalid username or password. Please try again.");
          this.ngxService.stop();
        }
      },
      error:(err)=>{
        this.toastr.error("Invalid username or password. Please try again.");
        this.ngxService.stop();
      }
    })
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }
}
