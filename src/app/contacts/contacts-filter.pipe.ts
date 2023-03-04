import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  // methods
  transform(contacts: Contact[], term: string): any {
    let filtered: Contact[] = [];

    // filter list by term
    if (term && term.length > 0) {
      filtered = contacts.filter(
         (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // return no result found
    if (filtered.length < 1){
      return contacts;
    }

    // return search results
    return filtered;
  }
}
