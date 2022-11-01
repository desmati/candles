onmessage = async function (e) {
    let contents = e.data;
    var lines = contents.split("\n");
    var linesCount = lines.length;
    var data = [];
    for (var i = 0; i < linesCount; i++) {
        var columns = lines[i].split(",");
        var date = new Date(`${columns[0]} ${columns[1]}`).getTime();
        var row = [date, Number(columns[2]), Number(columns[3]), Number(columns[4]), Number(columns[5]), Number(columns[6])];
        data.push(row);
    }

    postMessage(JSON.stringify(data));
}