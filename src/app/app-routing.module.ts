// angular 
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsComponent } from "./contacts/contacts.component";

// app imports
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";

// routing
const appRoutes: Routes = [
  // documents
  {path: 'documents', component: DocumentsComponent},

  // messages
  {path: 'messages', component: MessageListComponent},

  // contacts
  {path: 'contacts', component: ContactsComponent},

  // default
  {path: '', redirectTo: '/documents', pathMatch: 'full'}
]

// main config
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}