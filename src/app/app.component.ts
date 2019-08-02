import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  HostBinding
} from '@angular/core';
import { Highlightable, ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-item',
  styles: [`
    :host {
      display: block;
      margin: 1rem 0;
      padding: 1rem;
      background-color: #F2F2F2;
      transition: all 0.3s;
      outline: none;
      color: black;
    }

    :host.active {
      background-color: #292929;
      color: #ffffff;
      transform: translateX(1rem);
    }
  `],
  template: `
    <span>{{ superhero }}</span>
  `,
})
export class ListItemComponent implements Highlightable {
  private _isActive = false;

  @Input() superhero: string;

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  };

  getLabel(): string {
    return this.superhero;
  }  

  setActiveStyles() {
    this._isActive = true;
  };

  setInactiveStyles() {
    this._isActive = false;
  }
}

@Component({
  selector: 'app-list',
  styles: [`
    :host {
      display: block;
      max-width: 30rem;
    }
  `],
  template: `
    <ng-content></ng-content>
  `
})
export class ListComponent implements AfterContentInit {
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;
  private keyManager: ActiveDescendantKeyManager<ListItemComponent>;

  @HostListener('document:keydown', ['$event'])
  manage(event) {
    this.keyManager.onKeydown(event);
  }

  ngAfterContentInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
    this.keyManager.setFirstItemActive();
  }
}

@Component({
  selector: 'my-app',
  styles: [`
    :host {
      display: block;
      padding: 1rem;
    }
  `],
  template: `
    <h1>Superheroes</h1>
    
    <app-list>
      <app-list-item *ngFor="let superhero of superheroes" [superhero]="superhero"></app-list-item>
    </app-list>
  `,
})
export class AppComponent  {
  superheroes = [
    'Captain America',
    'Iron Man',
    'Thor',
    'Hulk',
    'Wonder Woman',
    'Batman',
    'Spiderman'
  ];
}
