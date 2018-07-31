import template from './page.template.html';

export default {
    template,
    controller: ('RtScheduleController', controller)
};

controller.$inject = ['moment'];

function controller(moment) {
    let vm = this;

    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.cellModifier = cellModifier;

    vm.events = [
        {
            title: '1 Этап РТ', // The title of the event
            startsAt: new Date(2018, 5, 1), // A javascript date object for when the event starts
            endsAt: new Date(2018, 8, 26), // Optional - a javascript date object for when the event ends
            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                primary: '#e3bc08', // the primary event color (should be darker than secondary)
                secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
            }
        },
        {
            title: 'Сдача РТ',
            startsAt: new Date(2018, 6, 31, 1), // A javascript date object for when the event starts
            endsAt: new Date(2018, 6, 31, 15), // Optional - a javascript date object for when the event ends
            
        }
    ];

    function cellModifier(cell) {
        console.log(cell);
        if (cell.events.length !== 0) {
            console.log(cell.events[0].color);
        }
    }

    moment.updateLocale('en_gb', {
        week: {
            dow: 1 // Monday is the first day of the week
        }
    });
}