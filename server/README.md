# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions


* ...



`rake db:create`

If rake generate takes long, generated stubs are the problem

`rm -rf bin/ && rake app:update:bin`


add bcrypt gem to gemfile and bundle install

`rails generate model user moniker:string  password:digest`
`rake db:migrate`

