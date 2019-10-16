import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateGroupComponent } from '../groups/group-create/create-groups.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}
  @Output() toggleSidenav = new EventEmitter<void>();

  // openAddContactsDialog() {
  //   // this.dialog.open(CreateGroupComponent, {
  //   //   width: '450px'
  //   // });
  // }
}
