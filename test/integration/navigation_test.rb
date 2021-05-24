# frozen_string_literal: true

require 'test_helper'

class NavigationTest < ActionDispatch::IntegrationTest
  include Kanaui::Engine.routes.url_helpers

  test 'can see the dashboard page' do
    get '/kanaui'
    assert_response :redirect
  end
end
