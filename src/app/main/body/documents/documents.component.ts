import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DocumentsService } from '../../../services/documents-service/documents.service';
import { MessageService } from 'primeng/api';
import { SelectedProjectService } from '../../../services/selected-project-service/selected-project.service';

@Component({
  selector: 'app-documents',
  imports: [TableModule, CommonModule, CardModule, FileUploadModule],
  providers: [MessageService],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  projectId: number | null = null;
  constructor(private documentsService: DocumentsService, private messageService: MessageService, private selectedProjectService: SelectedProjectService) { }
  documents = [
    {
      id: 1,
      documentName: 'Contract.pdf',
      uploadedBy: 'Umer Imran',
      uploadedAt: new Date('2025-10-05T11:00:00'),
      projectName: 'CRM Revamp',
      documentUrl: 'https://example.com/docs/contract.pdf',
      deletedAt: null
    },
    {
      id: 2,
      documentName: 'Financial_Report.xlsx',
      uploadedBy: 'Ali Raza',
      uploadedAt: new Date('2025-10-06T09:30:00'),
      projectName: 'Marketing Portal',
      documentUrl: 'https://example.com/docs/financial_report.xlsx',
      deletedAt: new Date('2025-10-07T12:00:00')
    }
  ];

  ngOnInit(): void {
    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId = projectId;
        // this.loadDocuments();
      });
  }

  openUploadDialog() {
    console.log('Upload button clicked');
    // Later open upload dialog or component
  }

  viewDocument(doc: any) {
    window.open(doc.documentUrl, '_blank');
  }

  deleteDocument(doc: any) {
    console.log('Deleting document:', doc);
    // add confirmation + API integration later
  }

  filterDocuments(type: string) {
    console.log('Filter clicked:', type);
    // implement filtering logic later
  }

  onFileSelect(event: any) {
    console.log('File selected:', event);
    const file = event.files[0];
    if (!file) return;

    this.documentsService.uploadDocument(file, this.projectId ?? 0).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Uploaded',
          detail: 'Document uploaded successfully.'
        });
        // this.loadDocuments(); // refresh list
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to upload document.'
        });
      }
    });
  }
}
