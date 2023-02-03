import { Injectable } from '@angular/core';
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
}
