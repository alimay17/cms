import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // constructors
  constructor(private contactService: ContactService){}
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }
}
