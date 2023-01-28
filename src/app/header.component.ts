import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  // custom events
  @Output() selectedFeatureEvent = new EventEmitter < string > ();

  // methods
  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }

}
