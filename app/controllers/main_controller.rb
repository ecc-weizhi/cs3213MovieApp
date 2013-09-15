require 'oauth2'

class MainController < ApplicationController
	before_filter :client

  def index    
    gon.token = session[:token]
  end 

  def client
	@client_id="916cd457a950ad31e45c5ec580afaddd"
	@client_secret="9758ace1fa43dd9fbcd4bcb97cdec02f"
	@client_obj = OAuth2::Client.new(
		@client_id, 
		@client_secret, 
		:site => 'http://cs3213.herokuapp.com', 
		:authorize_url => '/oauth/new')

    @redirect_url = "http://localhost:3000/redirect"
    #@redirect_url = "http://super-movie-app.herokuapp.com//redirect"
  end

  def redirect
  	@token = @client_obj.auth_code.get_token(params[:code], :redirect_uri => @redirect_url)
    session[:token] = @token.token
    #render :text =>session[:token]   
    redirect_to root_url
  end

  def logout
  	reset_session
  	login
  end

  def login
  	redirect_to @client_obj.auth_code.authorize_url(:redirect_uri => @redirect_url)
  end

end
