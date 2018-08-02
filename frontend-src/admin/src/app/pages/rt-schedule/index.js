import template from './page.template.html';

export default {
    template,
    controller: ('RtScheduleController', controller),
    bindings: {
        cabinets: "<",
        disciplines: "<",
        times: "<"
    }
};

controller.$inject = ['MaterialCalendarData', 'dataService'];

function controller(MaterialCalendarData, dataService) {
    const vm = this;

    vm.dayToEventsMap = {};
    vm.isAddFormVisible = false;
    vm.isEditFormVisible = false;
    vm.selectedDayEvents = [];

    vm.currentEvent = {
        selectedCabinets: [],
        selectedDisciplines: [],
        selectedTime: null
    }

    // Calendar-related variables stored in this object
    vm.calendar = {
        msg: '',

        weekStartsOn: 1,
        selectedDate: null,
        titleFormat: 'MMMM y',
        dayFormat: 'd',
        dayLabelFormat: 'EEE',
        dayLabelTooltipFormat: 'EEEE',
        dayTooltipFormat: 'fullDate',
        disableFutureDates: false,
        tooltipsEnabled: true,

        onDayClick: onDayClick,
        onPrevMonthClick: onPrevMonthClick,
        onNextMonthClick: onNextMonthClick,
        setDirection: setDirection,
        setContentViaService: setContentViaService,
        // setDayContent: setDayContent
    };

    vm.showAddForm = showAddForm;
    vm.showEditForm = showEditForm;
    vm.cancelSubmission = cancelSubmission;

    vm.exists = exists;
    vm.toggle = toggle;
    vm.addEvent = addEvent;
    vm.editEvent = editEvent;
    vm.deleteEvent = deleteEvent;

    getEvents();

    function resetCurrentEvent() {
        vm.currentEvent = {
            selectedCabinets: [],
            selectedDisciplines: [],
            selectedTime: null
        }
    }
    function cancelSubmission() {
        resetCurrentEvent();
        vm.showAddForm(false);
        vm.showEditForm(false);
    }

    function showAddForm(isVisible) {
        vm.isAddFormVisible = isVisible;
    }
    
    function showEditForm(isVisible, event) {
        vm.isEditFormVisible = isVisible;

        if (event) {
            console.log(event);
        
            vm.currentEvent = {
                selectedCabinets: event.cabinets.map(c => c._id),
                selectedDisciplines: event.disciplines.map(d => d._id),
                selectedTime: event.timeId._id,
                id: event._id
            }
            console.log(vm.currentEvent);
        }
    }

    function getEvents() {
        return dataService
            .getItems('rt-events')
            .then(onGetEventsSuccess);
    }

    function onGetEventsSuccess(data) {
        console.log('get all events request request');
        vm.dayToEventsMap = {};
        data.items.forEach(generateEvent);
        putEventsOnCalendar();
    }

    function putEventsOnCalendar() {
        angular.forEach(vm.dayToEventsMap, (day, key) => {
            const date = new Date(key)
            const dayContent = [];

            day.forEach(event => {
                let eventLine = event.timeId.name + ' ';

                event.disciplines.map(d => {
                    eventLine += d.name
                })
                dayContent.push(eventLine)
            })

            MaterialCalendarData.setDayContent(date, dayContent.join('<br>'))

        });
    }

    function generateEvent(item) {
        console.log('genItem', item);
        const date = new Date(item.date);
        const key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");

        if (!vm.dayToEventsMap[key]) {
            vm.dayToEventsMap[key] = [];
        }

        vm.dayToEventsMap[key].push(item);
        /* console.log(key, vm.dayToEventsMap);
        console.log('***vm.dayToEventsMap from generateEvent***');
        console.log(vm.dayToEventsMap); */
    }

    function addEvent() {
        console.log('**submit event fired, console below**');
        console.log(vm.calendar.selectedDate);
        console.log(vm.currentEvent.selectedTime);
        console.log(vm.currentEvent.selectedDisciplines);
        console.log(vm.currentEvent.selectedCabinets);
        console.log('**whoohoo???**');

        dataService
            .addItem('rt-events', {
                timeId: vm.currentEvent.selectedTime,
                disciplines: vm.currentEvent.selectedDisciplines,
                cabinets: vm.currentEvent.selectedCabinets,
                date: vm.calendar.selectedDate,
                capacity: 23,
            })
            .then(function () {
                console.log('success', arguments)
                vm.showAddForm(false);
                getEvents();
                resetCurrentEvent();
            })
            .catch(function () {
                console.log('error', arguments)
            });
    }

    function editEvent() {
        console.log(`i will edit an event with id ${vm.currentEvent.id}`);
        dataService
            .editItem('rt-events', vm.currentEvent.id, {
                timeId: vm.currentEvent.selectedTime,
                disciplines: vm.currentEvent.selectedDisciplines,
                cabinets: vm.currentEvent.selectedCabinets,
                date: vm.calendar.selectedDate,
                capacity: 23
            })
            .then(function () {
                console.log('success', arguments)
                vm.showEditForm(false);
                getEvents();
                resetCurrentEvent();
            })
            .catch(function () {
                console.log('error', arguments)
            });
            
    }

    function deleteEvent(id) {
        console.log(`i will delete an event with id ${id}`);
        dataService
            .deleteItem('rt-events', id)
            .then(function () {
                console.log('success', arguments)
                getEvents();
                resetCurrentEvent();
            })
    }
    
    // Calendar-related function definitions
    function onDayClick(dateString) {
        const date = new Date(dateString);
        const key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
        vm.selectedDayEvents = vm.dayToEventsMap[key] || [];

        console.log(vm.dayToEventsMap);
        console.log(vm.selectedDayEvents);
    };

    function setDirection(direction) {
        vm.calendar.direction = direction;
        vm.calendar.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    function numFmt(num) {
        num = num.toString();
        if (num.length < 2) {
            num = "0" + num;
        }
        return num;
    };

    function toggle(item, list) {
        const idx = list.indexOf(item._id);
        idx > -1 ? list.splice(idx, 1) : list.push(item._id);
    }

    function exists(item, list) {
        return list.indexOf(item._id) > -1;
    }

    /**
    |--------------------------------------------------
    | Unused Calendar-Related Functions
    |--------------------------------------------------
    */

    function onPrevMonthClick(data) {
        // vm.calendar.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    function onNextMonthClick(data) {
        // vm.calendar.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };
    function setContentViaService() {
        const today = new Date();
        MaterialCalendarData.setDayContent(today, '<span>HAPPY DAY WHOHOO</span>')
    }

    function setDayContent(date) {
        console.log(date);
        // set content for each day. return either html content or 
        // return angular promise for async action
    }
}