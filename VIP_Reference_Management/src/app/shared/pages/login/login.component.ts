import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermgmtService } from '../../service/usermgmt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../interface/user.model';


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

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  public onLogin(): void {
    this.markAsDirty(this.loginForm);
    this.userMgmtService.loginVipUser(this.loginForm.value).subscribe({
      next:(res:User)=>{
        if(res !== undefined && res !== null){
           this.router.navigate(['/dashboard']);
           localStorage.setItem('user', JSON.stringify(res));
        }
        else{
          this.toastr.error("Invalid username or password. Please try again.")
        }
      },
      error:(err)=>{
        this.toastr.error("Invalid username or password. Please try again.")
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
