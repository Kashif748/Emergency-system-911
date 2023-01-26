import { ElementRef, Injectable } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  // Private properties
  private el: ElementRef;
  private stopped: boolean;

  private _browserVersion: BehaviorSubject<string>;
  private _isSupportedBrowser: BehaviorSubject<boolean>;

  /**
   * Service constructor
   *
   * @param animationBuilder: AnimationBuilder
   */
  constructor(private animationBuilder: AnimationBuilder) {
    this.isSupportedBrowser = new BehaviorSubject<boolean>(true);
    this.browserVersion = new BehaviorSubject<string>('');
  }

  /**
   * Init
   *
   * @param element: ElementRef
   */
  init(element: ElementRef) {
    this.el = element;
  }

  /**
   *
   * setter -getter browserVersion
   */

  public get browserVersion(): BehaviorSubject<string> {
    return this._browserVersion;
  }
  public set browserVersion(value: BehaviorSubject<string>) {
    this._browserVersion = value;
  }

  /**
   *
   * setter -getter isSupportedBrowser
   */

  public get isSupportedBrowser(): BehaviorSubject<boolean> {
    return this._isSupportedBrowser;
  }
  public set isSupportedBrowser(value: BehaviorSubject<boolean>) {
    this._isSupportedBrowser = value;
  }

  /**
   * Hide
   */
  hide() {
    if (this.stopped || !this.el) {
      return;
    }

    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(800, style({ opacity: '0' }))])
      .create(this.el.nativeElement);

    player.onDone(() => {
      if (typeof this.el.nativeElement.remove === 'function') {
        this.el.nativeElement.remove();
      } else {
        this.el.nativeElement.style.display = 'none !important';
      }
      this.stopped = true;
    });

    setTimeout(() => {
      player.play();
    }, 300);
  }

  show() {
    if (!this.stopped) {
      return;
    }

    const player = this.animationBuilder

      .build([
        style({ display: '', opacity: '0' }),
        animate(800, style({ opacity: '1' })),
      ])

      .create(this.el.nativeElement);

    player.onDone(() => {
      this.stopped = false;
    });

    player.play();
  }

  checkBrowserVersion() {
    let browser = '';
    const agent = window.navigator.userAgent.toLowerCase();

    switch (true) {
      case agent.indexOf('edg') > -1:
        browser = 'edge';
        break;
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        browser = 'opera';
        break;
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        browser = 'chrome';
        break;
      case agent.indexOf('trident') > -1:
        browser = 'ie';
        break;
      case agent.indexOf('firefox') > -1:
        browser = 'firefox';
        break;
      case agent.indexOf('safari') > -1:
        browser = 'safari';
        break;
      default:
        browser = 'other';
    }
    this.browserVersion.next(browser);
    if (browser == 'ie' || browser == 'opera') {
      this.isSupportedBrowser.next(false);
      return false;
    }
    this.isSupportedBrowser.next(true);
    return true;
  }
}
