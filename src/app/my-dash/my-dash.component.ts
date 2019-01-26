import { Component } from '@angular/core';
import * as shape from 'd3-shape';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Node } from './my-dash-node';
import { Link } from './my-dash-link';
import { JobList } from './my-dash-data';
import { interval, Observable } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { BackendOperationsService } from '../backend-operations.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'my-dash',
  templateUrl: './my-dash.component.html',
  styleUrls: ['./my-dash.component.scss']
})
export class MyDashComponent {

  viewDAGForm:FormGroup;
  hierarchialGraph = {nodes: [], links: []}
  curve = shape.curveBundle.beta(1);
  pollingData:any;
  node:Node=new Node();
  link:Link=new Link();
  nodeList:Node[]=[];
  linkList:Link[]=[];
  previousLink:string;

  constructor(private fb: FormBuilder,private ngxService: NgxUiLoaderService,private backendService: BackendOperationsService) { 
    this.viewDAGForm = this.fb.group({
      jobID: ''
    })
  }

  public ngOnInit(){
    this.pollingData=new Observable<any>();
    this.ngxService.stop();
  }

  public showGraph()
  {
    
    this.ngxService.start();
    this.pollingData=interval(1000).pipe(
      switchMap(() => this.backendService.getDAGDetails(this.viewDAGForm.value.jobID)))
      .subscribe((data:Array<JobList>)=>{
        
        this.nodeList=[];
        this.linkList=[];
        this.previousLink='Start';

        this.hierarchialGraph = {nodes: [], links: []};
        console.log(data);
        console.log(data.length);

        if(data.length===0)
        {
          console.log("The provided job Id does not exist");
        }

        else{
          this.node=new Node();
          this.node.id='Start';
          this.node.label='Start';
          this.node.position='';

          this.nodeList.push(this.node);

          data.forEach(job=>{
            this.node=new Node();
            this.node.id=job.State_Level_Number;
            this.node.label=job.State_Name;
            this.node.position="Start Time:-"+job.State_start_time+" End Time:-"+job.State_end_time;
            this.nodeList.push(this.node);

            this.link=new Link();
            this.link.source=this.previousLink;
            this.link.target=job.State_Level_Number;
            this.link.label='';
            this.linkList.push(this.link);
            this.previousLink=job.State_Level_Number;

            if(job.Job_Status=="Completed"){
              this.pollingData.unsubscribe();
              console.log("Polling has been stopped");
            }
          })

          this.hierarchialGraph.nodes=this.nodeList;
          this.hierarchialGraph.links=this.linkList;  
          console.log(this.hierarchialGraph.nodes);
          console.log(this.hierarchialGraph.links);          
        }
        this.ngxService.stop();
    }) 
}

}
