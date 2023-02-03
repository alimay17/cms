import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // constructors
  constructor() {
    this.messages = MOCKMESSAGES;
  }

  // events
  messageChangedEvent = new EventEmitter<Message[]>();

  // properties
  messages: Message[] = [];

  // methods
  getMessages(): Message[] {
    return this.messages.slice();
  }

  getContact(id: string): Message | null {
    for (const message of this.messages){
      if (message.id == id) {
        return message;
      }
    };
    return null;
  }

  addMessage(newMessage: Message) {
    this.messages.push(newMessage);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
