import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  // constructors
  constructor(private contactService: ContactService) {}

  ngOnInit() {
  }

  // properties
  selectedContact!: Contact;
}