const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js")
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let newListItems = []; // Define the newListItems variable initially as an empty array
let workItems=[];
app.get("/", function (req, res) {
  let day = date();
  res.render("list", { listTitle: day, newListItems: newListItems });
});
app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems: workItems,})
})
app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
app.post("/", function (req, res) {
  var item = req.body.newItem; // Use "newItem" as the input field name
  if(req.body.list=="Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    newListItems.push(item); // Add the new item to the newListItems array
    res.redirect("/"); // Redirect to the main page after submitting the form
  }

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
