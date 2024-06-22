
export function DateFromDayMonthYearString(stringDate){
    //takes a string representina a date in the format dd/mm/yyyy and returns the corresponding date object.
    return new Date(stringDate.split('/').reverse().join('-'))
}