import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { JobApplicationService } from '../../services/job-application.services';
import { nameExistsValidator } from '../../services/name-exists.validator';
import { NameCheckService } from '../../services/name-check.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface JobApplication {
  id: number;
  name: string;
  email: string;
  skills: string[];
}

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobApplicationService,
    private nameCheckService: NameCheckService
  ) {
    this.jobForm = this.fb.group({
      name: [
        '',
        [Validators.required],
        [nameExistsValidator(this.nameCheckService)],
      ],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([this.createSkill()]),
    });
  }

  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
    });
  }

  addSkill() {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const application: JobApplication = {
        id: 0, // Let the server generate ID
        name: this.jobForm.value.name,
        email: this.jobForm.value.email,
        skills: this.jobForm.value.skills.map((s: any) => s.skillName),
      };

      this.jobService.addApplication(application).subscribe({
        next: (response) => {
          alert('Application submitted successfully!');
          this.jobForm.reset();
          this.skills.clear();
          this.addSkill(); // Add one empty skill back
        },
        error: (err) => {
          console.error('Submission error:', err);
        },
      });
    }
  }
}
