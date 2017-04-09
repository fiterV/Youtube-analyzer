/**
 * Created by fiter on 4/9/17.
 */
function addDatePicker(selector, dataSource){
    $(selector).daterangepicker(
            {
                locale: {
                  format: 'DD-MM-YYYY'
                },
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens:"left",
            },
            function(start, end, label) {
                var stDate = new Date(start);
                var edDate = new Date(end);
                newArr = [];
                for (key in dataSource){
                    var dateString = dataSource[key]["date"];
                    var currDate = new Date(dateString.substring(6), parseInt(dateString.substring(3, 5))-1, dateString.substring(0, 2));
                    if (currDate.getTime()>=stDate.getTime() &&currDate.getTime()<=edDate.getTime()){
                        newArr.push(dataSource[key]);
                    }
                }
                $('#day-charts').empty();

                createChartsPerDay(newArr);
    });
}