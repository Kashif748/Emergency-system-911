import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskfilter'
})
export class TaskfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.title.toLowerCase().includes(searchText) || it.body.toLowerCase().includes(searchText) 
    });
   }
}
