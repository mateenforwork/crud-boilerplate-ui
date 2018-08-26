import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from '../services/employee.service';
declare var require: any;

export class Employee {
  id?: number;
  name?: string;
  company?: string;
  salary?: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'company', 'salary'];
  employees: MatTableDataSource<Employee>;
  selectedEmployee: Employee;
  editFlag = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService) {
    const employees = require('../../assets/json/employee.json');
    this.employees = new MatTableDataSource(employees);
  }

  getEmployees() {
    this.employeeService.getEmployees().then(result => {
      console.log('ALL Data: ', result);
      this.employees.data = result;
    })
      .catch(error => {
        console.log('Error Getting Data: ', error);
      });
  }

  ngOnInit() {
    this.employees.paginator = this.paginator;
    this.employees.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.employees.filter = filterValue.trim().toLowerCase();

    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }

  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  updateEmployee(selectedEmployee: Employee) {
    if (!this.editFlag) {
      console.log('add new employee:' + selectedEmployee);
      this.editFlag = true;
    } else {
      console.log('updated selected employee:' + selectedEmployee);
    }

  }

  deleteEmployee(selectedEmployee: Employee) {
    this.employees.data = this.employees.data.filter(m => {
      return m.id !== selectedEmployee.id;
    });
  }

  addEmployee() {
    this.selectedEmployee = new Employee();
    this.selectedEmployee.id = this.employees.data.length + 1;
    this.employees.data.push(this.selectedEmployee);
    this.editFlag = false;
  }

}
