$(document).ready(function() {

    setupDebugLog();

    var reports = new Reports();
    reports.init();

    // https://github.com/twbs/bootstrap/issues/2097
    $('.dropdown-menu').on('click', function(e){
        if ($(this).hasClass('dropdown-menu-form')){
            e.stopPropagation();
        }
    });

    initializeDatePicker(reports);

    // Populate the dashboard builder drop down with the available reports
    reports.availableReports(function(allReports) {
        $.each(allReports, function(i, report) {


        });
    });

    // Configure the refresh button callback
    $('#refresh-graphs').click(function() {
      $(location).attr('href', reports.buildRefreshURL());
    });

    // Configure the default graphs
    $('#reset-dashboards').click(function() {
        $(location).attr('href', reports.buildRefreshURL({}));
    });
    $('#standard-analytics-dashboards').click(function() {
        $(location).attr('href', reports.buildRefreshURL(reports.ANALYTICS_REPORTS.reports) + '&__preset=ANALYTICS');
    });
    $('#standard-system-dashboards').click(function() {
        $(location).attr('href', reports.buildRefreshURL(reports.SYSTEM_REPORTS.reports) + '&__preset=SYSTEM');
    });
    // Highlight the menu links
    var preset = $.url().param('__preset');
    if (preset == 'ANALYTICS') {
        $('#standard-analytics-dashboards-wrapper').addClass('active');
    } else if (preset == 'SYSTEM') {
        $('#standard-system-dashboards-wrapper').addClass('active');
    }

    // Display the loading indicator
    var spinOptions = {
        top: '150px',
        lines: 10,
        length: 8,
        width: 4,
        radius: 8,
        speed: 1
    }
    $('#loading-spinner').spin(spinOptions);

    // Finally, draw the graphs
    reports.getDataForReports(function(dataForAllReports) {
        // As a hint the AJAX requests are done, accelerate the spinner
        spinOptions['speed'] = 4;
        $('#loading-spinner').spin(spinOptions);

        try {
            if (dataForAllReports.length == 0) {
                displayInfo("Use the menu to select reports");
            } else {
                var reportsGraphs = new ReportsGraphs(reports);
                reportsGraphs.drawAll(dataForAllReports);
            }
        } finally {
            // Hide the loading indicator
            $('#loading-spinner').spin(false);
        }
    });
});

//
// Utils
//

function initializeDatePicker(reports) {

    //
    // We are using http://www.eyecon.ro/bootstrap-datepicker/ but thgere seems to be a fork of it:
    // https://github.com/eternicode/bootstrap-datepicker that seems better.
    //
    $('#start-date').datepicker()
        .on('changeDate', function(ev){
            var newDate = new Date(ev.date.valueOf()).toISOString().split('T')[0]
            reports.startDate = newDate;
            $(this).datepicker('hide');
        }).data('datepicker');

    $('#end-date').datepicker()
        .on('changeDate', function(ev){
            var newDate = new Date(ev.date.valueOf()).toISOString().split('T')[0]
            reports.endDate = newDate;
            $(this).datepicker('hide');
        }).data('datepicker');

    $('#start-date').datepicker('setValue', reports.startDate);
    $('#end-date').datepicker('setValue', reports.endDate);
}

function setupDebugLog() {
    // Setup the debug logs
    var consoleAppender = new log4javascript.BrowserConsoleAppender();
    consoleAppender.setThreshold(log4javascript.Level.INFO);
    var layout = new log4javascript.PatternLayout("%d [%-5p] %m{5}");
    consoleAppender.setLayout(layout);
    window.log = log4javascript.getLogger();
    window.log.addAppender(consoleAppender);
}

function dateFromDatepicker(datepicker) {
    if (datepicker && datepicker.dates.length > 0) {
        var date = datepicker.getDate();
        return moment(date).format('YYYY[-]MM[-]DD');
    }
}

function displayInfo(msg) {
    $('#alert-info').html(msg);
    $('#alert-info').show();
}

function displayError(msg) {
    $('#alert-error').html(msg);
    $('#alert-error').show();
}

// http://stackoverflow.com/questions/646628/javascript-startswith
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}
