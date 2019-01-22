import {ReplaySubject, Observable } from "rxjs";

export class ObservableFileReader {

  constructor(){}

  public readFile(fileToRead: File): Observable<any>{
    let base64Observable = new ReplaySubject<any>(1);

    let fileReader = new FileReader();
    fileReader.onload = event => {
        base64Observable.next(fileReader.result);
    };
    fileReader.readAsDataURL(fileToRead);

    return base64Observable;
   }
}