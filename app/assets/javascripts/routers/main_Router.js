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
    "updateMovie/:id" : "updateMovie",
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
    var username = "darren080589";
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
    // var movieToRemove =  this.movieCollection.get(id);

      
    var reviewCollection = new MovieApp.Collections.ReviewCollection({"id":id});

    reviewCollection.fetch({
      success : function() {
        reviewCollection.each(function(reviewModel) {
          alert(reviewModel.get('comment'));
        });
      }
    });

    //this.movieCollection.remove(this.movieCollection.get(id));

    // $.ajax({
    //  data: {"access_token": ""},
    //     url: 'https://cs3213.herokuapp.com/movies/' + id + '.json',
    //     type: 'DELETE',
    //     success: function(result) {
    //         alert('The movie ' +  modelToRemove.get('title') + ' deleted successfully!');
    //     }
    // });

    //window.router.navigate("myMovies", {trigger: true});
  },

  updateMovie : function(id) {
    var modelToUpdate = this.movieCollection.get(id);

    // this.movieCollection.each(function(movieModel) {
    //   if(movieModel.get('id') == id) {
    //     modelToUpdate = movieModel;        
    //     return;           
    //   }       
    // });

    alert('The movie was editted successfully!');
    window.router.navigate("myMovies", {trigger: true});

  }, 

  userLogout : function(){
    window.router.navigate("logout", {trigger: true});

  },




});
