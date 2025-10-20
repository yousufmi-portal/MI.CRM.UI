import { Component } from '@angular/core';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { models } from 'powerbi-client';

@Component({
  selector: 'app-analytics',
  imports: [PowerBIEmbedModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  embedConfig = {
    type: 'report',
    id: undefined,
    embedUrl: undefined,
    accessToken: undefined,
    tokenType: models.TokenType.Embed,
    hostname: 'https://app.powerbi.com'
  };
}
