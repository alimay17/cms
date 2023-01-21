import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = 'Alice Smith';
  @ViewChild('subject') subjectRef!: ElementRef;
  @ViewChild('msgText') msgTextRef!: ElementRef;
  @Output() newMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('971457', subject, msgText, this.currentSender);

    this.newMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}
