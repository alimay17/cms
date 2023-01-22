import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  
  // custom events
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // properties
  // hard coded documents list
  documents: Document[] = [
    new Document(
      '1',
      'Class List.docx',
      'List of classes for semester',
      'https//:url.com',
      []
    ),
    new Document(
      '2',
      'References.txt',
      'list of library references to look up',
      'https//:url.com',
      []
    ),
    new Document(
      '3',
      'Job Schedule.pdf',
      'my job schedule for next week',
      'https//:url.com',
      []
    ),
    new Document(
      '4',
      'notes.docx',
      'notes for math class',
      'https//:url.com',
      []
    )         
  ];

  // methods

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
