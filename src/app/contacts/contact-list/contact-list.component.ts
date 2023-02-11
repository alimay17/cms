import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  // properties
  contacts: Contact[] = [];

  // constructor
  constructor(private contactService: ContactService) {}

  // implements
  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
    this.contacts = this.contactService.getContacts();
  }

}