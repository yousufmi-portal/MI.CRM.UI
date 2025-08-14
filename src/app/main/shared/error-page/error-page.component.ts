import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  errorCode: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.errorCode = data['errorCode'] || '404';
      this.errorMessage = data['errorMessage'] || 'Unknown error';
    });
  }
}
