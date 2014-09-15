$(document).ready(function() {
    var todo_list = $("#todo-list");

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

        // Create dom element for item
        var item_dom = $(
            '<li class="todo-item">' + 
                item +
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
