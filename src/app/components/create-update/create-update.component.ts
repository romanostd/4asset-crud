import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/data.model';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnChanges {
  @Input() modalOpen: boolean = false;
  @Input() person: any = null; 
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submitFormEvent = new EventEmitter<Person>();

  personForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthDate: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.modalOpen && this.person) {
      const formattedBirthDate = this.person.birthDate ?
        new Date(this.person.birthDate).toISOString().split('T')[0] : '';
      
      this.personForm.patchValue({
        ...this.person,
        birthDate: formattedBirthDate
      });
    } else {
      this.personForm.reset();
    }
  }

  formatPhone(): void {
    let phone = this.personForm.get('phone')?.value.replace(/\D/g, '');
    if (phone.length > 10) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (phone.length > 5) {
      phone = phone.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (phone.length > 2) {
      phone = phone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }
    this.personForm.get('phone')?.setValue(phone, { emitEvent: false });
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  submitForm(): void {
    if (this.personForm.valid) {
      this.submitFormEvent.emit(this.personForm.value);
      this.closeModal();
    }
  }
}
