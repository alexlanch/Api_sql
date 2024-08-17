import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Registros } from '../../models/registros.model';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrl: './dialogo-delete.component.css'
})
export class DialogoDeleteComponent implements OnInit{

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject (MAT_DIALOG_DATA) public dataRegistros: Registros
  ){}

  ngOnInit(): void {
    
  }

  confirmar_Eliminar(){
    if(this.dataRegistros){
      this.dialogoReferencia.close("eliminar")
    }
  }

}
