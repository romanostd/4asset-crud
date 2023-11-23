import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  persons: Person[] = [];
  modalOpen: boolean = false;
  currentEditingPerson?: Person | null = null;

  constructor(
    private dataService: DataService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.retrievePersons();
  }

  retrievePersons(): void {
    this.dataService.getPersons().subscribe((response: any) => {
      this.persons = response.results;
    });
  }

  openModal(edit: boolean, person?: Person): void {
    this.modalOpen = true;
    this.currentEditingPerson = edit ? person : null;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.currentEditingPerson = null;
  }

  handleSubmit(personData: Person): void {
    if (this.currentEditingPerson) {
      this.dataService
        .updatePerson(this.currentEditingPerson.id, personData)
        .subscribe(() => {
          this.modalService.openModal({
            message: 'Cadastro editado com sucesso!',
            confirmText: 'Fechar',
          });
          this.retrievePersons();
          this.closeModal();
        });
    } else {
      this.dataService.createPerson(personData).subscribe(() => {
        this.modalService.openModal({
          message: 'Cadastro criado com sucesso!',
          confirmText: 'Fechar',
        });
        this.retrievePersons();
        this.closeModal();
      });
    }
  }

  confirmDelete(personId: number): void {
    this.modalService.openModal({
      message: 'Excluir cadastro',
      subMessage:
        'O cadastro será excluído definitivamente. Você tem certeza que deseja continuar?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: () => this.deletePerson(personId),
      onCancel: () => this.modalService.closeModal(),
    });
  }

  deletePerson(personId: number): void {
    this.dataService.deletePerson(personId).subscribe(() => {
      this.modalService.openModal({
        message: 'Cadastro excluído com sucesso!',
        confirmText: 'Fechar',
      });
      this.retrievePersons();
    });
  }
}
