import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NameCheckService } from '../../services/name-check.service'; // ✅ Fix import
import { nameExistsValidator } from '../../services/name-exists.validator'; // ✅ Fix import

@Component({
  selector: 'app-job-application',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
  standalone: true,
  providers: [NameCheckService]

})
export class JobApplicationComponent {
  jobForm: FormGroup;

  // ✅ Inject NameCheckService in constructor
  constructor(private fb: FormBuilder, private nameCheckService: NameCheckService) {
    this.jobForm = this.fb.group({
      name: ['', [Validators.required], [nameExistsValidator(this.nameCheckService)]],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([this.createSkill()])
    });
  }

  // Getter for skills FormArray
  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  // Create a skill FormGroup
  createSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required]
    });
  }

  // Add a new skill to the FormArray
  addSkill() {
    this.skills.push(this.createSkill());
  }

  // Remove a skill from the FormArray
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Handle form submission
  onSubmit() {
    if (this.jobForm.valid) {
      console.log('Job Application:', this.jobForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
