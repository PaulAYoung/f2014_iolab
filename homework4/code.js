function add_data_item(feature, data_table){
    console.log(feature);
    var row = 
        "<tr>" +
            "<td>" + feature.properties.mag + "</td>" + //time
            "<td>" + feature.properties.place + "</td>" + //long
            "<td>" + format_date(feature.properties.time) + "</td>" + //lat
            "<td>" + format_date(feature.properties.updated) + "</td>" + //depth
        "</tr>"; //end row element
    console.log(row);
    data_table.append(row);
}

function format_date(date){
    //Take a date and return string in "mm/dd/yyyy hh:mm" format
    date = new Date(date);
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var d = date.getDate();
    var t = date.getHours() + ":";
    if (date.getMinutes() > 9){
        t = t + date.getMinutes();
    } else {
        t = t + "0" +  date.getMinutes();
    }
    return m + "/" + d + "/" + y + " " + t;
}

function get_data(table_id){
    $.ajax("http://io.milowski.com/usgs/earthquakes/feed/v1.0/summary/all_hour.geojson",
        {
            success: function(d){
                var features = d.features;
                var data_table = $(table_id);

                // clear table
                data_table.children().remove();

                // Add new content
                for (var idx=0; idx< features.length; idx ++){
                    add_data_item(features[idx], data_table);
                }
            }
        }
        );
}
