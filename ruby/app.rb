# app.rb
require 'sinatra'
require 'stripe'
require 'dotenv/load'
require_relative 'fake_to_stripe'
require 'sinatra/cors'

set :allow_origin, "http://localhost:3000"
set :allow_methods, "GET,HEAD,POST"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"

Stripe.api_key = ENV['STRIPE_SECRET']

# Middleware
use Rack::Static, :urls => ["/public"], :root => "public"

# CORS Headers
before do
  headers 'Access-Control-Allow-Origin' => '*',
          'Access-Control-Allow-Methods' => ['GET', 'POST'],
          'Access-Control-Allow-Headers' => ['Content-Type']
end

# Static files
set :public_folder, 'public'

# API Route
get '/api' do
  content_type :json
  { message: "Hello from server!" }.to_json
end

# Checkout Route
post '/checkout' do
  request.body.rewind
  body = request.body.read
  data = JSON.parse(body)
  items = data["items"]

  line_items = items.map do |item|
    {
      price: FAKE_TO_STRIPE[item["id"]],
      quantity: item["quantity"]
    }
  end

  session = Stripe::Checkout::Session.create(
    line_items: line_items,
    mode: 'payment',
    # success_url: "https://newyorkcollection.shop/success",
    # cancel_url: "https://newyorkcollection.shop/cancel"
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  )

  content_type :json
  { url: session.url }.to_json
end

# Catch-all for client-side routing
get '/*' do
  send_file File.join(settings.public_folder, 'index.html')
end
