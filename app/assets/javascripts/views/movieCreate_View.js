MovieApp.Views.MovieCreateView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody',  

  initialize: function(){
 
  },

  events: {
    //create an event "click on Create class" will trigger function "submit_movie_info" 
    "click .Create": "submit_movie_info"
  },

  render: function() {

    $(this.el).html("<h1>Create new movie</h1>");
    $(this.el).append("<div id='movieForm'>");
    $(this.el).append("<form name='newMovieForm' method='post' data-remote='true' enctype='multipart/form-data'>");
    $(this.el).append("Title: <input type='text' id='titleInput'><br>");
    $(this.el).append("Summary: <input type='text' id='summaryInput'><br>");
    $(this.el).append("img: <input type='file' id='imgInput'><br>");
    $(this.el).append("<button class='Create' type='button'>Create</button>");
    $(this.el).append("</form>");
    $(this.el).append("</div>");

    return this;
  },

  submit_movie_info: function(){
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
    
    //myNewMovie.save(obj,  {success: function(){ alert("win"); } });

    //window.router.navigate("create", {trigger: true});
  }
})
