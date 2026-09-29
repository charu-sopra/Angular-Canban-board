import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  imports: [MatSidenavModule , MatListModule, CdkDrag, CdkDropList,CdkDropListGroup],
  selector: 'app-kanban',
  styleUrl: './kanban.scss',
  templateUrl: './kanban.html',
})


export class Kanban {
  todo = [
  {
        title: 'Angular Material Walkthrough',
        priority: 'HIGH',
        description: 'Learn Angular Material',
        assignee: 'Pranav',
        dueDate: '10 Sept 2026'
    },
  {
        title: 'Create signup page',
        priority: 'MEDIUM',
        description: 'Create signup page',
        assignee: 'Sandeep',
        dueDate: '15 Oct 2026'
    }
];
inProgress = [
        {
            title: 'Routing in Angular',
            priority: 'HIGH',
            description: 'Set up routing between application pages',
            assignee: 'Pranav',
            dueDate: '18 Oct 2026'
        }
    ];

    finished = [
        {
            title: 'Setup Angular',
            priority: 'LOW',
            description: 'Complete initial Angular project setup',
            assignee: 'Sandeep',
            dueDate: '5 Oct 2026'
        }
    ];

drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container){
    moveItemInArray(
      event.container.data, // "Which array are we modifying?"
      event.previousIndex, //"Where was the item?"
      event.currentIndex   //Where should it go?"
    );
  }
  else{
    transferArrayItem(
      event.previousContainer.data, //from where youre moving it
      event.container.data, //where it is being brought
      event.previousIndex,  //idx of where it was
      event.currentIndex   //idx of where its brought now
    );
  }
}
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  // }
}


