import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  // methods
  transform(contacts: Contact[], term: string): any {
    let filtered: Contact[] = [];

    filtered = contacts.filter((contact:Contact)=>{
      contact.name.toLowerCase().includes(term.toLowerCase());
    });

    if (filtered.length < 1){
      return contacts;
    }

    return filtered;
  }

}
