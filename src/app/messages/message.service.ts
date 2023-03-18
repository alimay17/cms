import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // properties
  messages: Message[] = [];
  private maxMessageId: number = 0;
  private url = 'http://localhost:3000/messages';

  // events
  messageChangedEvent = new EventEmitter<Message[]>();
  
  // constructors
  constructor(
    private httpClient: HttpClient
  ) {}

  /*============ Server Connection Methods =============*/

  // get all message from server
  getMessages() {

    // get messages array from server
    this.httpClient.get<{message:string, content:Message[]}>(this.url)
    .subscribe({
      next: (response) => {
        // sort and assign to local messages array
        this.messages = response.content;
        this.sortAndSend();
      },
       
      // handle errors
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }

  // Add new Document
  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    newMessage.id = '';

    // add to database
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, myMessage: Message }>(
      this.url,
      newMessage,
      { headers: headers })
      .subscribe(
        (response) => {
          // update local documents
          this.messages.push(response.myMessage);
          this.sortAndSend();
        }
      );
  }

  // deleted selected document
  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    // get array position
    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.url +'/' + message.id)
      .subscribe(
        (response) => {
          // update local documents array
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }


  /*========== Local Manipulation Methods ===========*/

  // sort documents list and update event listener
  private sortAndSend(){
    this.messages.sort((a,b)=>{
      if (a.sender < b.sender) {
        return -1;
      }
      if (a.sender > b.sender) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
}
