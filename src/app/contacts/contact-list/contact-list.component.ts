import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContactModel } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  //Contactlist = [
  // {
  //   firstname: 'ali',
  //   lastname: 'khalili',
  //   mobile: 6654654,
  //   home: 65465465,
  //   email: a@a.co
  // },
  // {
  //   firstname: 'reza',
  //   lastname: 'ahmadi',
  //   mobile: 6654654,
  //   home: 65465465,
  //   email: a@a.co
  // }
  //];

  contacts: ContactModel[] = [];
  private contactsSub: Subscription;

  constructor(public contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.contactsSub = this.contactsService
      .getContactUpdateListener()
      .subscribe((contacts: ContactModel[]) => {
        this.contacts = contacts;
      });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
