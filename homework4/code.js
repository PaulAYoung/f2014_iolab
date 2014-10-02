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
    this.data_table = this.root.find(".earthquake-table > tbody:last");

    this.root.find(".earthquake-refresh-button").click(
            $.proxy(function(){
                this.get_data();
            }, this));
}

EarthquakeSpotter.prototype.set_message = function(message){
    this.root.find(".earthquake-message").text(message);
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

EarthquakeSpotter.prototype.get_data =  function(data_url){
    if (typeof(data_url) === 'undefined'){data_url = this.data_url;}
    $.ajax(data_url,
        {
            context: this,
            success: function(d){
                var features = d.features;
                if (d.features.length > 0){
                    this.set_message("Earthquake data fetched at " + this.format_date(new Date()));
                    // clear table
                    this.data_table.children().remove();

                    // Add new content
                    for (var idx=0; idx< features.length; idx ++){
                        this.add_data_item(features[idx]);
                    }

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
}
