import { Component, OnInit ,ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {FileList} from './job-submit-class';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './job-submit-datsource';
import { BackendOperationsService } from '../backend-operations.service';
import { ObservableFileReader} from './job-submit-base64Encoder';
import { FileDetails} from './job-submit-submitData';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { JobSubmitResponse } from './job-submit-response';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-job-submit',
  templateUrl: './job-submit.component.html',
  styleUrls: ['./job-submit.component.css']
})
export class JobSubmitComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MyTableDataSource;

  displayedColumns = ['name', 'uploadTime', 'jobId','status','lastModified', 'size'];

  file:FileList;

  optionsForm:FormGroup;
  fileDetails:FileDetails;
  fileList:FileList[]=[];

  fileReader:FileReader;

  base64Data:string;

  listOfOperations:Array<string>=new Array<string>();

  base64Encoder:ObservableFileReader=new ObservableFileReader();

  constructor(private ngxService: NgxUiLoaderService,private fb: FormBuilder,private backendService: BackendOperationsService) { 
    this.optionsForm= this.fb.group({
      cdc: false,
      dqo:false,
      idm:false
    })
  }

  public changeOptionCDC($event){

    if(this.optionsForm.value.cdc==true)
    {
      this.listOfOperations.push("CDC");
    }
    else{
      this.listOfOperations=this.listOfOperations.filter(obj=>obj!=="CDC");
    }
  }

  public changeOptionDQO($event){
    if(this.optionsForm.value.cdc==true)
    {
      this.listOfOperations.push("DQO");
    }
    else{
      this.listOfOperations=this.listOfOperations.filter(obj=>obj!=="DQO");
    }
  }

  public changeOptionIDM($event){
    if(this.optionsForm.value.cdc==true)
    {
      this.listOfOperations.push("IDM");
    }
    else{
      this.listOfOperations=this.listOfOperations.filter(obj=>obj!=="IDM");
    }
  }

  ngOnInit() {
    this.dataSource = new MyTableDataSource(this.paginator, this.sort);
  }

  public files: UploadFile[] = [];
 
  public dropped(event: UploadEvent) {
    this.files = event.files;

    for (const droppedFile of event.files) {

      this.ngxService.start();
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          
          this.fileDetails=new FileDetails();

          this.base64Encoder.readFile(file)
          .subscribe((response:string)=>{
           
            this.fileDetails.fileName=droppedFile.relativePath;
            this.fileDetails.base64Content=response;
            this.fileDetails.operations=this.listOfOperations;
            this.fileDetails.lastModified=new Date(file.lastModified).toUTCString();
            this.fileDetails.size=file.size.toString();
            this.fileDetails.fileName=droppedFile.relativePath;

            console.log(this.fileDetails.fileName);

            this.backendService.submitJob(this.fileDetails)
            .subscribe((response:JobSubmitResponse)=>{
              console.log(response);

              this.file=new FileList();


              this.file.lastModified=response.lastModified;
              this.file.size=response.size;
              this.file.name=response.fileName;
              this.file.uploadTime=response.uploadTime;
              this.file.jobId=response.jobId;
              this.file.status=response.status;

              
              this.fileList.push(this.file);

              
              this.dataSource = new MyTableDataSource(this.paginator, this.sort);
              this.dataSource.setData(this.fileList);
              this.ngxService.stop();
          })}
          );
          });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64Data= btoa(binaryString);
           console.log(btoa(binaryString));
   }
}
