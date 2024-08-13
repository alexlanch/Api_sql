// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registros } from '../models/registros.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:44382/api/Registros';

  constructor(private http: HttpClient) {}

  getRegistros(): Observable<Registros[]> {
    return this.http.get<Registros[]>(this.apiUrl);
  }

  getRegistro(documento: string): Observable<Registros> {
    return this.http.get<Registros>(`${this.apiUrl}/${documento}`);
  }

  addRegistro(registro: Registros): Observable<Registros> {
    console.log(registro);
    return this.http.post<Registros>(this.apiUrl, registro);
  }

  updateRegistro(documento: string, registro: Registros): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${documento}`, registro);
  }

  deleteRegistro(documento: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documento}`);
  }
}
