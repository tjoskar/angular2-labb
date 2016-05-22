import { Pipe } from '@angular/core';

@Pipe({
    name: 'dateString'
})
class DateStringPipe {

    transform(dateString: string, type: string) {
        const [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec(dateString) || [, , , , ];
        switch (type) {
            case 'year':
                return year;
            case 'month':
                return month;
            case 'day':
                return day;
            default:
                return '';
        }
    }

}

export default DateStringPipe;
export { DateStringPipe };
