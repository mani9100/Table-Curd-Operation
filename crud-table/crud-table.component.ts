import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TableCrudService } from '../table-crud.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
export interface User {
  name: string;
  Rank: number;
  percentage: number;
  branch:string;
}
@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {
  user: any;
  dataSource;
  users: User[];
  count:number;
  constructor(private dialog: MatDialog , private dataService: TableCrudService){ 
  }
  displayedColumns: string[] = ['Rank', 'name', 'percentage', 'branch'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() { 
    return this.dataService.getData().subscribe((users: User[]) => {
      this.users = users;
      //console.log(this.users);
      this.count=this.users.length+1;
      //console.log(this.count);
      this.dataSource = new MatTableDataSource(users);
      //console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;     
      this.dataSource.sort      = this.sort;
    })
  }
  // Filter Values
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
  // Update a Row
  openDialogEdit(user){  
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: user
    });  
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.user);
      this.user = user;
    });
  }  
    // Create a row
  openDialogCreate(){
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '390px',
      data:this.count
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result!=undefined){  
      console.log(result);
        this.users.push(result);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.count=this.count+1;
      }
    });
  }
  // Delete a Row
  delete(element) {
    this.dataSource.data = this.dataSource.data.filter(i => i !== element);
    console.log(element);
  }
}
