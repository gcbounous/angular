import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, limit: number = 10) {
        let shorten = value;
        if (value.length > limit) {
            shorten = value.substr(0, limit) + '...';
        }
        return shorten;
    }

}