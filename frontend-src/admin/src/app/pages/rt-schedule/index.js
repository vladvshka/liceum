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

    vm.days = {};
    vm.isAddFormVisible = false;

    vm.selectedCabinets = [];
    vm.selectedDisciplines = [];
    vm.selectedTime;

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
       // setDayContent: //setDayContent
    };

    vm.showAddForm = showAddForm;

    vm.exists = exists;
    vm.toggle = toggle;
    vm.saveEvent = saveEvent;

    getEvents();

    function showAddForm(isVisible) {
        vm.isAddFormVisible = isVisible;
    }

    function getEvents () {
        return dataService
            .getItems('rt-events')
            .then(onEventsSuccess);
    }

    function onEventsSuccess(data) {
        console.log('all events get request');
        data.items.forEach(generateEvent);
        putEventsOnCalendar();
    }

    function putEventsOnCalendar() {
        angular.forEach(vm.days, (day, key) => {
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

    function generateEvent(item)  {
        console.log('genItem', item)
        const date = new Date(item.date);
        const key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");

        if (!vm.days[key]) {
            vm.days[key] = [];
        }
        
        vm.days[key].push(item);
        console.log(key, vm.days)
    }

    function saveEvent() {
        console.log(vm.calendar.selectedDate, vm.selectedCabinets, vm.selectedTime, vm.selectedDisciplines)
        dataService.addItem('rt-events', {
            timeId: vm.selectedTime,
            disciplines: vm.selectedDisciplines,
            cabinets: vm.selectedCabinets,
            capacity: 23,
            date: vm.calendar.selectedDate,
        }).then(function(){
            console.log('success', arguments)
        }).catch(function(){
            console.log('error', arguments)
        })
    }

    // Calendar-related function definitions
    function onDayClick(dateString) {
        const date = new Date(dateString);
        const key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
        vm.selectedDay = vm.days[key];

        //vm.calendar.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
        //MaterialCalendarData.setDayContent(date, '<span> ' + date + ' </span><h1></h1>')
    };

    function onPrevMonthClick(data) {
        vm.calendar.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    function onNextMonthClick(data) {
        vm.calendar.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    function setDirection(direction) {
        vm.calendar.direction = direction;
        vm.calendar.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    function setContentViaService() {
        var today = new Date();
        MaterialCalendarData.setDayContent(today, '<span>HAPPY DAY WHOHOO</span>')
    }

    function setDayContent(date) {
        console.log(date);
        
        return dataService
            .getItems('rt-periods')
            .then(data => {
                console.log('whoohoo, im a new request');
                console.log(data.items);
            });

        // return '<i>setDayContent working</i>';
    }
    
    function numFmt(num) {
        num = num.toString();
        if (num.length < 2) {
            num = "0" + num;
        }
        return num;
    };



    function toggle(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item._id);
        }
      }
    
    function exists(item, list) {
        return list.indexOf(item._id) > -1;
      }


    /**** START OF RIDICULOUS ASYNC EXAMPLE ****/

    /* const loadContentAsync = true;
    const holidays = { "2018-01-01": [{ "name": "Last Day of Kwanzaa", "country": "US", "date": "2018-01-01" }, { "name": "New Year's Day", "country": "US", "date": "2018-01-01" }], "2018-01-06": [{ "name": "Epiphany", "country": "US", "date": "2018-01-06" }], "2018-01-07": [{ "name": "Orthodox Christmas", "country": "US", "date": "2018-01-07" }], "2018-01-19": [{ "name": "Martin Luther King, Jr. Day", "country": "US", "date": "2018-01-19" }], "2018-02-02": [{ "name": "Groundhog Day", "country": "US", "date": "2018-02-02" }], "2018-02-14": [{ "name": "Valentine's Day", "country": "US", "date": "2018-02-14" }], "2018-02-16": [{ "name": "Washington's Birthday", "country": "US", "date": "2018-02-16" }], "2018-02-18": [{ "name": "Ash Wednesday", "country": "US", "date": "2018-02-18" }], "2018-03-08": [{ "name": "International Women's Day", "country": "US", "date": "2018-03-08" }], "2018-03-17": [{ "name": "Saint Patrick's Day", "country": "US", "date": "2018-03-17" }], "2018-03-29": [{ "name": "Palm Sunday", "country": "US", "date": "2018-03-29" }], "2018-04-01": [{ "name": "April Fools' Day", "country": "US", "date": "2018-04-01" }], "2018-04-03": [{ "name": "Good Friday", "country": "US", "date": "2018-04-03" }], "2018-04-05": [{ "name": "Easter", "country": "US", "date": "2018-04-05" }], "2018-04-22": [{ "name": "Earth Day", "country": "US", "date": "2018-04-22" }], "2018-04-24": [{ "name": "Arbor Day", "country": "US", "date": "2018-04-24" }], "2018-05-01": [{ "name": "May Day", "country": "US", "date": "2018-05-01" }], "2018-05-04": [{ "name": "Star Wars Day", "country": "US", "date": "2018-05-04" }], "2018-05-05": [{ "name": "Cinco de Mayo", "country": "US", "date": "2018-05-05" }], "2018-05-10": [{ "name": "Mother's Day", "country": "US", "date": "2018-05-10" }], "2018-05-25": [{ "name": "Memorial Day", "country": "US", "date": "2018-05-25" }], "2018-06-14": [{ "name": "Flag Day", "country": "US", "date": "2018-06-14" }], "2018-06-21": [{ "name": "Father's Day", "country": "US", "date": "2018-06-21" }], "2018-06-27": [{ "name": "Helen Keller Day", "country": "US", "date": "2018-06-27" }], "2018-07-04": [{ "name": "Independence Day", "country": "US", "date": "2018-07-04" }], "2018-08-26": [{ "name": "Women's Equality Day", "country": "US", "date": "2018-08-26" }], "2018-09-07": [{ "name": "Labor Day", "country": "US", "date": "2018-09-07" }], "2018-09-11": [{ "name": "Patriot Day", "country": "US", "date": "2018-09-11" }], "2018-09-13": [{ "name": "Grandparent's Day", "country": "US", "date": "2018-09-13" }], "2018-09-17": [{ "name": "Constitution Day", "country": "US", "date": "2018-09-17" }], "2018-10-06": [{ "name": "German-American Day", "country": "US", "date": "2018-10-06" }], "2018-10-09": [{ "name": "Leif Erkson Day", "country": "US", "date": "2018-10-09" }], "2018-10-12": [{ "name": "Columbus Day", "country": "US", "date": "2018-10-12" }], "2018-10-31": [{ "name": "Halloween", "country": "US", "date": "2018-10-31" }], "2018-11-03": [{ "name": "Election Day", "country": "US", "date": "2018-11-03" }], "2018-11-11": [{ "name": "Veterans Day", "country": "US", "date": "2018-11-11" }], "2018-11-26": [{ "name": "Thanksgiving Day", "country": "US", "date": "2018-11-26" }], "2018-11-27": [{ "name": "Black Friday", "country": "US", "date": "2018-11-27" }], "2018-12-07": [{ "name": "Pearl Harbor Remembrance Day", "country": "US", "date": "2018-12-07" }], "2018-12-08": [{ "name": "Immaculate Conception of the Virgin Mary", "country": "US", "date": "2018-12-08" }], "2018-12-24": [{ "name": "Christmas Eve", "country": "US", "date": "2018-12-24" }], "2018-12-25": [{ "name": "Christmas", "country": "US", "date": "2018-12-25" }], "2018-12-26": [{ "name": "First Day of Kwanzaa", "country": "US", "date": "2018-12-26" }], "2018-12-27": [{ "name": "Second Day of Kwanzaa", "country": "US", "date": "2018-12-27" }], "2018-12-28": [{ "name": "Third Day of Kwanzaa", "country": "US", "date": "2018-12-28" }], "2018-12-29": [{ "name": "Fourth Day of Kwanzaa", "country": "US", "date": "2018-12-29" }], "2018-12-30": [{ "name": "Fifth Day of Kwanzaa", "country": "US", "date": "2018-12-30" }], "2018-12-31": [{ "name": "New Year's Eve", "country": "US", "date": "2018-12-31" }, { "name": "Sixth Day of Kwanzaa", "country": "US", "date": "2018-12-31" }], "2018-01-01": [{ "name": "Last Day of Kwanzaa", "country": "US", "date": "2018-01-01" }, { "name": "New Year's Day", "country": "US", "date": "2018-01-01" }], "2018-01-06": [{ "name": "Epiphany", "country": "US", "date": "2018-01-06" }], "2018-01-07": [{ "name": "Orthodox Christmas", "country": "US", "date": "2018-01-07" }], "2018-01-18": [{ "name": "Martin Luther King, Jr. Day", "country": "US", "date": "2018-01-18" }], "2018-02-02": [{ "name": "Groundhog Day", "country": "US", "date": "2018-02-02" }], "2018-02-10": [{ "name": "Ash Wednesday", "country": "US", "date": "2018-02-10" }], "2018-02-14": [{ "name": "Valentine's Day", "country": "US", "date": "2018-02-14" }], "2018-02-15": [{ "name": "Washington's Birthday", "country": "US", "date": "2018-02-15" }], "2018-03-08": [{ "name": "International Women's Day", "country": "US", "date": "2018-03-08" }], "2018-03-17": [{ "name": "Saint Patrick's Day", "country": "US", "date": "2018-03-17" }], "2018-03-20": [{ "name": "Palm Sunday", "country": "US", "date": "2018-03-20" }], "2018-03-25": [{ "name": "Good Friday", "country": "US", "date": "2018-03-25" }], "2018-03-27": [{ "name": "Easter", "country": "US", "date": "2018-03-27" }], "2018-04-01": [{ "name": "April Fools' Day", "country": "US", "date": "2018-04-01" }], "2018-04-22": [{ "name": "Earth Day", "country": "US", "date": "2018-04-22" }], "2018-04-29": [{ "name": "Arbor Day", "country": "US", "date": "2018-04-29" }], "2018-05-01": [{ "name": "May Day", "country": "US", "date": "2018-05-01" }], "2018-05-04": [{ "name": "Star Wars Day", "country": "US", "date": "2018-05-04" }], "2018-05-05": [{ "name": "Cinco de Mayo", "country": "US", "date": "2018-05-05" }], "2018-05-08": [{ "name": "Mother's Day", "country": "US", "date": "2018-05-08" }], "2018-05-30": [{ "name": "Memorial Day", "country": "US", "date": "2018-05-30" }], "2018-06-14": [{ "name": "Flag Day", "country": "US", "date": "2018-06-14" }], "2018-06-19": [{ "name": "Father's Day", "country": "US", "date": "2018-06-19" }], "2018-06-27": [{ "name": "Helen Keller Day", "country": "US", "date": "2018-06-27" }], "2018-07-04": [{ "name": "Independence Day", "country": "US", "date": "2018-07-04" }], "2018-08-26": [{ "name": "Women's Equality Day", "country": "US", "date": "2018-08-26" }], "2018-09-05": [{ "name": "Labor Day", "country": "US", "date": "2018-09-05" }], "2018-09-11": [{ "name": "Grandparent's Day", "country": "US", "date": "2018-09-11" }, { "name": "Patriot Day", "country": "US", "date": "2018-09-11" }], "2018-09-17": [{ "name": "Constitution Day", "country": "US", "date": "2018-09-17" }], "2018-10-06": [{ "name": "German-American Day", "country": "US", "date": "2018-10-06" }], "2018-10-09": [{ "name": "Leif Erkson Day", "country": "US", "date": "2018-10-09" }], "2018-10-10": [{ "name": "Columbus Day", "country": "US", "date": "2018-10-10" }], "2018-10-31": [{ "name": "Halloween", "country": "US", "date": "2018-10-31" }], "2018-11-08": [{ "name": "Election Day", "country": "US", "date": "2018-11-08" }, { "name": "Super Tuesday", "country": "US", "date": "2018-11-08" }], "2018-11-11": [{ "name": "Veterans Day", "country": "US", "date": "2018-11-11" }], "2018-11-24": [{ "name": "Thanksgiving Day", "country": "US", "date": "2018-11-24" }], "2018-11-25": [{ "name": "Black Friday", "country": "US", "date": "2018-11-25" }], "2018-12-07": [{ "name": "Pearl Harbor Remembrance Day", "country": "US", "date": "2018-12-07" }], "2018-12-08": [{ "name": "Immaculate Conception of the Virgin Mary", "country": "US", "date": "2018-12-08" }], "2018-12-24": [{ "name": "Christmas Eve", "country": "US", "date": "2018-12-24" }], "2018-12-25": [{ "name": "Christmas", "country": "US", "date": "2018-12-25" }], "2018-12-26": [{ "name": "First Day of Kwanzaa", "country": "US", "date": "2018-12-26" }], "2018-12-27": [{ "name": "Second Day of Kwanzaa", "country": "US", "date": "2018-12-27" }], "2018-12-28": [{ "name": "Third Day of Kwanzaa", "country": "US", "date": "2018-12-28" }], "2018-12-29": [{ "name": "Fourth Day of Kwanzaa", "country": "US", "date": "2018-12-29" }], "2018-12-30": [{ "name": "Fifth Day of Kwanzaa", "country": "US", "date": "2018-12-30" }], "2018-12-31": [{ "name": "New Year's Eve", "country": "US", "date": "2018-12-31" }, { "name": "Sixth Day of Kwanzaa", "country": "US", "date": "2018-12-31" }] };
    
    console.info("setDayContent.async", loadContentAsync);

    function setDayContent(date) {
        let key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
        let data = (holidays[key] || [{ name: "" }])[0].name;
        if (loadContentAsync) {
            let deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
        return data;
    };

     */

    /**** END OF RIDICULOUS ASYNC EXAMPLE ****/
}