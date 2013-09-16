MovieApp.Views.MovieCreateView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody',  

  initialize: function(){ 
  },

  events: {
    //create an event "click on Create class" will trigger function "submit_movie_info" 
    "click #Create": "submit_movie_info",
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout"
  },

  render: function() {
    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);

    $(this.el).append("<h1>Create new movie</h1>");
    $(this.el).append("<div id='movieForm'><form name='movie' method='POST'>Title: <input type='text' name='movie[title]' id='movie_title'><br>Summary: <input type='text' name='movie[summary]' id='summary'><br>img: <input type='file' name='movie[img]' id='movie_img'><br><button class='btn btn-primary' id='Create' type='button'>Create</button></form></div>");

    return this;
  },

  submit_movie_info: function(e){
  	$(e.target).parent().ajaxSubmit({
      url:  "http://cs3213.herokuapp.com/movies.json",
      dataType: 'json',
      data: {"access_token": gon.token},
      method: "POST",
      error: function(error, err) {
	      alert("Please log in."); 
      },
      success: function(msg) {
   	    window.router.navigate("movie/" + msg.id, {trigger: true});
      },
      beforeSubmit: function(arr, $form, options) { 
       	if($("#movie_title").val() == "") {
          alert("Please enter movie title");
          return false;
        } 
        else if($("#movie_img").val() == "")
        {
       	 	alert("Please choose image.");
          return false;
        }
        else 
        {
          return true;
        }
  		}
    });
    return false;
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
