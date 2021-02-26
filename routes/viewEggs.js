
/*
 * GET home page.
 */

// Get JSON data
// var data = require('../data.json');

exports.view = function(req, res){
  res.render("viewEggs", { // will be used to pass information into index.handlebars - Issue is we need to pass the information to viewEggs.html
  	row: [
  	{
	  	"description": "Your very first egg is here!",
	  	"image": "egg1.png",
	  	"id": "egg1" //added egg1
	},
	{
	  	"description": "Your second egg is here!",
	  	"image": "egg2.png",
	  	"id": "egg2" 
	},
	{
	  	"description": "Nice three day streak!",
	  	"image": "egg3.png",
	  	"id": "egg3" 
	},
	{
	  	"description": "You've found a hidden egg!",
	  	"image": "egg4.png",
	  	"id": "egg4" 
	},
	{
	  	"description": "Nice one week streak!",
	  	"image": "egg5.png",
	  	"id": "egg5" 
	},
	{
	  	"description": "Watch out this one's special...",
	  	"image": "egg6.png",
	  	"id": "egg6" 
	}
	]
  });
};

/*exports.home = function(req, res){
  res.render('home');
};
*/
