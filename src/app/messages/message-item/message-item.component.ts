import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})

export class MessageItemComponent implements OnInit {
  

  // constructors
  constructor(private contactService: ContactService) {}
  
  ngOnInit() {
    const contact: Contact | null = this.contactService.getContact(
      this.message.sender);
      this.messageSender = contact != null ? contact.name : '';

    this.contactService.contactListChangedEvent.subscribe(() => {
      const contact: Contact | null = this.contactService.getContact(
        this.message.sender);
      this.messageSender = contact != null ? contact.name : '';
    })
  }

  // properties
  messageSender!: string;
  @Input() message!: Message;
}