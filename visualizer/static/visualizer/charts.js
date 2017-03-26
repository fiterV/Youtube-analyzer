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

function createCharts(dataSource){
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
