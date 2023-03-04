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

  // events
  documentListChangedEvent = new Subject < Document[] > ();

  // constructor
  constructor(
    private httpClient: HttpClient
  ) {}

  // methods

  
  /*============ Server Connection Methods =============*/

  // get all documents from server
  getDocuments() {
    const url = 'https://angular-cms-wdd430-default-rtdb.firebaseio.com/documents.json';
    // get document array from server
    this.httpClient.get<Document[]>(url).subscribe({
      next: (documents: Document[]) =>{

        // sort and assign to local document array
        this.documents = documents.sort((a: Document, b: Document) =>{
          if(a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        });;

        // assign maxId
        this.maxDocumentId = this.getMaxId();

        // update subscription
        this.documentListChangedEvent.next(this.documents.slice());
      },
      // handle errors
      error: (error:any) => {
        console.log(error.message);
      }
    });
  }

  // store all documents to server
  storeDocuments(){
    const putData = JSON.stringify(this.documents);
    const url = 'https://angular-cms-wdd430-default-rtdb.firebaseio.com/documents.json';

    this.httpClient.put(
      url,
      putData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).subscribe(()=>{
      this.documentListChangedEvent.next(this.documents.slice());
    })
  
  }

  
  /*========== Local Manipulation Methods ===========*/

  // single document by id
  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id == id) {
        return document;
      }
    };
    return null;
  }

  // Add new Document
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    this.storeDocuments();
  }

  // update selected document
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  // deleted selected document
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  // internal helper methods
  private getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}