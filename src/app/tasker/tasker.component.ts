import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  ValidationErrors, 
  ValidatorFn, 
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-tasker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tasker.component.html',
  styleUrl: './tasker.component.css',
})
export class TaskerComponent {
  yourFormGroup: FormGroup;
  posts: any[] = [];

  ngOnInit() {
    this.getFormData();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.yourFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, this.contactValidator]],
      location: ['', Validators.required],
      skill: ['', Validators.required],
    });
  }

  contactValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const validPrefix = '07';

    if (value && typeof value === 'string' && value.startsWith(validPrefix) && value.length === 10) {
      return null;  // Valid
    } else {
      return { invalidContact: true };  // Invalid
    }
  };

  onSubmit(){
    const formData = this.yourFormGroup.value;
    this.http.post('https://monkey-ec249-default-rtdb.europe-west1.firebasedatabase.app/form-data.json', formData)
    .subscribe(
      (response) => {
        console.log('Form Data submitted successfully:', response);
        this.yourFormGroup.reset();
        this.getFormData();
      },
      (error) => {
        console.error('Error submitting form data:', error);
      }
    );    
  }  
  
  // getFormData() {
  //   this.http.get('https://monkey-ec249-default-rtdb.europe-west1.firebasedatabase.app/form-data.json')
  //   .subscribe(posts => {
  //     console.log(posts);
  //   });
  // }
  getFormData() {
    this.http.get('https://monkey-ec249-default-rtdb.europe-west1.firebasedatabase.app/form-data.json')
      .subscribe((data: any) => {
        console.log('Form data retrieved successfully:', data);
        
        // Check if data is an object, and extract values if needed
        if (data && typeof data === 'object') {
          this.posts = Object.values(data);
        } else {
          this.posts = data || [];
        }
      });
  }
  
}
