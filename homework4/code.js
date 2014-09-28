function add_data_item(feature, data_table){
    console.log(feature);
    var row = 
        "<tr>" +
            "<td>" + feature.properties.mag + "</td>" + //time
            "<td>" + feature.properties.place + "</td>" + //long
            "<td>" + new Date(feature.properties.time) + "</td>" + //lat
            "<td>" + new Date(feature.properties.updated) + "</td>" + //depth
        "</tr>"; //end row element
    console.log(row);
    data_table.append(row);
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
