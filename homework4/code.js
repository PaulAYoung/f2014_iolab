
function clear_table(){
    data_table("tr").remove();
}

function add_data_item(feature){
    console.log(feature);
    var data_table = $("#earthquake-table tr:last");
    var row = 
        "<tr>" +
            "<ti>" + feature.properties.time + "</ti>" + //time
            "<ti>" + feature.properties.time + "</ti>" + //long
            "<ti>" + feature.properties.time + "</ti>" + //lat
            "<ti>" + feature.properties.time + "</ti>" + //depth
        "</tr>"; //end row element
    console.log(row);
    data_table.append(row);

}

function get_data(){
    $.ajax("http://io.milowski.com/usgs/earthquakes/feed/v1.0/summary/all_hour.geojson",
        {
            success: function(d){
                var features = d.features;

                for (var idx=0; idx< features.length; idx ++){
                    add_data_item(features[idx]);
                }
            }
        }
        );
}
