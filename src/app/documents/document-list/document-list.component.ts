import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit {
  // constructors
  constructor(private documentService: DocumentService){}
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  // properties
  documents: Document[] = []

  // methods
  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
