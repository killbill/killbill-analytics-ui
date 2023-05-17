# frozen_string_literal: true

# Dependencies
#
# Sigh. Rails autoloads the gems specified in the Gemfile and nothing else.
# We need to explicitly require all of our dependencies listed in kanaui.gemspec
#
# See also https://github.com/carlhuda/bundler/issues/49
require 'js-routes'
require 'jquery-rails'
require 'jquery-datatables-rails'
require 'font-awesome-rails'
require 'bootstrap-datepicker-rails'
require 'd3_rails'
require 'spinjs-rails'
require 'killbill_client'

module Kanaui
  class Engine < ::Rails::Engine
    isolate_namespace Kanaui
  end
end
