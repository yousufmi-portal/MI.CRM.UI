import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DocumentsService } from '../../../services/documents-service/documents.service';
import { MessageService } from 'primeng/api';
import { SelectedProjectService } from '../../../services/selected-project-service/selected-project.service';
import { DocumentDto } from '../../../../api-dtos/document.dto';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-documents',
  imports: [TableModule, CommonModule, CardModule, FileUploadModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',

})
export class DocumentsComponent implements OnInit {
  projectId: number | null = null;
  constructor(private documentsService: DocumentsService, private messageService: MessageService, private selectedProjectService: SelectedProjectService) { }
  documents: DocumentDto[] = [];

  ngOnInit(): void {
    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId = projectId;
        this.loadDocuments();
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
    this.documentsService.deleteDocument(doc.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Document deleted successfully.' });
        this.loadDocuments(); // refresh list
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete document.' });
      }
    });
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
        this.loadDocuments(); // refresh list
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

  loadDocuments(): void {
    if (!this.projectId) return;

    this.documentsService.getDocumentsByProject(this.projectId).subscribe({
      next: (documents) => {
        this.documents = documents;
      },
      error: (err) => {
        console.error('Failed to load documents:', err);
      }
    });
  }
}
