import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // properties
  contacts: Contact[] = [];
  private maxContactId: number;
  
  // events
  contactListChangedEvent = new Subject<Contact[]>();

  // constructor
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  // methods

  // getters
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    };
    return null;
  }

  // Create Update Delete
  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

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
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
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