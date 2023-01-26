import { Pipe, PipeTransform } from "@angular/core";
import { OrgService } from "@core/api/services/org.service";
@Pipe({
  name: "LockFilter",
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}
