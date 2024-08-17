// registros.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Registros } from '../../models/registros.model';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  registros: Registros[] = [];
  selectedRegistro: Registros = new Registros(0, 0);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadRegistros();
  }

  loadRegistros(): void {
    this.dataService.getRegistros().subscribe((data) => {
      this.registros = data;
    });
  }

  /*saveRegistro(): void {
    if (this.selectedRegistro.id) {
      this.dataService.updateRegistro(this.selectedRegistro.documento.toString(), this.selectedRegistro).subscribe(() => {
        this.resetForm();
        this.loadRegistros();
      });
    } else {
      this.dataService.addRegistro(this.selectedRegistro).subscribe(() => {
        this.resetForm();
        this.loadRegistros();
      });
    }
  }*/

  editRegistro(registro: Registros): void {
    this.selectedRegistro = { ...registro };
  }

  deleteRegistro(documento: number): void {
    this.dataService.deleteRegistro(documento).subscribe(() => {
      this.loadRegistros();
    });
  }

  resetForm(): void {
    this.selectedRegistro = new Registros(0, 0);
  }
}
