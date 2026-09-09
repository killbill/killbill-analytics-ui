# frozen_string_literal: true

source 'https://rubygems.org'

# Declare your gem's dependencies in kanaui.gemspec.
# Bundler will treat runtime dependencies like base dependencies, and
# development dependencies will be added by default to the :development group.
gemspec

# Declare any dependencies that are still in development here instead of in
# your gemspec. These might include edge Rails or gems from your path or
# Git. Remember to move these dependencies to your gemspec before releasing
# your gem to rubygems.org.

# Lock i18n to 1.14.x for: https://github.com/ruby-i18n/i18n/issues/735
gem 'i18n', '~> 1.14.0'

# Lock minitest to 5.x until Rails 7.1+ adds Minitest 6.0 support
# Minitest 6.0.0 was released Dec 2024 with breaking API changes
gem 'minitest', '~> 5.0'

# json 3.0 dropped the quirks_mode keyword that ActiveSupport::JSON.encode
# still passes to JSON.generate, raising ArgumentError (breaks any code path
# that calls #to_json, e.g. killbill-client's model classes). Was incidentally
# protected by rubocop's own `json ~> 2.3` dependency, but rubocop 1.90.0
# loosened that to `json >= 2.3` (no upper bound), so an unpinned
# `gem 'json'` here can float to 3.x on any fresh bundle install.
gem 'json', '~> 2.21'

group :development do
  gem 'gem-release'
  gem 'killbill-client'
  gem 'listen'
  gem 'puma'
  gem 'rake'
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'rubocop-thread_safety'
  gem 'simplecov'
  gem 'sprockets-rails'
end

# gem 'killbill-assets-ui', github: 'killbill/killbill-assets-ui', ref: 'main'
# gem 'killbill-assets-ui', path: '../killbill-assets-ui'
gem 'killbill-assets-ui'
