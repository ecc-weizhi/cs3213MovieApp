MovieApp.Routers.MainRouter = Backbone.Router.extend({
  //This file will list which methods to perform base on the url.
  pageCount: 1,
  tempCollection: Backbone.Collection,

  routes: {
    "":                 "index",    // #help
    "movie/:id":        "movie",  // #search/kiwis
    "create":	"createMovie",
    "myMovies/:type" : "getUserMovies",
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

  getUserMovies : function(type) {
    var username = this.getUserName(gon.user_email);
    var current =  this;       

    if(type == "new") {
      current.tempCollection = new Backbone.Collection;
      current.pageCount = 1;
    }         

    var movieCollection = new MovieApp.Collections.MovieCollection(this.pageCount);
    movieCollection.fetch({
      success : function() {
        if(movieCollection.length != 0) {
          movieCollection.each(function(aMovie) {
            var movieModel = new Backbone.Model(aMovie.get("user"));
            if(movieModel.get("username") == username) 
              current.tempCollection.push(aMovie);
          });

          current.pageCount += 1;
          window.router.navigate("myMovies/" + current.pageCount, {trigger : true});

        } else {          
            var userMoviesView = new MovieApp.Views.UserMoviesView(current.tempCollection);
        }
      }
    });
  },

  editMovie : function(id) {
    var editMovieView = new MovieApp.Views.EditMovieView({"id":id});
  },

  deleteMovie : function(id) { 
    //Delete all reviews from the movie in the server
    this.deleteMovieReviews(id);
    
    //Deleting Movie from server using AJAX
    $.ajax({
        data: {"access_token": gon.token },
        url: 'https://cs3213.herokuapp.com/movies/' + id + '.json',
        type: 'DELETE',
        success: function(result) {            
            window.router.navigate("myMovies/new", {trigger: true});
        }
    });
    
  },

  deleteMovieReviews : function(movieID) {
    //Fetches all reviews tagged to the movie of the given movie id and proceed to delete them
    var reviewCollection = new MovieApp.Collections.ReviewCollection({"id": movieID});
    var current = this;

    reviewCollection.fetch({
      success : function() {
        reviewCollection.each(function(movieReview) {
          if(movieReview.get("user")["username"] == current.getUserName(gon.user_email)) {
              $.ajax({
                data: {"access_token": gon.token },
                url: 'https://cs3213.herokuapp.com/movies/' + movieID + '/reviews/' + movieReview.get('id') + '.json',
                type: 'DELETE',
                success: function(result) {}
            });
          }          
        });
      }
    });
  },

  updateMovie : function(id,title,summary) {
    alert(title + summary);
   $.ajax({
        data: {"access_token": gon.token, "title": title, "summary": summary, "img_url": "sdasdasda"},
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