# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('lib', __dir__)

# Maintain your gem's version:
require 'kanaui/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'kanaui'
  s.version     = Kanaui::VERSION
  s.author      = 'Kill Bill core team'
  s.email       = 'killbilling-users@googlegroups.com'
  s.homepage    = 'https://killbill.io'
  s.summary     = 'Kill Bill Analytics UI mountable engine'
  s.description = 'Rails UI plugin for the Analytics plugin.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*'] + %w[MIT-LICENSE Rakefile README.md]

  s.metadata['rubygems_mfa_required'] = 'true'

  s.add_dependency 'bootstrap-datepicker-rails', '~> 1.6'
  s.add_dependency 'd3_rails', '>= 3.2.8', '< 4.2.0'
  s.add_dependency 'font-awesome-rails'
  s.add_dependency 'jquery-datatables-rails', '~> 3.3'
  s.add_dependency 'jquery-rails', '~> 4.5.1'
  s.add_dependency 'js-routes', '>= 1.1', '< 3.0'
  s.add_dependency 'killbill-client'
  s.add_dependency 'rails', '~> 7.0'
  s.add_dependency 'sass-rails'
  s.add_dependency 'spinjs-rails'
end
