import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {trigger, state, transition, animate, style, query, animateChild} from '@angular/animations';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'sbc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('openClose', [
        state('open', style({
           opacity: 1,
           visibility: 'visible',
        })),
        // when we go from close to open do these steps
        transition('close => open', [
          query(':self', [// animate div itself
              animate('200ms ease-in', style({
                opacity: 1,
                visibility: 'visible',
              }))
          ]),
          query('@animateChild', animateChild())// then animate children (.panel)
        ]),

        transition('open => close', [
          query('@animateChild', animateChild()),
          query(':self', animate('200ms ease-in')),
          
        ]),
    ]),
    trigger('animateChild', [
       state('open', style({ opacity: 1, transform: 'scale(1)' })),
       state('close', style({ opacity: 0, transform: 'scale(0.3)' })),
       transition('* => *', animate('100ms ease-out'))
    ])
  ]
})
export class ModalComponent implements OnInit, AfterViewInit {
  opened: boolean;
  @Input('width') width: string = '50%';
  @Input('position') position: 'absolute' | 'fixed' = 'fixed';
  id: string;
  zIndex: string;

  constructor() { 
    this.id = this.uniqeID();
  }

  ngOnInit() { }

  private uniqeID(): string{
    return Math.random().toString(36).substr(2, 9);
  }

  ngAfterViewInit(){
    this.appendToBody();
  }

  private appendToBody(){
    let el:any = document.getElementById(this.id);
    console.log('appendiung', el.parentNode.tagName);
    while (el.tagName.toLowerCase() != 'sbc-modal') {
      el = el.parentNode;
      if (!el) {
          return;
      }
    }
    document.body.appendChild(el);
  }

  open(zIndex?: string){
    this.zIndex = zIndex || '100';
    this.opened = true;
  }

  close(): Observable<number>{
    this.opened = false;
    // return observable so we can subscribe to it and do something after modal is closed
    return timer(100);
  }
}
