import { Component, NgZone } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  private mediaMatcher: MediaQueryList = matchMedia(
    ` (max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  constructor(zone: NgZone) {
    this.mediaMatcher.addListener(mql =>
      zone.run(
        () =>
          (this.mediaMatcher = matchMedia(
            `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
          ))
      )
    );
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
