import { Component } from '@angular/core';
import { OnlineStatusService } from '../../services/online-status.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'online-status-banner',
  templateUrl: './online-status-banner.component.html',
  imports: [
    AsyncPipe,
    MatCard,
    NgClass
  ],
  styleUrls: ['./online-status-banner.component.scss']
})
export class OnlineStatusBannerComponent {
  constructor(public onlineSvc: OnlineStatusService) {}
}
