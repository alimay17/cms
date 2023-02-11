import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit {
  
  // properties
  selectedDocument!: Document;

  //constructors
  constructor(){}

  // implements
  ngOnInit() {}
}
