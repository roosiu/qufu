import { Component, Input, OnInit } from '@angular/core';
import { MatModule } from '../../../core/modules/mat.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css',
})
export class BackButtonComponent implements OnInit {
  @Input() color = '';
  @Input() tooltip = 'Powrót';
  @Input() where = '';
  constructor(private location: Location, private router: Router) {}
  ngOnInit(): void {
    if (this.color === 'light') {
    } else {
      this.color = 'dark';
    }
  }

  goBack(): void {
    if (this.where) {
      this.router.navigate([this.where]);
    } else {
      this.location.back();
    }
  }
}
