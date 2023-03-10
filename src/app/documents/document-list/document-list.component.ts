import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {

  // properties
  documents: Document[] = [];

  // event subscriptions
  private subscription!: Subscription;

  // constructors
  constructor(private documentService: DocumentService) {}

  // implements
  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      });

    this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}