$(document).ready(function() {
    var todo_list = $("#todo-list");

    var geo_loc = false;
    function get_loc(){
        navigator.geolocation.getCurrentPosition(function(pos){
            $("#todo-form-text").after(
                '<br/><label>Include Location:</label><input name="include-loc" id="include-loc" type="checkbox" checked="checked"/>'
            );
            geo_loc = pos;
        });
    }

    get_loc()


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
        console.log($("#include-loc"));

        if ($("#include-loc").is(":checked") === true){

            loc = "<a href='http://maps.google.com/?q=" +
                geo_loc.coords.latitude + "," +
                geo_loc.coords.longitude +
                "' target='_blank'>View Location</a>"
        } else {
            loc = "No location given.";
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
