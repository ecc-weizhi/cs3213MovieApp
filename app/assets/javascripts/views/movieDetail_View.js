MovieApp.Views.MovieDetailView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody', 
  movieID: null,
  myReviewCollection: null,

  initialize: function(id){
    //we keep a variable pointing to "this" because "this" can change later
    var current = this;
    
    //Fetch the movie data from http://cs3213.herokuapp.com/movies/(id).json
    //when we initialize this view
    this.myMovie = new MovieApp.Models.MovieModel(id);
    this.myReviewCollection = new MovieApp.Collections.ReviewCollection(id);

    this.myMovie.fetch({
      success: function(){
        current.myReviewCollection.fetch({
          success: function(){
            current.render();
          }
        });
      }
    });
  },

  events: {
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout",
    "click #save": "createReview",
  },

  render: function() {
    //we keep a variable pointing to "this" because "this" can change later
    var current = this;

    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);

    $(this.el).append("<div id='movieDetail'>");
    $(this.el).append("<h1>" + this.myMovie.get("title") + "</h1>");
    $(this.el).append("<img src='" + this.myMovie.get("img_url") + "'>");
    $(this.el).append("<p> Summary:" + this.myMovie.get("summary") + "</p>");
    $(this.el).append("<p> Updated at:" + this.myMovie.get("updated_at") + "</p>");
    $(this.el).append("</div>");

    console.log(this.myMovie);
    this.movieID = this.myMovie.get("id");
    var renderString = "";

    this.myReviewCollection.each(function(myReview) {
      var myReviewView = new MovieApp.Views.ReviewView(myReview);
      renderString += myReviewView.render().$el.html();

    });

    var reviewFormView = new MovieApp.Views.ReviewForm();
    renderString += reviewFormView.render().$el.html();

    $(this.el).append(renderString);
 
    return this;
  },


  back_to_list : function() {
    window.router.navigate("", {trigger: true});
  },

  go_index : function() {
    console.log("a");
    window.router.navigate("", {trigger: true});
  },
  
  go_my_movie : function() {
    window.router.navigate("myMovies", {trigger: true});
  },

  go_logout : function() {
    window.router.navigate("", {trigger: true});
  },

  createReview: function() {           
     
       var score = this.$el.find("#score").val();
       var comment = this.$el.find("#comment").val();
      
      if(!isNaN(score)){ 
              
          if(score>1 && score <100){

            var newReview = new MovieApp.Models.MovieReviewModel({movie_id: this.movieID, url: 'http://cs3213.herokuapp.com/movies/'+this.movieID+ '/reviews.json'});
            newReview.save({score: score, comment: comment, "access_token": gon.token});
      
            this.myReviewCollection.add(newReview);
            window.router.navigate("", {trigger : true}); 
          }
          else { alert ("Score must be between 1-100");}
      }
      else{alert ("Score must be numeric");}

    //,}
                //success: function(model, success){
                //that.collection.add(success);
            //}
     //});
       
  },  
})
