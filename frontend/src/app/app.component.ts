import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kbcoding';
  constructor(){
    console.log("prod?? ", environment.apiUrl);
  }
  
  ngOnInit(): void {
    initFlowbite();
  }
}
