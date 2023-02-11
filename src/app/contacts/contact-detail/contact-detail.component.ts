import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit{

  // properties
  contact!: Contact;

  // constructor
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  // implements
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.contact = this.contactService.getContact(id)!;
      }
    )
  }

  // methods
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}