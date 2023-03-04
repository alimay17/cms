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
    const url = 'https://angular-cms-wdd430-default-rtdb.firebaseio.com/contacts.json'

    // contacts array from server
    this.httpClient.get<Contact[]>(url).subscribe({
      next: (contacts: Contact[]) => {
        // sort and assign to local contacts array
        this.contacts = contacts.sort((a: Contact, b: Contact) =>{
          if(a.name < b.name) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        });

        // assign maxId
        this.maxContactId = this.getMaxId();

        // update subscription
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      // handle errors
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }

  storeContacts(){
    const putData = JSON.stringify(this.contacts);
    const url = 'https://angular-cms-wdd430-default-rtdb.firebaseio.com/contacts.json';

    this.httpClient.put(
      url,
      putData,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    ).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    })
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

  // add new contact
  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    this.contacts.push(newContact);
    this.storeContacts();
  }

  // update selected contact
  updateContact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if(pos < 0){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  // delete selected contact
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

    // internal helper methods
  private getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}