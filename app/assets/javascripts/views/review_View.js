MovieApp.Views.ReviewView = Backbone.View.extend({
  //This view correspond to the display of single review
  //for a single movie in movie detail view.	
  
  initialize: function(myReview){
    this.model = myReview;
  },

  render: function() {
    $(this.el).html("<div class = 'Review'><p>");
    $(this.el).append("user: " + this.model.get("user")["username"] + "<br>");
    $(this.el).append("comment: " + this.model.get("comment") + "<br>");
    $(this.el).append("score: " + this.model.get("score") + "<br>");
    $(this.el).append("updated at: "+ this.model.get("updated_at"));
    $(this.el).append("</p></div>");
    //$(this.el).html("<div class='MovieSimple'><p>" + this.model.get("title") + '</p><img src="'+ this.model.get("img_url") +'"></div>');
    return this;
  }
})
