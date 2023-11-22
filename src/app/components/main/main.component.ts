import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

interface Person {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string; 
}

interface ApiResponse {
  count: number;
  limit: number;
  page: number;
  results: Person[]; 
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  persons: any[] = [];
  personForm: FormGroup;
  isEditMode: boolean = false;
  modalOpen: boolean = false;
  currentEditingId: number | null = null;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.retrievePersons();
  }

  retrievePersons(): void {
    this.dataService.getPersons().subscribe((data: any) => {
      this.persons = data.results;
    });
  }

  openModal(edit: boolean, person?: any): void {
    this.modalOpen = true;
    this.isEditMode = edit;

    if (edit && person) {
      this.currentEditingId = person.id;


      const formattedBirthDate = person.birthDate ?
        new Date(person.birthDate).toISOString().split('T')[0] : '';


      this.personForm.patchValue({
        ...person,
        birthDate: formattedBirthDate
      });
    } else {
      this.currentEditingId = null;
      this.personForm.reset();
    }
  }


  closeModal(): void {
    this.modalOpen = false;
  }

  submitForm(): void {
    if (this.isEditMode && this.currentEditingId != null) {
      this.dataService.updatePerson(this.currentEditingId, this.personForm.value).subscribe(() => {
        this.retrievePersons();
      });
    } else {
      this.dataService.createPerson(this.personForm.value).subscribe(() => {
        this.retrievePersons();
      });
    }
    this.closeModal();
  }

  deletePerson(personId: number): void {
    this.dataService.deletePerson(personId).subscribe(() => {
      this.retrievePersons();
    });
  }
}
