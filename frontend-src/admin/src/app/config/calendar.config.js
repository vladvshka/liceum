export default function calendarConfig(calendarConfig) {
    // View all available config
    console.log(calendarConfig);

    // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
    calendarConfig.dateFormatter = 'moment';
}