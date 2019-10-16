import { Component, NgZone, Inject } from '@angular/core';
import { ContactModel } from '../contacts/contacts.model';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { ContactsService } from '../contacts/contacts.service';
import { CreateGroupComponent } from '../groups/group-create/create-groups.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  contacts: ContactModel[] = [];
  private contactsSub: Subscription;
  private SMALL_WIDTH_BREAKPOINT = 720;
  private mediaMatcher: MediaQueryList = matchMedia(
    ` (max-width: ${this.SMALL_WIDTH_BREAKPOINT}px)`
  );

  constructor(
    zone: NgZone,
    public contactsService: ContactsService,
    public dialog: MatDialog
  ) {
    this.mediaMatcher.addListener(mql =>
      zone.run(
        () =>
          (this.mediaMatcher = matchMedia(
            `(max-width: ${this.SMALL_WIDTH_BREAKPOINT}px)`
          ))
      )
    );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateGroupComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.contactsService.getContacts();
    this.contactsSub = this.contactsService
      .getContactUpdateListener()
      .subscribe((contacts: ContactModel[]) => {
        this.contacts = contacts;
      });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
