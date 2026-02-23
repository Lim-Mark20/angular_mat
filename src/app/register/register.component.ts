import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    DatePipe,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  userName: string = '';
  email: string = ''
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkilllevel: number = 5;
  submitted = false;
  minSkilllevel = 1;
  maxSkilllevel = 10;
  isDarkMode = false;

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)
    ]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required, this.birthYearValidator]),
    address: new FormControl(''),
    angularSkilllevel: new FormControl(5)
  });

  birthYearValidator(control: import('@angular/forms').AbstractControl) {
    if (control.value) {
      const year = new Date(control.value).getFullYear();
      if (year > 2006) {
        return { invalidYear: true };
      }
    }
    return null;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  onSubmit() {
    this.submitted = true;
    const data = this.formdata.value;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkilllevel = data.angularSkilllevel;
    this.birthDate = data.birthDate;

    if (this.formdata.valid) {
      console.log('Form Submitted!', this.formdata.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
