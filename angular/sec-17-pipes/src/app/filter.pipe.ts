import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false // allow that pipe recalculates on every data change (it can be harmful for performance)
})
export class FilterPipe implements PipeTransform {

    transform(serverArray: any, filterString: string, property: string): any {
        if(!serverArray || !filterString) {
            return serverArray;
        }

        const resultArray = [];
        for(let item of serverArray) {
            if(item[property] == filterString){
                resultArray.push(item);
            }
        }
        return resultArray;
    }

}
