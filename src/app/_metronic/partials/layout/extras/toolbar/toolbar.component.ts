import {
  trigger,
  style,
  transition,
  animate,
  animateChild,
  query,
  stagger,
} from '@angular/animations';
import {Overlay} from '@angular/cdk/overlay';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Navigation} from 'src/app/pages/navigation.model';
import {quickNavigation} from 'src/app/pages/navigations';
import {SelectSysStatusDialogComponent} from './select-sys-status-dialog/select-sys-status-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({transform: 'scale(0.2)', opacity: 0}), // initial
        animate(
          '0.3s cubic-bezier(.3, -0.2, 0.2, 1)',
          style({transform: 'scale(1)', opacity: 1})
        ), // final
      ]),
      transition(':leave', [
        style({opacity: 1, height: '*'}),
        animate(
          '0.3s cubic-bezier(.3, -0.2, 0.2, 1)',
          style({
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
    trigger('list', [
      transition(':enter', [query('@items', stagger(100, animateChild()))]),
      transition(':leave', [query('@items', stagger(100, animateChild()))]),
    ]),
  ],
})
export class ToolbarComponent implements OnInit {
  navigation: Navigation[];
  state = 'default';
  isOpened = false;
  position = 'left';

  constructor(private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.navigation = quickNavigation;
  }

  handle(item: Navigation) {
    if (!item.url) {
      this.dialog.open(SelectSysStatusDialogComponent, {disableClose: true});
    }
  }

  navigateToBuilder() {
    this.router.navigate(['/builder']);
  }

  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  openMenu() {
    this.isOpened = !this.isOpened;
  }
}
