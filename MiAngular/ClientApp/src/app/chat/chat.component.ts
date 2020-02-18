import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../service/chat.service';
import { FormControl } from '@angular/forms';
import { Message } from '../Interfeces';
import { Observable } from 'rxjs/Observable';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'chat-app',
  templateUrl: './chat.component.html'
})

export class ChatComponent {
  public lstMessages: Observable<Message[]>;

  textControl = new FormControl('');
  nameControl = new FormControl('');

  @ViewChild('text') text: ElementRef;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string, protected chatService: ChatService) {
    this.GetInfo();
  }

  public GetInfo() {
    this.lstMessages = this.chatService.GetMessage();
  }

  public SendMessage() {
    this.chatService.Add(this.nameControl.value, this.textControl.value);

    setTimeout(() => {
      this.GetInfo();
    }, 300); 


    this.nameControl.setValue('');    
    this.textControl.setValue('');
    this.text.nativeElement.focus();

  }



}

