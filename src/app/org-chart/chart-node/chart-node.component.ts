import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  Renderer2,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Node } from "../models/node.model";
import { NodeSelectService } from "../services/node-select.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { OrganizationsService } from "src/app/modules/organization/organizations.service";

@Component({
  selector: "orgchart-node",
  templateUrl: "./chart-node.component.html",
  styleUrls: ["./chart-node.component.scss"],
  animations: [
    trigger("expandCollapse", [
      state(
        "expanded",
        style({
          transform: "translateY(0)",
          opacity: 1,
        })
      ),
      state(
        "collapsed",
        style({
          transform: "translateY(-50px)",
          opacity: 0,
        })
      ),
      transition("expanded => collapsed", [animate("0.2s")]),
      transition("collapsed => expanded", [animate("0.2s")]),
    ]),
  ],
})
export class ChartNodeComponent implements OnInit {
  @Input() datasource: Node;
  @Input() nodeHeading;
  @Input() nodeContent;
  @Input() nodeTemplate: TemplateRef<any>;
  @Input() groupScale: number;
  @Input() select: string;

  @Output() nodeClick = new EventEmitter<any>();

  Arr = Array; // Array type captured in a variable

  ecStyles: object;
  isSelected: boolean;
  subscription: Subscription;

  constructor(
    private nodeSelectService: NodeSelectService,
    private renderer: Renderer2,
    private _organiztions: OrganizationsService
  ) {
    // subscribe to node selection status
    this.subscription = this.nodeSelectService
      .getSelect()
      .subscribe((selection) => {
        if (selection && selection.id) {
          this.isSelected = this.datasource.id === selection.id;
        } else {
          // clear selection when empty selection received
          this.isSelected = false;
        }
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getNodeLogo(this.datasource.id);
  }

  getNodeLogo(logo) {
    this._organiztions.organizationFiles<any>(logo).subscribe((data: any[]) => {
      if (data.length > 0)
        this.datasource["logoImage"] = data[0].uuid || data["uuid"];
    });
  }
  toggleChildren(id) {
    this.datasource.collapse = !this.datasource.collapse;

    setTimeout(() => {
      try {
        const errorField = this.renderer.selectRootElement("#node-id-" + id);
        errorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      } catch (err) {}
    }, 300);
  }

  toggleAnimStart(event) {
    if (this.datasource.collapse) {
      if (
        event.element.parentElement &&
        event.element.parentElement.parentElement &&
        event.element.parentElement.parentElement.classList.contains("orgchart")
      ) {
        event.element.previousElementSibling.classList.add("oc-is-collapsed");
      }
    } else {
      this.ecStyles = {
        display: "flex",
      };
    }
  }

  toggleAnimEnd(event) {
    if (this.datasource.collapse) {
      this.ecStyles = {
        display: "none",
      };
    } else {
      if (
        event.element.parentElement &&
        event.element.parentElement.parentElement &&
        event.element.parentElement.parentElement.classList.contains("orgchart")
      ) {
        event.element.previousElementSibling.classList.remove(
          "oc-is-collapsed"
        );
      }
    }
  }

  onClickNode(e) {
    this.nodeClick.emit(this.datasource);
    if (this.select === "single") {
      this.nodeSelectService.sendSelect(this.datasource.id);
    } else if (this.select === "multiple") {
      this.isSelected = !this.isSelected;
    }
  }

  onNodeClick(e) {
    this.nodeClick.emit(e);
  }
}
