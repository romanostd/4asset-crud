import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalConfig } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalConfigSubject = new BehaviorSubject<ModalConfig | null>(null);
  public modalConfig$ = this.modalConfigSubject.asObservable();

  constructor() {}

  openModal(config: ModalConfig) {
    this.modalConfigSubject.next(config);
  }

  closeModal() {
    this.modalConfigSubject.next(null);
  }

  confirmAction() {
    this.modalConfigSubject.value?.onConfirm?.();
    this.closeModal();
  }

  cancelAction() {
    this.modalConfigSubject.value?.onCancel?.();
    this.closeModal();
  }
}
