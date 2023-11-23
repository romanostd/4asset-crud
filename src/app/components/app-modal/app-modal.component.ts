import { Component, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/data.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class AppModalComponent implements OnInit {
  config: ModalConfig | null = null;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalConfig$.subscribe((config) => {
      this.config = config;
    });
  }

  confirm() {
    this.modalService.confirmAction();
  }

  cancel() {
    this.modalService.cancelAction();
  }
}
