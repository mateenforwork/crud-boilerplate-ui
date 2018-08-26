import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Employee } from '../employee/employee.component';

@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    public getEmployees(): Promise<Employee[]> {
        return this.httpClient.get<Employee[]>('../../assets/json/employee.json').toPromise();
    }
}
