import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ContactModel } from './contacts.model';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts: ContactModel[] = [];
  private contactsUpdate = new Subject<ContactModel[]>();

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<{ message: string; contacts: ContactModel[] }>(
        'http://localhost:3000/api/contacts'
      )
      .subscribe(contactData => {
        this.contacts = contactData.contacts;
        this.contactsUpdate.next([...this.contacts]);
      });
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
      id: null,
      firstname: fName,
      lastname: lName,
      mobile,
      home,
      email
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/contacts', contact)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.contacts.push(contact);
        this.contactsUpdate.next([...this.contacts]);
      });
  }
}
