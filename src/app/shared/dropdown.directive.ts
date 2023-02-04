import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[cmsDropdown]'})
export class DropdownDirective {

  // properties
  @HostBinding('class.open') isOpen = false;

  // methods
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
