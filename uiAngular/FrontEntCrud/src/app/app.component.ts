import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DataService],
})
export class AppComponent {
  title = 'FrontEntCrud';
  constructor(private dataSvc: DataService){}
    ngOnInit(){
      this.dataSvc.getRegistros().subscribe((res) => {
        console.log('Res ', res);
      })
    }
  }

