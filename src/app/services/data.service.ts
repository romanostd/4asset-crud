import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://dev-api-plt.4asset.net.br/exam/v1';

  constructor(private http: HttpClient) { }


  createPerson(person: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/persons`, person);
  }

  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/persons`);
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/persons/${id}`);
  }

  updatePerson(id: number, person: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/persons/${id}`, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/persons/${id}`);
  }
}
