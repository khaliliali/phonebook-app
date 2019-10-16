import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { GroupModel } from '../groups.model';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.scss']
})
export class CreateGroupComponent {
  constructor(
    public groupsService: GroupsService,
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addGroup(form: NgForm) {
    // this.dialogRef.close('It was Added!');
    if (form.invalid) {
      return;
    }
    this.groupsService.addGroup(form.value.title);
    this.dialogRef.close();
  }
}
