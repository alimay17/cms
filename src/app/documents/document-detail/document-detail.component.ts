import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router,
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

  //methods
  onView() {
    if(this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
