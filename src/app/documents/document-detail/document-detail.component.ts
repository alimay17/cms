import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
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
  nativeWindow: any;

  // constructor
  constructor(
    private windowRefService: WinRefService,
    private documentService: DocumentService,
    private route: ActivatedRoute
  ){
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  // implements
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.document = this.documentService.getDocument(id)!;
      }
    )
  }

  onView() {
    if(this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
}
