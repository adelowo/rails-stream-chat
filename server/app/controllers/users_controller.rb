# frozen_string_literal: true

require 'stream-chat'

class UsersController < ApplicationController
  def create
    # Find user by moniker
    # If it exists, verify password
    # Else create a new user
    # Connect to stream chat
    # Create a token

    user = User.find_by(moniker: user_params[:moniker])

    if user.nil?
      user = User.create(user_params)
      if user.valid?
        user.save
        render json: { status: true, user: user, token: chat_token(user.moniker) }
        return
      end

      render json: { status: false, message: 'Could not create an account for the user' }
    end

    unless user.authenticate(user_params[:password])
      render json: { status: false, message: 'Invalid password provided' }
    end

    render json: { status: true, user: user, token: chat_token(user.moniker) }
  end

  private

  def chat_token(username)
    client = StreamChat::Client.new(api_key = Rails.configuration.stream_api_key, api_secret = Rails.configuration.stream_api_secret)
    token = client.create_token(username)
    client.update_user({ id: username, name: username })

    chan = client.channel('messaging', channel_id: 'bob-and-jane')
    chan.create('admin')
    chan.add_members(['admin', username])
    token
  rescue StandardError => e
    p e
  end

  def user_params
    params.require(:user).permit(:moniker, :password)
  end
end
