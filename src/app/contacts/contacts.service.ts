import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ContactModel } from './contacts.model';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts: ContactModel[] = [];
  private contactsUpdate = new Subject<ContactModel[]>();

  getContacts() {
    return [...this.contacts];
  }

  getContactUpdateListener() {
    return this.contactsUpdate.asObservable();
  }

  addContact(
    fName: string,
    lName: string,
    mobile: number,
    home: number,
    email: string
  ) {
    const contact: ContactModel = {
      firstname: fName,
      lastname: lName,
      mobile,
      home,
      email
    };
    this.contacts.push(contact);
    this.contactsUpdate.next([...this.contacts]);
  }
}
