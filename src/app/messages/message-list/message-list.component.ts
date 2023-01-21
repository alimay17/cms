import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent {
  messages: Message[] = [
    new Message(
      '001',
      'Your Grades',
      'You have a 100% on the test',
      'Paul Murff'
    ),
    new Message(
      '002',
      'Group Meeting',
      'Meeting this week at 10',
      'Shah Rukh Khan'
    ),
    new Message(
      '003',
      'Dance Class Performance',
      'Performance is at the Victor Bldg',
      'Wednesday Addams'
    )
  ]

  onAddMessage(newMessage: Message) {
    this.messages.push(newMessage);
  }
}
