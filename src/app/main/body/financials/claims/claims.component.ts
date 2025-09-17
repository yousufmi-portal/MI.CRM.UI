import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClaimDto } from '../../../../../api-dtos/claim.dto';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';
import { DisbursementsService } from '../../../../services/disbursements/disbursements.service';

@Component({
  selector: 'app-claims',
  imports: [TableModule, CommonModule],
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.scss'
})
export class ClaimsComponent {

  projectId : number | null = null;
  data : ClaimDto[] = [];

  constructor(private selectedProjectService: SelectedProjectService, private disbursementSService: DisbursementsService) { }

  ngOnInit(): void {
    this.selectedProjectService.projectId$.subscribe(projectId => {
      this.projectId = projectId;
      this.loadClaims();
    });
  }

  loadClaims() {
    if (this.projectId) {
      this.disbursementSService.getClaimsByProjectId(this.projectId).subscribe(claims => {
        this.data = claims;
      });
    }
  }
}
