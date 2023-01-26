import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PrivilegesService } from '@core/services/privileges.service';

@Directive({
  selector: '[appPrivileges]',
})
export class PrivilegesDirective implements OnInit {
  // Variables.
  @Input('appPrivileges') actionPrivilege: string | string[];

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private privilegesService: PrivilegesService
  ) {}

  ngOnInit(): void {
    this.checkActionPrivilege();
  }

  checkActionPrivilege() {
    const res = this.privilegesService.checkActionPrivileges(
      this.actionPrivilege
    );
    if (res) {
      this.render();
    }
  }

  render() {
    this.vcr.createEmbeddedView(this.templateRef);
  }
}
