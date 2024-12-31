import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  displayedColumns: string[] = ['serial', 'name', 'date', 'action'];
  dataSource = [
    { name: 'Task 1', date: new Date() },
    { name: 'Task 2', date: new Date() },
    { name: 'Task 3', date: new Date() }
  ];

  ngOnInit() {}
}
