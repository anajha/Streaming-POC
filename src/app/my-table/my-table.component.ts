import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-datasource';
import { BackendOperationsService } from '../backend-operations.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { JobList } from './my-table-details';
import { interval } from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
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

    this.pollingData=interval(1000).pipe(
      switchMap(() => this.backendService.getActiveJobDetails()))
      .subscribe((data:Array<JobList>)=>{
        console.log(data);
        this.dataSource = new MyTableDataSource(this.paginator, this.sort);
        this.dataSource.setData(data);
        console.log(data);
        this.ngxService.stop();
    })          
  }

  ngOnDestroy(){
    this.pollingData.unsubscribe();
  }
}
