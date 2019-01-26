import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendOperationsService {
  constructor(private http:HttpClient) {}

  private baseUrl = '';
 
  public submitJob(fileDetails)
  { 
    return this.http.post(this.baseUrl+'/documentpload',fileDetails);
  }

  public getActiveJobDetails()
  { 
    return this.http.get(this.baseUrl+'/get-running-jobs');
  }

  public getAllJobDetails()
  { 
    return this.http.get(this.baseUrl+'/get-all-items',{
      params: {
        table:"job_status"
      }
    })
  }

  public getDAGDetails(jobID)
  { 
    return this.http.get(this.baseUrl+'/get-job',{
      params: {
      job_id: jobID
    }})
  }
}
  

