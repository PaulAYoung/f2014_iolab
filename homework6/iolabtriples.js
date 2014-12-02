var homeworks = document.getElementsByType("http://milowski.com/syllabus/Homework");

for (var idx=0; idx<homeworks.length; idx++) {
  var title = document.data.getValues(homeworks[idx].data.id, "http://milowski.com/syllabus/title");
  var due = document.data.getValues(homeworks[idx].data.id, "http://milowski.com/syllabus/due");
  var uri = homeworks[idx].data.id;
  
  console.log("Assignment: " + title);
  console.log("Due: " + due);
  console.log("Site: " + uri);
}

var presentations = document.getElementsByType("http://milowski.com/syllabus/Presentation");

for (var idx=0; idx<presentations.length; idx++) {
  var title = document.data.getValues(presentations[idx].data.id, "http://milowski.com/syllabus/title");
  var due = document.data.getValues(presentations[idx].data.id, "http://milowski.com/syllabus/due");
  
  console.log("Assignment: " + title);
  console.log("Due: " + due);
}
