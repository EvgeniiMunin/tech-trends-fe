export default function parseDate(dateString) {

    let date: any = {day:1, month:1, year:1970};
    date.year = parseInt(dateString.split('-')[0]);
    date.month = parseInt(dateString.split('-')[1]);
    date.day = parseInt(dateString.split('-')[2].split('T')[0]);

    return date
}
