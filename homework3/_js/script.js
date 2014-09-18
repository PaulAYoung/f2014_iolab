$(document).ready(function() {
    var todo_list = $("#todo-list");

    function get_loc(){
        navigator.geolocation.getCurrentPosition(function(pos){
            return pos;
        },
        function(){return false;}
        );
    }

    var geo_loc = false;
    geo_loc = get_loc();
    console.log(geo_loc);

    function enable_remove(){
        $(".todo-list-remove").click(function(e){
            var item = e.target.parentElement;
            $(item).slideToggle(function(){ 
                item.parentElement.removeChild(item);
            });
        });
    }

    enable_remove();

    // Have form add to todolist.
    $("#todo-form").submit(function(e){
        e.preventDefault();
        var item = e.target[0].value;
        var remove_button = '<button class="todo-list-remove">Remove</button>';

        if (e.target[1].checked === true && geo_loc !== false){

            loc = "<a href='maps.google.com/?q=" +
                geo_loc.coords.latitude + "," +
                geo_loc.coords.longitute +
                "'>View Location</a>"
        } else {
            loc = "loc not given";
        }


        // Create dom element for item
        var item_dom = $(
            '<li class="todo-item">' + 
                item +
                "<br/>" +
                loc + 
                "<br/>" +
                remove_button + 
            "</li>");


        // some simple animation
        item_dom.hide();
        todo_list.prepend(item_dom);
        item_dom.slideDown();

        // Make sure the remove button is hooked up
        enable_remove();

        // Reset form
        e.currentTarget.reset();
    });
})
