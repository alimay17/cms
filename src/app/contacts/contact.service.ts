import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  // properties
  contacts: Contact[] = [];

  // methods
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts){
      if (contact.id == id) {
        return contact;
      }
    };
    return null;
  }
}
