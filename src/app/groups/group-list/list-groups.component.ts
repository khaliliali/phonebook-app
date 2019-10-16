import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GroupsService } from '../groups.service';
import { GroupModel } from '../groups.model';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})
export class ListGroupComponent implements OnInit, OnDestroy {
  groups: GroupModel[] = [];
  private groupsSub: Subscription;

  constructor(public groupService: GroupsService) {}

  ngOnInit() {
    this.groups = this.groupService.getGroups();
    this.groupsSub = this.groupService
      .getGroupsUpdateListener()
      .subscribe((groups: GroupModel[]) => {
        this.groups = groups;
      });
  }
  ngOnDestroy() {
    this.groupsSub.unsubscribe();
  }
}
