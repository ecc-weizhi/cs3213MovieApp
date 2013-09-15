MovieApp.Routers.MainRouter = Backbone.Router.extend({
  //This file will list which methods to perform base on the url.
  movieCollection: null,
  
  routes: {
    "":                 "index",    // #help
    "movie/:id":        "movie",  // #search/kiwis
    "create":	"createMovie",
    "myMovies" : "getUserMovies",
    "deleteMovie/:id" : "deleteMovie",
    "editMovie/:id" : "editMovie",
    "updateMovie/:id/:title/:summary" : "updateMovie",
    "logout": "userLogout",

  },

  index: function() {
    //create a view to display all movie.
    var myIndexView = new MovieApp.Views.IndexView();   
  },

  movie: function(id) {
    var movieView = new MovieApp.Views.MovieDetailView({"id":id});
  },
  
  createMovie: function(){
    var myMovieCreateView = new MovieApp.Views.MovieCreateView();
    myMovieCreateView.render();
  },

  getUserMovies : function() {
    var username = this.getUserName(gon.user_email);
    var userMovies = new Backbone.Collection;
    var current =  this;

    this.movieCollection = new MovieApp.Collections.MovieCollection();
    this.movieCollection.fetch({
      success: function() {
        current.movieCollection.each(function(userMovie) {
          var userMovieModel = new Backbone.Model(userMovie.get('user'));

          if(userMovieModel.get("username") == username)
            userMovies.push(userMovie);
        });

        current.loadUserMovies(userMovies);
      }
    }); 
  },

  loadUserMovies : function(userMovies) {
    var userMoviesView = new MovieApp.Views.UserMoviesView(userMovies);
    //console.log(userMovies);
  },

  editMovie : function(id) {
    var editMovieView = new MovieApp.Views.EditMovieView({"id":id});
  },

  deleteMovie : function(id) { 
    var movieToRemove =  this.movieCollection.get(id);
    
    //Deleting Movie from server using AJAX
    $.ajax({
        data: {"access_token": gon.token },
        url: 'https://cs3213.herokuapp.com/movies/' + id + '.json',
        type: 'DELETE',
        success: function(result) {            
            window.router.navigate("myMovies", {trigger: true});
        }
    });

    //Removing Movie from Model
    this.movieCollection.remove(this.movieCollection.get(id));
    
  },

  updateMovie : function(id,title,summary) {
    alert(title + summary);
   $.ajax({
        data: {"access_token": gon.token, "title": title, "summary": summary },
        url: 'https://cs3213.herokuapp.com/movies/' + id + '.json',
        type: 'PUT',
        success: function(result) {
            alert('The movie ' +  title + ' was updated successfully!');
           

            var updatedModel = new MovieApp.Models.MovieModel({"id":id});

            updatedModel.fetch({
              success : function() {
                alert(updatedModel.get('title'));
                //window.router.navigate("myMovies", {trigger: true});
              }
            });   
        }
    });  

   

  }, 

  userLogout : function(){
    window.router.navigate("logout", {trigger: true});

  },

  getUserName : function(userEmail) {
    var username = "";

    for(var i=0; i<userEmail.length; i++) {
        if(userEmail[i] == "@")
          return username;
        else 
          username += userEmail[i];        
    }

    return "";
  }



});
