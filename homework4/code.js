function EarthquakeSpotter(domid, data_url){
    if (typeof(data_url)==='undefined'){data_url="http://io.milowski.com/usgs/earthquakes/feed/v1.0/summary/all_hour.geojson"}

    this.data_url = data_url;
    this.root = $(domid);
    this.data_table = this.root.find(".earthquake-table > tbody:last");

    this.root.find(".earthquake-refresh-button").click($.proxy(this.get_data, this));
}

EarthquakeSpotter.prototype.add_data_item = function(feature){
    console.log(feature);
    var row = 
        "<tr>" +
            "<td>" + feature.properties.mag + "</td>" + //time
            "<td>" + feature.properties.place + "</td>" + //long
            "<td>" + this.format_date(feature.properties.time) + "</td>" + //lat
            "<td>" + this.format_date(feature.properties.updated) + "</td>" + //depth
        "</tr>"; //end row element
    console.log(row);
    this.data_table.append(row);
}

EarthquakeSpotter.prototype.format_date =  function(date){
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

EarthquakeSpotter.prototype.get_data =  function(){
    data_table = this.data_table;
    $.ajax(this.data_url,
        {
            context: this,
            success: function(d){
                var features = d.features;

                // clear table
                this.data_table.children().remove();

                // Add new content
                for (var idx=0; idx< features.length; idx ++){
                    this.add_data_item(features[idx], data_table);
                }
            }
        }
        );
}
