function getStatisticsPerChannel(dataSource){
            var res = {};
        //for each channel we're gonna calculate how many times it occurs in the videos
            for (var i=0, key, value; i<dataSource.length; i++){
                key = dataSource[i]["channel"];
                value = dataSource[i]["channel"];
                res[value] = (res[value] || 0)+1;
                }
            transformedData = [];
            for (var key in res){
                transformedData .push( {
                    "channel":key,
                    "counter":res[key],
                });
            }
            return transformedData;
        }

function createChartsPerChannel(dataSource){
    transformedData = getStatisticsPerChannel(dataSource);
    $('#chart').dxPieChart({
            palette: "bright",
            dataSource:transformedData,
            series:{
                argumentField:"channel",
                valueField:"counter",
                label: {
                    visible: true,
                    customizeText: function(arg) {
                        return " " + arg.percentText + " ";
                    }
                }
            },
            export: {
                enabled: true,
                fileName:"youtubeStatistics",
                formats:["PDF", "PNG", "JPEG"]
            },
        });

        $("#chart2").dxChart({
            rotated: true,
            dataSource: transformedData,
            series: {
                label: {
                    visible: true,
                    backgroundColor: "#c18e92"
                },
                color: "#79cac4",
                type: "bar",
               argumentField:"channel",
                    valueField:"counter"
            },
            title: "Opened Videos",

            valueAxis: {
                label: {
                    visible: false
                }
            },
            export: {
                enabled: true,
                fileName:"youtubeStatistics",
                formats:["PDF", "PNG", "JPEG"]
            },
            legend: {
                visible: false
            },
         });
}

function createChartsPerDay(dataSource){
        transformedData = getStatisticsPerChannel(dataSource);

        //let's collect videos by date into one dictionary
        vidCollGroupByDate = [];
        for (key in dataSource){
            vidCollGroupByDate[dataSource[key]["date"]]=[]
        }
        for (key in dataSource){
            vidCollGroupByDate[dataSource[key]["date"]].push(dataSource[key]);
        }
        var number=0;

        for (key in vidCollGroupByDate){
           number+=2;
           $('#day-charts').append(`<div class="row">
                                        <h3 class="date">${key}</h3>

                                        <div class="col-lg-6">
                                            <div id="chart-${number}"></div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div id="chart-${number+1}"></div>

                                        </div>
                                    </div>`);
           $(`#chart-${number}`).dxPieChart({
                palette: "bright",
                dataSource:getStatisticsPerChannel(vidCollGroupByDate[key]),
                series:{
                    argumentField:"channel",
                    valueField:"counter",
                    label: {
                        visible: true,
                        customizeText: function(arg) {
                            return " " + arg.percentText + " ";
                        }
                    }
                },
                export: {
                    enabled: true,
                    fileName:`youtubeStatistics-${key}`,
                    formats:["PDF", "PNG", "JPEG"]
                },
            });


           $(`#chart-${number+1}`).dxChart({
            rotated: true,
            dataSource: getStatisticsPerChannel(vidCollGroupByDate[key]),
            series: {
                label: {
                    visible: true,
                    backgroundColor: "#c18e92"
                },
                color: "#79cac4",
                type: "bar",
                argumentField:"channel",
                valueField:"counter"
            },
            title: "    ",
            valueAxis: {
                label: {
                    visible: false
                }
            },
            export: {
                enabled: true,
                fileName:`youtubeStatistics-${key}`,
                formats:["PDF", "PNG", "JPEG"]
            },
            legend: {
                visible: false
            },
         });
        }
};

function createChartsForVidsOverTime(dataSource){

    $('#vids-over-time').append(`<div id="chartVid"></div>`);
    newArr = {};
    for (key in dataSource){
        var date = dataSource[key]["date"];
        newArr[date]=(newArr[date]||0)+1;
    }
    //console.log(newArr);
    var transformedData = [];
    for (key in newArr){
        transformedData.push({
                "date":key,
                "counter":newArr[key],
            });
    }

    var types = ["spline", "line"];

     var chart=$("#chartVid").dxChart({
        palette: ['#e50003'],
        dataSource: transformedData,
        commonSeriesSettings: {
            type: types[0],
            argumentField: "date"
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "counter", name: "Video count" },
        ],
        //display only integers y-axis
        valueAxis: {
            min: 0,
            tickInterval: 0.1,
        },
        tooltip:{
            enabled: true
        },
        "export": {
            enabled: true,
             fileName:`amountOfVids-${transformedData[0]["date"]}-${transformedData[transformedData.length-1]["date"]}`,
             formats:["PDF", "PNG", "JPEG"]
        },
        legend: {
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },

        title: "Amount Of Vids Watched Over Time",

    }).dxChart("instance");

}
