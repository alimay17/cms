import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
  
  // constructors
  constructor(private messageService: MessageService){}
  
  ngOnInit() {
    this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (newMessages: Message[]) => {
        this.messages = newMessages;
      }
    )
  }

  // properties
  messages: Message[] = [];
}
