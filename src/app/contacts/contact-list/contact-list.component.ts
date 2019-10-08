import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContactModel } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: ContactModel[] = [];
  private contactsSub: Subscription;

  constructor(public contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.getContacts();
    this.contactsSub = this.contactsService
      .getContactUpdateListener()
      .subscribe((contacts: ContactModel[]) => {
        this.contacts = contacts;
      });
  }

  onDelete(contactId: string) {
    this.contactsService.deleteContact(contactId);
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
