# frozen_string_literal: true

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
        render json: { status: true, user: user }
        return
      end

      render json: { status: false, message: 'Could not create an account for the user' }
    end

    unless user.authenticate(user_params[:password])
      render json: { status: false, message: 'Invalid password provided' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:moniker, :password)
  end
end
