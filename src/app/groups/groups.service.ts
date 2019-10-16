import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { GroupModel } from './groups.model';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private groups: GroupModel[] = [];
  private groupsUpdated = new Subject<GroupModel[]>();

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  getGroups() {
    return [...this.groups];
  }

  getGroupsUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

  addGroup(title: string) {
    const group: GroupModel = { title };
    this.groups.push(group);
    this.groupsUpdated.next([...this.groups]);
    this.openSnackBar('Title added successfully!', 'dismiss')
      .onAction()
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action, {
      duration: 4000
    });
  }
}
