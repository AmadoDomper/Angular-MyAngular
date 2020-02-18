import { Injectable, Inject } from '@angular/core';
import { Message, MyResponse } from '../Interfeces';
import { HttpCliente, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  public algo: string = "hola Mundo";
  baseUrl: string;


  constructor(protected http: HttpClient ,@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public GetMessage() : Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + "api/Chat/Message");
  }

  public Add(name,text){
    return this.http.post<MyResponse>(this.baseUrl + "api/Chat/Add", {"Name":name,"Text":text}, httpOptions)
      .subscribe(result => {
        console.log(result);
      },
        error => console.error(error)
    );  
  }

}
