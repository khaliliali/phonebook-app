import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContactModel } from './contacts.model';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts: ContactModel[] = [];
  private contactsUpdated = new Subject<ContactModel[]>();

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<{ message: string; contacts: any }>(
        'http://localhost:3000/api/contacts'
      )
      .pipe(
        map(contactData => {
          return contactData.contacts.map(contact => {
            return {
              firstname: contact.firstname,
              lastname: contact.lastname,
              mobile: contact.mobile,
              home: contact.home,
              email: contact.email,
              id: contact._id,
              imagePath: contact.imagePath
            };
          });
        })
      )
      .subscribe(transformContacts => {
        this.contacts = transformContacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getContactUpdateListener() {
    return this.contactsUpdated.asObservable();
  }

  getContact(id: string) {
    // prettier-ignore
    return this.http
     .get<{_id: string, firstname: string, lastname: string, mobile: number, home: number, email: string, imagePath: string }>(
    'http://localhost:3000/api/contacts/' + id);
  }

  addContact(
    firstname: string,
    lastname: string,
    mobile: number,
    home: number,
    email: string,
    image: File
  ) {
    const contactData = new FormData();
    contactData.append('firstname', firstname);
    contactData.append('lastname', lastname);
    contactData.append('mobile', mobile.toString());
    contactData.append('home', home.toString());
    contactData.append('email', email);
    contactData.append('image', image, firstname);

    this.http
      .post<{ message: string; contact: ContactModel }>(
        'http://localhost:3000/api/contacts/',
        contactData
      )
      .subscribe(responseData => {
        const contact: ContactModel = {
          id: responseData.contact.id,
          firstname,
          lastname,
          mobile,
          home,
          email,
          imagePath: responseData.contact.imagePath
        };
        this.contacts.push(contact);
        console.log('contact ', responseData);

        this.contactsUpdated.next([...this.contacts]);
        console.log('contacts ', this.contacts);
      });
  }

  updateContact(
    id: string,
    firstname: string,
    lastname: string,
    mobile: number,
    home: number,
    email: string,
    image: File | string
  ) {
    let contactData: ContactModel | FormData;
    if (typeof image === 'object') {
      contactData = new FormData();
      contactData.append('id', id);
      contactData.append('firstname', firstname);
      contactData.append('lastname', lastname);
      contactData.append('mobile', mobile.toString());
      contactData.append('home', home.toString());
      contactData.append('email', email);
      contactData.append('image', image, firstname);
    } else {
      contactData = {
        id,
        firstname,
        lastname,
        mobile,
        home,
        email,
        imagePath: image
      };
    }
    this.http
      .put('http://localhost:3000/api/contacts/' + id, contactData)
      .subscribe(response => {
        const updatedContact = [...this.contacts];
        const oldContactIndex = updatedContact.findIndex(c => c.id === id);
        const contact: ContactModel = {
          id,
          firstname,
          lastname,
          mobile,
          home,
          email,
          imagePath: '' //response.imagePath
        };
        updatedContact[oldContactIndex] = contact;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  deleteContact(contactId: string) {
    this.http
      .delete('http://localhost:3000/api/contacts/' + contactId)
      .subscribe(() => {
        const contactsUpdated = this.contacts.filter(
          contact => contact.id !== contactId
        );
        this.contacts = contactsUpdated;
        this.contactsUpdated.next([...this.contacts]);
      });
  }
}
