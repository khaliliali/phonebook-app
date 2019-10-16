import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ContactModel } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: ContactModel[] = [];
  isLoading = false;
  private contactsSub: Subscription;

  constructor(
    public contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.contactsService.getContacts();
    this.contactsSub = this.contactsService
      .getContactUpdateListener()
      .subscribe((contacts: ContactModel[]) => {
        this.isLoading = false;
        this.contacts = contacts;
      });
  }

  onDelete(contactId: string) {
    this.contactsService.deleteContact(contactId);
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
  addButton() {
    this.router.navigate(['/create']);
  }
}
