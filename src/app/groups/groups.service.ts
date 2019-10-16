import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { GroupModel } from './groups.model';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private groups: GroupModel[] = [];
  private groupsUpdated = new Subject<GroupModel[]>();

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
  }
}
