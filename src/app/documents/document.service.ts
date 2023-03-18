import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  // properties
  documents: Document[] = [];
  maxDocumentId: number = 0;
  private url = 'http://localhost:3000/documents';

  // events
  documentListChangedEvent = new Subject < Document[] > ();

  // constructor
  constructor(
    private httpClient: HttpClient
  ) {}
  
  /*============ Server Connection Methods =============*/

  // get all documents from server
  getDocuments() {
    // get document array from server
    this.httpClient.get<{message:string, content:Document[]}>(this.url)
    .subscribe({
      next: (response) => {
        this.documents = response.content;
        this.sortAndSend();
      },
      // handle errors
      error: (error:any) => {
        console.log(error.message);
      }
    });
  }

  // Add new Document
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    newDocument.id = '';

    // add to database
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, document: Document }>(
      this.url,
      newDocument,
      { headers: headers })
      .subscribe(
        (response) => {
          // update local documents
          this.documents.push(response.document);
          this.sortAndSend();
        }
      );
  }

  // update selected document
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    // set document position
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }

    // set id
    newDocument.id = originalDocument.id;

    // update database
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put(this.url + '/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response) => {
          // update local documents 
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  // deleted selected document
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    // get array position
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.url +'/' + document.id)
      .subscribe(
        (response) => {
          // update local documents array
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  
  /*========== internal helper methods ===========*/

  // single document by id
  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id == id) {
        return document;
      }
    };
    return null;
  }

  // sort documents list and update event listener
  private sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }
}