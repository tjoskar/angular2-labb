import { Pipe } from '@angular/core';

@Pipe({
    name: 'dateString'
})
class DateStringPipe {

    transform(dateString: string, type: string) {
        const [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec(dateString) || [, , , , ];
        return '';
    }

}

export default DateStringPipe;
export { DateStringPipe };
