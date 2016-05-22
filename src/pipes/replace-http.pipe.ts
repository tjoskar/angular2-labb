import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceHttp'})
export class ReplaceHttpPipe implements PipeTransform {

    transform(url: string): string {
        if (url && typeof url === 'string') {
            return url.replace('http://', 'https://');
        }
        return url;
    }

}
