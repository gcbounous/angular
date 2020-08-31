import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
  name: 'oderlist',
  pure: false // to sort while the list changes (BE CAREFULL with performance!)
})
export class OderlistPipe implements PipeTransform {
    
    property: string = '';

    transform(value: [], propName: string, order: string = 'asc'): any {
        this.property = propName;

        if (order === 'asc')
            return value.sort(this.sortFunctionAsc.bind(this));
        else if (order === 'desc')
            return value.sort(this.sortFunctionDesc.bind(this));
        else
            return value;
    }

    private sortFunctionAsc(a, b) {
        if (a[this.property] < b[this.property])
            return -1;
        if (a[this.property] > b[this.property])
            return 1;
        return 0;
    }

    private sortFunctionDesc(a, b) {
        if (a[this.property] > b[this.property])
            return -1;
        if (a[this.property] < b[this.property])
            return 1;
        return 0;
    }
}
