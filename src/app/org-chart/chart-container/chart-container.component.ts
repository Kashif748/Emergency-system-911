import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  Renderer2,
} from "@angular/core";
import { NodeSelectService } from "../services/node-select.service";

@Component({
  selector: "organization-chart",
  templateUrl: "./chart-container.component.html",
  styleUrls: ["./chart-container.component.scss"],
})
export class ChartContainerComponent implements OnInit {
  index = 0;

  @Input() datasource;
  @Input() nodeHeading = "name";
  @Input() nodeContent = "title";
  @Input() nodeTemplate: TemplateRef<any>;
  @Input() groupScale = 3;
  @Input() pan = false;
  @Input() zoom = false;
  @Input() zoomoutLimit = 0.5;
  @Input() zoominLimit = 7;
  @Input() containerClass = "";
  @Input() chartClass = "";
  @Input() select = "single";

  @Output() nodeClick = new EventEmitter<any>();
  @Output() chartClick = new EventEmitter();

  transformVal = "";

  currentZoom = 0;
  constructor(
    private nodeSelectService: NodeSelectService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  setChartScale(newScale) {
    let matrix = [];
    let targetScale = 1;
    if (this.transformVal === "") {
      this.transformVal =
        "matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)";
    } else {
      matrix = this.transformVal.split(",");
      if (this.transformVal.indexOf("3d") === -1) {
        targetScale = Math.abs(parseFloat(matrix[3]) * newScale);
        if (targetScale > this.zoomoutLimit && targetScale < this.zoominLimit) {
          matrix[0] = "matrix(" + targetScale;
          matrix[3] = targetScale;
          this.transformVal = matrix.join(",");
        }
      } else {
        targetScale = Math.abs(parseFloat(matrix[5]) * newScale);
        if (targetScale > this.zoomoutLimit && targetScale < this.zoominLimit) {
          matrix[0] = "matrix3d(" + targetScale;
          matrix[5] = targetScale;
          this.transformVal = matrix.join(",");
        }
      }
    }
  }

  zoomHandlerBtn(zoomType) {
    const newScale = 1 + (zoomType ? 0.2 : -0.2);

    this.setChartScale(newScale);
  }
  onClickChart(e) {
    if (!e.target.closest(".oc-node")) {
      this.chartClick.emit();
      this.nodeSelectService.clearSelect();
    }
  }

  onNodeClick(nodeData: any) {
    this.nodeClick.emit(nodeData);
  }

  searchForNode(value) {
    let path = this.findNodePath(this.datasource, value);
    if (path && path.length > 0) {
      this.collapsePath(path);
    }
  }

  searchForIdRecursion(list: any[], value): any[] {
    return list.filter((item) => {
      if (item.code && item.code.toLowerCase().indexOf(value) > -1) return item;
      else if (list["children"]) {
        return this.searchForIdRecursion(list["children"], value);
      }
    });
  }

  findNodePath(struct, cmp: string) {
    if (struct.code && struct.code.toLowerCase() == cmp.toLocaleLowerCase()) {
      // `cmp` is found at current `struct`.
      return [struct];
    } else if (struct.children) {
      for (var i = 0; i < struct.children.length; i++) {
        var path = this.findNodePath(struct.children[i], cmp);
        if (path !== null) {
          // `cmp` is found at `path` in `struct.children[i]`,
          // so prefix `i` to `path` to get the path in `struct`.
          path.unshift(struct);
          return path;
        }
      }
    }
    // `cmp` not found in this branch of the tree.
    return null;
  }

  collapsePath(path: any[]) {
    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      node.collapse = false;
      if (i == path.length - 1) {
        node.collapse = true;
        setTimeout(() => {
          try {
            let targetNode = this.renderer.selectRootElement(
              "#node-id-" + node.id
            );

            targetNode.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
            targetNode = this.renderer.selectRootElement(`#oc-node-${node.id}`);
            targetNode.click();
          } catch (err) {}
        }, 300);
      }
    }
  }
}
