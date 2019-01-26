import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-list-datasource';
import { BackendOperationsService } from '../backend-operations.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { JobList } from './my-table-list-details';

@Component({
  selector: 'my-table-list',
  templateUrl: './my-table-list.component.html',
  styleUrls: ['./my-table-list.component.css']
})
export class MyTableListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  dataSource: MyTableDataSource;

  pollingData:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Job_Id', 'Job_Status', 'State_Name','State_Status','State_Level_Number','State_start_time','State_end_time'];

  constructor(private ngxService: NgxUiLoaderService,private backendService: BackendOperationsService) { 
  }

  ngOnInit() {
    
    this.ngxService.stop();
    this.dataSource = new MyTableDataSource(this.paginator, this.sort);
    this.ngxService.start();

      this.backendService.getAllJobDetails()
      .subscribe((data:Array<JobList>)=>{
        console.log(data);
        this.dataSource = new MyTableDataSource(this.paginator, this.sort);
        this.dataSource.setData(data)
        this.ngxService.stop();
    })          
  }
}
