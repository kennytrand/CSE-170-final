
/*
 * GET home page.
 */

// Get JSON data
// var data = require('../data.json');

exports.view = function(req, res){
  res.render("index", { // will be used to pass information into index.handlebars - Issue is we need to pass the information to viewEggs.html
  	"description": "Your very first egg is here WE GOT IT TO WORK HAPP HAPP!",
  	"image": "egg1.png",
  	"id": "egg1" //added egg1
  });
};

/*exports.home = function(req, res){
  res.render('home');
};
*/
