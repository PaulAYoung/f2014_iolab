var $ = require('jquery');
var L = require('leaflet');

L.Icon.Default.imagePath = "http://cdn.leafletjs.com/leaflet-0.7.3/images";


function EarthquakeSpotter(domid, options){
    /*
        Pulls earthquake data from specified source and displays in table. 

        domid - the div where data should be displayed. 
        options - object with following properties:
            data_url: main data source
            backup_url: backup datasource
     */

    this.data_url = options.data_url;
    this.backup_url = options.backup_url;
    this.root = $(domid);
    this.quakes = [];
    this.markers = [];
    this.data_table = this.root.find(".earthquake-table > tbody:last");

    this.map = L.map(this.root.find(".earthquake-maparea").get(0)).setView([0, 0], 0);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);

    //hook up some events
    // refresh button
    this.root.find(".earthquake-refresh-button").click(
            $.proxy(function(){
                this.get_data();
            }, this));

    //clicking on data table
    this.data_table.click($.proxy(this.table_event_handler, this));
}

EarthquakeSpotter.prototype.add_marker = function(feature){
    //create marker
    var lon = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];
    var marker = L.marker([lat, lon]).addTo(this.map);

    //create circle, color and size vary with magnitude
    var color = Math.floor(feature.properties.mag*(25));
    color = "#" + color.toString(16) + "00" +(255-color).toString(16);
    var circle = L.circle([lat, lon], 500*Math.pow(2, feature.properties.mag), {color: color}).addTo(this.map);

    //create and bind popup
         var popup = "Magnitude: " + feature.properties.mag + "<br/>" +
            "Time: " + this.format_date(feature.properties.time) + "<br/>" +
            "Location:" + feature.properties.place;
    marker.bindPopup(popup);

    this.markers.push(marker);
    this.markers.push(circle);
};

EarthquakeSpotter.prototype.table_event_handler = function(e){
    console.log(e);
    console.log(e.originalEvent.originalTarget.parentNode.rowIndex);
    var id = e.originalEvent.originalTarget.parentNode.rowIndex-1;
    this.goto_quake(id);
};

EarthquakeSpotter.prototype.set_message = function(message){
    this.root.find(".earthquake-message").text(message);
};

EarthquakeSpotter.prototype.clear_markers = function(){
    var marker;
    while (this.markers.length > 0){
        marker = this.markers.pop();
        this.map.removeLayer(marker);
    }
};

EarthquakeSpotter.prototype.goto_quake = function(id){
    var feature = this.quakes[id];
    var lon = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];

    this.map.panTo([lat, lon]);
};

EarthquakeSpotter.prototype.add_data_item = function(feature){
    // add marker
    this.add_marker(feature);

    // add table entry
    var row = 
        "<tr>" +
            "<td>" + feature.properties.mag + "</td>" + //time
            "<td>" + feature.properties.place + "</td>" + //long
            "<td>" + this.format_date(feature.properties.time) + "</td>" + //lat
            "<td>" + this.format_date(feature.properties.updated) + "</td>" + //depth
        "</tr>"; //end row element

    //Make it so clicking on element in table moves map. 
    this.data_table.append(row);
};

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
};

EarthquakeSpotter.prototype.get_data =  function(data_url){
    if (typeof(data_url) === 'undefined'){data_url = this.data_url;}
    $.ajax(data_url,
        {
            context: this,
            success: function(d){
                var features = d.features;
                if (d.features.length > 0){
                    this.quakes = d.features;
                    this.set_message("Earthquake data fetched at " + this.format_date(new Date()));
                    // clear table and map
                    this.data_table.children().remove();
                    this.clear_markers();

                    var view_lat, view_lon;
                    var big_mag = 0;

                    // Add new content
                    for (var idx=0; idx< features.length; idx ++){
                        this.add_data_item(features[idx]);

                        //Capture coordinates of largest earthquake
                        if (features[idx].properties.mag > big_mag){
                            big_mag = features[idx].properties.mag;
                            view_lon = features[idx].geometry.coordinates[0];
                            view_lat = features[idx].geometry.coordinates[1];
                        }
                    }

                    this.map.setView([view_lat, view_lon], 9);


                    return;
                } else if (data_url !== this.backup_url){
                    this.set_message("No data for last hour, fetching for last day.")
                    this.get_data(this.backup_url);
                }else{
                    this.set_message("No earthquakes found in last day... good or ominous?")
                    this.data_table.children().remove();
                    this.data_table.append("<tr><ti>No quakes!</ti></tr>")
                }
            },
            error: function(){
                if (data_url !== this.backup_url){
                    this.get_data(this.backup_url);
                }else{
                    this.data_table.children().remove();
                    this.data_table.append("<tr><ti>Error Retrieving data!</ti></tr>")
                }
           }
            }
        );
};

window.EarthquakeSpotter = EarthquakeSpotter;
window.$ = $;
window.L = L;
