import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { JobList} from './my-table-details';

export class MyTableDataSource extends DataSource<JobList> {
  data: JobList[]=[];

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  public setData(data)
  {
      console.log("Data:-"+data);
      this.data=data;
      console.log("Data passed:-"+this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<JobList[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: JobList[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: JobList[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Job_Id': return compare(a.Job_Id, b.Job_Id, isAsc);
        case 'Job_Status': return compare(a.Job_Status, b.Job_Status, isAsc);
        case 'State_Name': return compare(a.State_Name, b.State_Name, isAsc);
        case 'State_Status': return compare(a.State_Status, b.State_Status, isAsc);
        case 'State_Level_Number': return compare(a.State_Level_Number, b.State_Level_Number, isAsc);
        case 'State_start_time': return compare(+Number(new Date(a.State_start_time)), +Number(new Date(b.State_start_time)), isAsc);
        case 'State_end_time': return compare(+Number(new Date(a.State_end_time)), +Number(new Date(b.State_end_time)), isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
