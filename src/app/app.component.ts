import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
declare var require: any;

export interface Employee {
  id: number;
  name: string;
  company: string;
  salary: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'company', 'salary'];
  dataSource: MatTableDataSource<Employee>;
  selectedEmployee: Employee;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const employee = require('../assets/json/employee.json');
    this.dataSource = new MatTableDataSource(employee);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
