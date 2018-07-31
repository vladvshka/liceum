import template from './page.template.html';

export default {
    template,
    controller: ('RtScheduleController', controller)
};

controller.$inject = ['$scope', '$q', '$timeout', '$filter', 'MaterialCalendarData', 'moment'];

function controller($scope, $q, $timeout,  $filter, MaterialCalendarData, moment) {
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


    //Example///

    $scope.selectedDate = new Date();
    $scope.weekStartsOn = 0;
    $scope.dayFormat = "d";
    $scope.tooltips = true;
    $scope.disableFutureDates = false;

    $scope.setDirection = function(direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
        MaterialCalendarData.setDayContent(date, '<span> ' + date + ' </span><h1></h1>')
    };

    $scope.prevMonth = function(data) {
        $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
        $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.setContentViaService = function() {
        var today = new Date();
        MaterialCalendarData.setDayContent(today, '<span> :oD </span><h1></h1>')
    }

    var holidays = {"2018-01-01":[{"name":"Last Day of Kwanzaa","country":"US","date":"2018-01-01"},{"name":"New Year's Day","country":"US","date":"2018-01-01"}],"2018-01-06":[{"name":"Epiphany","country":"US","date":"2018-01-06"}],"2018-01-07":[{"name":"Orthodox Christmas","country":"US","date":"2018-01-07"}],"2018-01-19":[{"name":"Martin Luther King, Jr. Day","country":"US","date":"2018-01-19"}],"2018-02-02":[{"name":"Groundhog Day","country":"US","date":"2018-02-02"}],"2018-02-14":[{"name":"Valentine's Day","country":"US","date":"2018-02-14"}],"2018-02-16":[{"name":"Washington's Birthday","country":"US","date":"2018-02-16"}],"2018-02-18":[{"name":"Ash Wednesday","country":"US","date":"2018-02-18"}],"2018-03-08":[{"name":"International Women's Day","country":"US","date":"2018-03-08"}],"2018-03-17":[{"name":"Saint Patrick's Day","country":"US","date":"2018-03-17"}],"2018-03-29":[{"name":"Palm Sunday","country":"US","date":"2018-03-29"}],"2018-04-01":[{"name":"April Fools' Day","country":"US","date":"2018-04-01"}],"2018-04-03":[{"name":"Good Friday","country":"US","date":"2018-04-03"}],"2018-04-05":[{"name":"Easter","country":"US","date":"2018-04-05"}],"2018-04-22":[{"name":"Earth Day","country":"US","date":"2018-04-22"}],"2018-04-24":[{"name":"Arbor Day","country":"US","date":"2018-04-24"}],"2018-05-01":[{"name":"May Day","country":"US","date":"2018-05-01"}],"2018-05-04":[{"name":"Star Wars Day","country":"US","date":"2018-05-04"}],"2018-05-05":[{"name":"Cinco de Mayo","country":"US","date":"2018-05-05"}],"2018-05-10":[{"name":"Mother's Day","country":"US","date":"2018-05-10"}],"2018-05-25":[{"name":"Memorial Day","country":"US","date":"2018-05-25"}],"2018-06-14":[{"name":"Flag Day","country":"US","date":"2018-06-14"}],"2018-06-21":[{"name":"Father's Day","country":"US","date":"2018-06-21"}],"2018-06-27":[{"name":"Helen Keller Day","country":"US","date":"2018-06-27"}],"2018-07-04":[{"name":"Independence Day","country":"US","date":"2018-07-04"}],"2018-08-26":[{"name":"Women's Equality Day","country":"US","date":"2018-08-26"}],"2018-09-07":[{"name":"Labor Day","country":"US","date":"2018-09-07"}],"2018-09-11":[{"name":"Patriot Day","country":"US","date":"2018-09-11"}],"2018-09-13":[{"name":"Grandparent's Day","country":"US","date":"2018-09-13"}],"2018-09-17":[{"name":"Constitution Day","country":"US","date":"2018-09-17"}],"2018-10-06":[{"name":"German-American Day","country":"US","date":"2018-10-06"}],"2018-10-09":[{"name":"Leif Erkson Day","country":"US","date":"2018-10-09"}],"2018-10-12":[{"name":"Columbus Day","country":"US","date":"2018-10-12"}],"2018-10-31":[{"name":"Halloween","country":"US","date":"2018-10-31"}],"2018-11-03":[{"name":"Election Day","country":"US","date":"2018-11-03"}],"2018-11-11":[{"name":"Veterans Day","country":"US","date":"2018-11-11"}],"2018-11-26":[{"name":"Thanksgiving Day","country":"US","date":"2018-11-26"}],"2018-11-27":[{"name":"Black Friday","country":"US","date":"2018-11-27"}],"2018-12-07":[{"name":"Pearl Harbor Remembrance Day","country":"US","date":"2018-12-07"}],"2018-12-08":[{"name":"Immaculate Conception of the Virgin Mary","country":"US","date":"2018-12-08"}],"2018-12-24":[{"name":"Christmas Eve","country":"US","date":"2018-12-24"}],"2018-12-25":[{"name":"Christmas","country":"US","date":"2018-12-25"}],"2018-12-26":[{"name":"First Day of Kwanzaa","country":"US","date":"2018-12-26"}],"2018-12-27":[{"name":"Second Day of Kwanzaa","country":"US","date":"2018-12-27"}],"2018-12-28":[{"name":"Third Day of Kwanzaa","country":"US","date":"2018-12-28"}],"2018-12-29":[{"name":"Fourth Day of Kwanzaa","country":"US","date":"2018-12-29"}],"2018-12-30":[{"name":"Fifth Day of Kwanzaa","country":"US","date":"2018-12-30"}],"2018-12-31":[{"name":"New Year's Eve","country":"US","date":"2018-12-31"},{"name":"Sixth Day of Kwanzaa","country":"US","date":"2018-12-31"}],"2018-01-01":[{"name":"Last Day of Kwanzaa","country":"US","date":"2018-01-01"},{"name":"New Year's Day","country":"US","date":"2018-01-01"}],"2018-01-06":[{"name":"Epiphany","country":"US","date":"2018-01-06"}],"2018-01-07":[{"name":"Orthodox Christmas","country":"US","date":"2018-01-07"}],"2018-01-18":[{"name":"Martin Luther King, Jr. Day","country":"US","date":"2018-01-18"}],"2018-02-02":[{"name":"Groundhog Day","country":"US","date":"2018-02-02"}],"2018-02-10":[{"name":"Ash Wednesday","country":"US","date":"2018-02-10"}],"2018-02-14":[{"name":"Valentine's Day","country":"US","date":"2018-02-14"}],"2018-02-15":[{"name":"Washington's Birthday","country":"US","date":"2018-02-15"}],"2018-03-08":[{"name":"International Women's Day","country":"US","date":"2018-03-08"}],"2018-03-17":[{"name":"Saint Patrick's Day","country":"US","date":"2018-03-17"}],"2018-03-20":[{"name":"Palm Sunday","country":"US","date":"2018-03-20"}],"2018-03-25":[{"name":"Good Friday","country":"US","date":"2018-03-25"}],"2018-03-27":[{"name":"Easter","country":"US","date":"2018-03-27"}],"2018-04-01":[{"name":"April Fools' Day","country":"US","date":"2018-04-01"}],"2018-04-22":[{"name":"Earth Day","country":"US","date":"2018-04-22"}],"2018-04-29":[{"name":"Arbor Day","country":"US","date":"2018-04-29"}],"2018-05-01":[{"name":"May Day","country":"US","date":"2018-05-01"}],"2018-05-04":[{"name":"Star Wars Day","country":"US","date":"2018-05-04"}],"2018-05-05":[{"name":"Cinco de Mayo","country":"US","date":"2018-05-05"}],"2018-05-08":[{"name":"Mother's Day","country":"US","date":"2018-05-08"}],"2018-05-30":[{"name":"Memorial Day","country":"US","date":"2018-05-30"}],"2018-06-14":[{"name":"Flag Day","country":"US","date":"2018-06-14"}],"2018-06-19":[{"name":"Father's Day","country":"US","date":"2018-06-19"}],"2018-06-27":[{"name":"Helen Keller Day","country":"US","date":"2018-06-27"}],"2018-07-04":[{"name":"Independence Day","country":"US","date":"2018-07-04"}],"2018-08-26":[{"name":"Women's Equality Day","country":"US","date":"2018-08-26"}],"2018-09-05":[{"name":"Labor Day","country":"US","date":"2018-09-05"}],"2018-09-11":[{"name":"Grandparent's Day","country":"US","date":"2018-09-11"},{"name":"Patriot Day","country":"US","date":"2018-09-11"}],"2018-09-17":[{"name":"Constitution Day","country":"US","date":"2018-09-17"}],"2018-10-06":[{"name":"German-American Day","country":"US","date":"2018-10-06"}],"2018-10-09":[{"name":"Leif Erkson Day","country":"US","date":"2018-10-09"}],"2018-10-10":[{"name":"Columbus Day","country":"US","date":"2018-10-10"}],"2018-10-31":[{"name":"Halloween","country":"US","date":"2018-10-31"}],"2018-11-08":[{"name":"Election Day","country":"US","date":"2018-11-08"},{"name":"Super Tuesday","country":"US","date":"2018-11-08"}],"2018-11-11":[{"name":"Veterans Day","country":"US","date":"2018-11-11"}],"2018-11-24":[{"name":"Thanksgiving Day","country":"US","date":"2018-11-24"}],"2018-11-25":[{"name":"Black Friday","country":"US","date":"2018-11-25"}],"2018-12-07":[{"name":"Pearl Harbor Remembrance Day","country":"US","date":"2018-12-07"}],"2018-12-08":[{"name":"Immaculate Conception of the Virgin Mary","country":"US","date":"2018-12-08"}],"2018-12-24":[{"name":"Christmas Eve","country":"US","date":"2018-12-24"}],"2018-12-25":[{"name":"Christmas","country":"US","date":"2018-12-25"}],"2018-12-26":[{"name":"First Day of Kwanzaa","country":"US","date":"2018-12-26"}],"2018-12-27":[{"name":"Second Day of Kwanzaa","country":"US","date":"2018-12-27"}],"2018-12-28":[{"name":"Third Day of Kwanzaa","country":"US","date":"2018-12-28"}],"2018-12-29":[{"name":"Fourth Day of Kwanzaa","country":"US","date":"2018-12-29"}],"2018-12-30":[{"name":"Fifth Day of Kwanzaa","country":"US","date":"2018-12-30"}],"2018-12-31":[{"name":"New Year's Eve","country":"US","date":"2018-12-31"},{"name":"Sixth Day of Kwanzaa","country":"US","date":"2018-12-31"}]};

    // You would inject any HTML you wanted for
    // that particular date here.
    var numFmt = function(num) {
        num = num.toString();
        if (num.length < 2) {
            num = "0" + num;
        }
        return num;
    };

    var loadContentAsync = true;
    console.info("setDayContent.async", loadContentAsync);
    $scope.setDayContent = function(date) {

        var key = [date.getFullYear(), numFmt(date.getMonth()+1), numFmt(date.getDate())].join("-");
        var data = (holidays[key]||[{ name: ""}])[0].name;
        if (loadContentAsync) {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        return data;

    };


}