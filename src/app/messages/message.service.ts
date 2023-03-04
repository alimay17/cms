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
  
  // events
  messageChangedEvent = new EventEmitter<Message[]>();
  
  // constructors
  constructor(
    private httpClient: HttpClient
  ) {}

  /*============ Server Connection Methods =============*/

  // get all message from server
  getMessages() {
    const url = 'https://angular-cms-wdd430-default-rtdb.firebaseio.com/messages.json';

    // get messages array from server
    this.httpClient.get<Message[]>(url).subscribe({
      next: (messages: Message[]) => {

        // sort and assign to local messages array
        this.messages = messages.sort((a: Message, b: Message) =>{
          if(a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        });

        // update max id
        this.maxMessageId = this.getMaxId();

        // update subscription
        this.messageChangedEvent.next(this.messages.slice());
      },
       
      // handle errors
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }

  // store all messages on server
  storeMessages() {
    const putData = JSON.stringify(this.messages);
    const url = 'https://angular-cms-wdd430-default-rtdb.firebaseio.com/messages.json';

    this.httpClient.put(
      url,
      putData,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    ).subscribe(()=>{
      this.messageChangedEvent.next(this.messages.slice());
    })
  }


  /*========== Local Manipulation Methods ===========*/

  // add new message
  addMessage(newMessage: Message) {
    if(!newMessage){
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString()

    this.messages.push(newMessage);
    this.storeMessages();
  }

  // internal helper methods
  private getMaxId(): number {
    let maxId = 0;
    this.messages.forEach(message => {
      let currentId = + message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}
