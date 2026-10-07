import {CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [RouterLink, RouterOutlet, MatSidenavModule , MatListModule, MatIconModule,MatCardModule],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})


export class Home {

  

}