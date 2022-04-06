# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('lib', __dir__)

# Maintain your gem's version:
require 'kanaui/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'kanaui'
  s.version     = Kanaui::VERSION
  s.authors     = 'Kill Bill core team'
  s.email       = 'killbilling-users@googlegroups.com'
  s.homepage    = 'https://killbill.io'
  s.summary     = 'Kill Bill Analytics UI mountable engine'
  s.description = 'Rails UI plugin for the Analytics plugin.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*'] + %w[MIT-LICENSE Rakefile README.md]
  s.test_files = Dir['test/**/*']

  s.add_dependency 'd3_rails', '~> 3.2.8'
  s.add_dependency 'jquery-datatables-rails', '~> 3.3'
  s.add_dependency 'jquery-rails', '~> 4.3'
  s.add_dependency 'js-routes', '>= 1.1', '< 3.0'
  s.add_dependency 'rails', '~> 5.1'
  # See https://github.com/seyhunak/twitter-bootstrap-rails/issues/897
  s.add_dependency 'bootstrap-datepicker-rails', '~> 1.6'
  s.add_dependency 'font-awesome-rails', '~> 4.7'
  s.add_dependency 'killbill-client', '~> 3.2'
  s.add_dependency 'sass-rails', '~> 5.0'
  s.add_dependency 'spinjs-rails', '~> 1.4'
  s.add_dependency 'twitter-bootstrap-rails'

  s.add_development_dependency 'gem-release', '~> 2.2'
  s.add_development_dependency 'json', '>= 1.8.6'
  s.add_development_dependency 'listen'
  s.add_development_dependency 'rake'
  s.add_development_dependency 'rubocop', '~> 0.88.0' if RUBY_VERSION >= '2.4'
  s.add_development_dependency 'simplecov'
end
