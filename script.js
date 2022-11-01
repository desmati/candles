
var worker;

const fileInput = document.getElementById('csv')

function readSingleFile(evt) {
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            if (worker) {
                worker.terminate();
            }

            if (typeof (worker) == "undefined") {
                worker = new Worker("./parse.js");
            }

            worker.onmessage = function (e) {
                var data = JSON.parse(e.data);

                drawChart(data);
            };

            worker.postMessage(contents);

        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}


fileInput.onchange = readSingleFile;

// Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {
//     console.log(data.slice(0, 10));
//     Highcharts.stockChart('container', {
//         rangeSelector: {
//             selected: 1
//         },
//         navigator: {
//             series: {
//                 color: Highcharts.getOptions().colors[0]
//             }
//         },
//         series: [{
//             type: 'hollowcandlestick',
//             name: 'Hollow Candlestick',
//             data: data
//         }]
//     });
// });


function drawChart(data) {
    var lastN = document.getElementById('lastN').value;
    data = data.slice(-lastN);
    Highcharts.stockChart('container', {
        // rangeSelector: {
        //     selected: 1
        // },
        navigator: {
            series: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        series: [{
            type: 'hollowcandlestick',
            name: 'Hollow Candlestick',
            data: data
        }]
    });



}