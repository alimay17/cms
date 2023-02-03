import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // constructors
  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  // events
  documentSelectedEvent = new EventEmitter<Document>();

  // properties
  documents: Document[] = [];

  // methods
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if(document.id == id) {
        return document;
      }
    };
    return null;
  }
}
