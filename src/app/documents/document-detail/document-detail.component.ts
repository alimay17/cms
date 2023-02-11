import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit{

  // properties
  document!: Document;

  // constructor
  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ){}

  // implements
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.document = this.documentService.getDocument(id)!;
      }
    )
  }
}
