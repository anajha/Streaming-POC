import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendOperationsService {
  constructor(private http:HttpClient) {}

  private baseUrl = 'http://localhost:8080';

  private baseUrl2= 'http://localhost:8081';
 
  public submitJob(fileDetails)
  { 
    return this.http.post("https://os4nuwsrje.execute-api.us-east-1.amazonaws.com/dev/documentpload",fileDetails)
  }

  public getActiveJobDetails()
  { 
    return this.http.get(this.baseUrl2+"/getJobDetails")
  }

  public getAllJobDetails()
  { 
    return this.http.get(this.baseUrl2+"/getJobDetails")
  }

  public getDAGDetails(jobID)
  { 
    return this.http.get(this.baseUrl2+"/getDAGDetails",{
      params: {
      jobID: jobID
    }})
  }
}
  

