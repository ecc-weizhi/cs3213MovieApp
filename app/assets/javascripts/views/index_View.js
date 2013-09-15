MovieApp.Views.IndexView = Backbone.View.extend({
  //This view correspond to the tiled display of all movie	
  el: '#pageBody',
  //template: JST['indexTemplate'](),

  initialize: function(){
    //Fetch the data from http://cs3213.herokuapp.com/movies.json 
    //when we initialize this view
    this.collection = new MovieApp.Collections.MovieCollection();
    this.collection.fetch({reset: true});
    this.collection.bind('reset', this.render, this);    
  },

  events: {
    //create an event "click on CreateMovie class" will trigger function "create_new_movie" 
    "click .CreateMovie": "create_new_movie",
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout"
  },

 render2 : function() {
    console.log(this.collection);
    var current = this;
    
    //This is the render function for this view. We will craft the view here.
    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);
      
    $(this.el).append("<h1>Below is the tiled display</h1>");
    $(this.el).append("<div id='buttonArea'><button class='CreateMovie' type='button'>Create new movie</button><div>");

    this.collection.each(function(myMovie) {
      var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);
      $(current.el).append(myMovieSimpleView.render().el);
    });


    return this;
  },


    render : function() {
    var current = this;
    var myNavBarView = new MovieApp.Views.NavBarView();
    var movieRenderString = "<table cellpadding='20'>";
    var count = 0;

    this.collection.each(function(myMovie) {
     var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);

      if(count == 0)
        movieRenderString += "<tr height=400>";
      
      if(count < 4) {
        movieRenderString += "<td width=25%>" + myMovieSimpleView.render().$el.html() + "</td>";
        count++;  
      }       

      if(count == 4) {
        count = 0;
        movieRenderString += "</tr>";
      } 
      
    });

    movieRenderString += "</table>";
    movieRenderString += "<label id='hiddenVal' style='visibility: hidden;'></label>";


    var myNavBarView = new MovieApp.Views.NavBarView();
      $(current.el).html(myNavBarView.render().el);
      
    $(current.el).append(movieRenderString);


    return this;
  },  


    render3 : function() {
    var current = this;
    var myNavBarView = new MovieApp.Views.NavBarView();

    $(this.el).html(myNavBarView.render().el);

    $(current.el).append("<table cellpadding=20>");
    var count = 0;

    this.collection.each(function(myMovie) {
     var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);

      if(count == 0)
        $(current.el).append("<tr height=400>");
      
      if(count < 4) {
        $(current.el).append("<td width='25%'>55");
        $(current.el).append(myMovieSimpleView.render().el);
        $(current.el).append("</td>");
        count++;  
      }       

      if(count == 4) {
        count = 0;
        $(current.el).append("</tr>");
      } 
      
    });

   $(current.el).append("</table>");
  $(current.el).append("<label id='hiddenVal' style='visibility: hidden;'></label>");

      
  //  $(current.el).append(movieRenderString);


    return this;
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
    window.location="logout.html";
  }
})
