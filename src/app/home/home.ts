import {CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Ticket } from '../create-ticket/create-ticket';

@Component({
  imports: [RouterLink, RouterOutlet, MatSidenavModule , MatListModule],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})


export class Home {

  

}