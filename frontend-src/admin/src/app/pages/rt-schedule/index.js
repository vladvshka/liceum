import template from './page.template.html';

export default {
    template,
    controller: ('RtScheduleController', controller)
};

controller.$inject = ['moment'];

function controller(moment) {
    let vm = this;

    vm.calendarView = 'month';
    vm.viewDate = Date.now();
}