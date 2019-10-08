import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ContactsService } from '../contacts.service';
import { ContactModel } from '../contacts.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {
  contact: ContactModel;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private contactId: string;

  constructor(
    public contactsService: ContactsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastname: new FormControl(null, null),
      mobile: new FormControl(null, { validators: [Validators.required] }),
      home: new FormControl(null, null),
      email: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contactId')) {
        this.mode = 'edit';
        this.contactId = paramMap.get('contactId');
        this.contactsService
          .getContact(this.contactId)
          .subscribe(contactData => {
            this.contact = {
              id: contactData._id,
              firstname: contactData.firstname,
              lastname: contactData.lastname,
              mobile: contactData.mobile,
              home: contactData.home,
              email: contactData.email,
              imagePath: contactData.imagePath
            };
            this.form.setValue({
              firstname: this.contact.firstname,
              lastname: this.contact.lastname,
              mobile: this.contact.mobile,
              home: this.contact.home,
              email: this.contact.email,
              image: this.contact.imagePath
            });
          });
      } else {
        this.mode = 'create';
        this.contactId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveContact() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.contactsService.addContact(
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.mobile,
        this.form.value.home,
        this.form.value.email,
        this.form.value.image
      );
    } else {
      this.contactsService.updateContact(
        this.contactId,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.mobile,
        this.form.value.home,
        this.form.value.email,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
