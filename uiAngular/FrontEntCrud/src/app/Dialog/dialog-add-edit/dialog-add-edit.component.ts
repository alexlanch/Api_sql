import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Registros } from '../../models/registros.model';
import { DataService } from '../../services/data.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { error } from 'console';
import e from 'express';

export const MY_DATE_FORMATS ={
  parse:{
    dateInput:'DD/MM/YYYY',
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}


@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrl: './dialog-add-edit.component.css',
  providers:[
    {provide:MAT_DATE_FORMATS, useValue:MY_DATE_FORMATS}
  ]
})

export class DialogAddEditComponent implements OnInit{

  formRegistro: FormGroup;
  tituloAccion: string="Nuevo";
  botonAccion: string="Guardar";
  listaRegistros: Registros[]=[];
 
  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _dataService: DataService,
    @Inject (MAT_DIALOG_DATA) public dataRegistros: Registros

  ){

    this.formRegistro=this.fb.group({
      documento:["",Validators.required],
      nombre:["",Validators.required],
      apellido:["",Validators.required]
    }) 
  }

  mostrarAlerta(msg: string, accion: string){
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  addEditRegistro(){
    
    console.log(this.formRegistro.value)

    const modelo: Registros={
      id:0,
      documento:this.formRegistro.value.documento,
      nombre:this.formRegistro.value.nombre,
      apellido:this.formRegistro.value.apellido
    }

    if(this.dataRegistros == null){
      this._dataService.addRegistro(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Registro creado","Listo");
          this.dialogoReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo crear Registro","Error");
        }
      })

    }else{

      this._dataService.updateRegistro(this.dataRegistros.documento, modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Registro fue editado","Listo");
          this.dialogoReferencia.close("editado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo editar Registro","Error");
        }
      })
    }

    
  }

  ngOnInit(): void {
    
    if(this.dataRegistros){
      this.formRegistro.patchValue({
        id: this.dataRegistros.id,
        documento:this.dataRegistros.documento,
        nombre:this.dataRegistros.nombre,
        apellido:this.dataRegistros.apellido
      })

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
    
  }
}
