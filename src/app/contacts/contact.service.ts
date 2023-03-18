import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // properties
  contacts: Contact[] = [];
  private maxContactId: number = 0;
  private url = 'http://localhost:3000/api/contacts';

  
  // events
  contactListChangedEvent = new Subject<Contact[]>();

  // constructor
  constructor(
    private httpClient: HttpClient
  ) {
    this.getContacts();
  }

  /*============ Server Connection Methods =============*/
  
  // get all contacts from server
  getContacts() {
    // contacts array from server
    this.httpClient.get<{message:string, content:Contact[]}>(this.url)
    .subscribe({
      next: (response) => {
        // sort and assign to local contacts array
        this.contacts = response.content;
        this.sortAndSend();
      },
      // handle errors
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }

  // add new contact
  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    newContact.id = '';
    // add to database
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, contact: Contact }>(
      this.url,
      newContact,
      { headers: headers })
      .subscribe(
        (response) => {
          // update local contacts
          this.contacts.push(response.contact);
          this.sortAndSend();
        }
    );
  }
  
  // update selected contact
  updateContact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }

    // set document position
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    // set id
    newContact.id = originalContact.id;

    // update database
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put(
      this.url + '/' + originalContact.id,
      newContact, { headers: headers }
      ).subscribe(
        (response) => {
          // update local documents 
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

   // deleted selected document
   deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // get array position
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.url +'/' + contact.id)
      .subscribe(
        (response) => {
          // update local documents array
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  } 

  /*========== Local Manipulation Methods ===========*/

  // get single contact by id
  getContact(id: string): Contact | null {
    if(this.contacts.length < 1){
      this.getContacts();
    }
    for (const contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    };
    return null;
  }

  // sort contacts list and update event listener
  private sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}