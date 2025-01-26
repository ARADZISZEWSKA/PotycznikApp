import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;
  recoveryForm: FormGroup;
  isFormValid: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.loginForm.valid;
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login success', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  openRecoveryModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onRecoverySubmit() {
    if (this.recoveryForm.valid) {
      console.log('Recovery email sent to', this.recoveryForm.value.email);
      this.closeModal();
    } else {
      console.log('Invalid email');
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
