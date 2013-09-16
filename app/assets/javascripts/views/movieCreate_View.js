MovieApp.Views.MovieCreateView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody',  

  initialize: function(){ 
  },

  events: {
    //create an event "click on Create class" will trigger function "submit_movie_info" 
    "click .Create": "submit_movie_info",
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout"
  },

  render: function() {
    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);

    $(this.el).append("<h1>Create new movie</h1>");
    //$(this.el).append("<div id='movieForm'>");
    $(this.el).append("<form name='newMovieForm' method='post' data-remote='true' enctype='multipart/form-data'>");
    $(this.el).append("Title: <input type='text' id='titleInput'><br>");
    $(this.el).append("Summary: <input type='text' id='summaryInput'><br>");
    $(this.el).append("img: <input type='file' id='imgInput'><br>");
    $(this.el).append("<button class='Create' type='button'>Create</button>");
    //$(this.el).append("</form>");
    $(this.el).append("</div>");

    return this;
  },

  submit_movie_info: function(){
  	alert("btn clicked");
  	var file = document.getElementById('imgInput').files[0];
  	console.log(file);
  	
  	var reader = new FileReader();
   
    reader.onload = (function (){
    	alert("done");
    	console.log(reader.result);
    	var obj = {};
			obj["title"] = document.getElementById("titleInput").value;
			obj["summary"] = document.getElementById("summaryInput").value;
			obj["img"] = reader.result;
			
			console.log(obj);
			var myNewMovie = new MovieApp.Models.newMovieModel();
    
    	myNewMovie.set(obj);
    	console.log("here?");
    	console.log(myNewMovie);
    	
    	myNewMovie.save({success: function(){ alert("win"); } });
			
    });
    
    
    
    /*(function(reader) {
        return function(e) {
            alert("done");
            var obj = {};
    				obj["title"] = document.getElementById("titleInput").value;
    				obj["summary"] = document.getElementById("summaryInput").value;
    				obj["img"] = ;
        };
    })(reader);*/
    reader.readAsDataURL(file);
    
    
  	/*
  	var formData = new FormData();
  	formData.append('file', file);
  	
  	console.log(formData);
  	*/
  	/*
    var reader = new FileReader();
  	
    var obj = {};
    obj["title"] = document.getElementById("titleInput").value;
    obj["summary"] = document.getElementById("summaryInput").value;
    obj["img"] = document.getElementById("imgInput");
    
    var NewMovie = Backbone.Model.extend({
      url: "http://cs3213.herokuapp.com/movies.json"
    });
    var myNewMovie = new NewMovie;
    
    myNewMovie.set(obj);
    console.log(myNewMovie);
    */
    //myNewMovie.save(obj,  {success: function(){ alert("win"); } });

    //window.router.navigate("create", {trigger: true});
  },

  create_new_movie : function() {
    window.router.navigate("create", {trigger: true});
  },

  go_index : function() {
    window.router.navigate("", {trigger: true});
  },
  
  go_my_movie : function() {
    window.router.navigate("myMovies", {trigger: true});
  },

  go_logout : function() {
    window.router.navigate("", {trigger: true});
  }
})
