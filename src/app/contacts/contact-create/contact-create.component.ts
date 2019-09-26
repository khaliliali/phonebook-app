import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent {
  constructor(public contactsService: ContactsService) {}

  onAddContact(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.contactsService.addContact(
      form.value.firstname,
      form.value.lastname,
      form.value.mobile,
      form.value.home,
      form.value.email
    );
    form.resetForm();
  }
}
