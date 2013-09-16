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

    if(this.model.get("user")["username"] == this.getUserName(gon.user_email))
      $(this.el).append("<br /><button class='btn btn-primary' id='del'>Delete</button>");
    
    $(this.el).append("</p></div>");
    //$(this.el).html("<div class='MovieSimple'><p>" + this.model.get("title") + '</p><img src="'+ this.model.get("img_url") +'"></div>');
    return this;
  },

  events : {
          "click #del": "deleteReview",    
  },

  deleteReview: function () {
    $.ajax({
         type: "DELETE",
         data: {"access_token": gon.token },
         url: "http://cs3213.herokuapp.com" + "/movies/" + this.model.get("movie_id") + "/reviews/" + this.model.id + ".json",
         success: function(success) {
            $(this.el).remove();
            alert("Delete movie success!!");
         }
    });   
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
})
