import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Registros } from './models/registros.model';
import { error } from 'console';
import e from 'express';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from './Dialog/dialog-add-edit/dialog-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DataService],
})
export class AppComponent implements AfterViewInit, OnInit{
  registros: Registros[] = [];
  selectedRegistro: Registros = new Registros(0, 0);
  title = 'FrontEntCrud';
  displayedColumns: string[] = ['Documento', 'Nombre', 'Apellido', 'Acciones'];
  dataSource = new MatTableDataSource<Registros>();
  constructor(
    private dataSvc: DataService,
    public dialog:MatDialog
  ){

  }

    ngOnInit(){
      this.showRegistros();
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showRegistros(){
    this.dataSvc.getRegistros().subscribe({
     next:(dataResponse)=>{
      console.log(dataResponse)
      this.dataSource.data = dataResponse;
     },error:(e)=>{}

    })
    
  }

  dialogoNuevoRegistro(){
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width: '350px'
    }).afterClosed().subscribe(resultado =>{
      if(resultado==="creado"){
        this.showRegistros();
      }
    });
  }

  dialogoEditarRegistro(dataResponse:Registros){
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width: '350px',
      data:dataResponse
    }).afterClosed().subscribe(resultado =>{
      if(resultado==="editado"){
        this.showRegistros();
      }
    });
  }
  }

  