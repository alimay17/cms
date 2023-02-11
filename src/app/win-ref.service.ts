import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WinRefService {

  // methods
  getNativeWindow() {
    return window;
  }
}
