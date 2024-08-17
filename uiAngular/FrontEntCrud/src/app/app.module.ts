import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { RegistrosComponent } from './components/registros/registros.component';
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule} from '@angular/material/dialog'
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogAddEditComponent } from './Dialog/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialog/dialogo-delete/dialogo-delete.component'

@NgModule({
  declarations: [
    AppComponent,
    RegistrosComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
