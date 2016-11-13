$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'kanaui/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'kanaui'
  s.version     = Kanaui::VERSION
  s.authors     = 'Kill Bill core team'
  s.email       = 'killbilling-users@googlegroups.com'
  s.homepage    = 'http://www.killbill.io'
  s.summary     = 'Kill Bill Analytics UI mountable engine'
  s.description = 'Rails UI plugin for the Analytics plugin.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*'] + %w(MIT-LICENSE Rakefile README.md)
  s.test_files = Dir['test/**/*']

  s.add_dependency 'rails', '~> 4.2.1'
  s.add_dependency 'js-routes', '~> 1.1'
  s.add_dependency 'jquery-rails', '~> 3.0.4'
  s.add_dependency 'jquery-datatables-rails', '~> 3.3.0'
  s.add_dependency 'money-rails', '~> 1.3.0'
  s.add_dependency 'd3_rails', '~> 3.2.8'
  s.add_dependency 'twitter-bootstrap-rails', '~> 3.2.0'
  s.add_dependency 'spinjs-rails', '~> 1.4'
  s.add_dependency 'bootstrap-datepicker-rails', '~> 1.4.0'
  s.add_dependency 'momentjs-rails', '~> 2.10.6'
  s.add_dependency 'killbill-client', '~> 1.0'
  s.add_dependency 'devise', '~> 3.4.1'
  s.add_dependency 'cancan', '~> 1.6.10'
  s.add_dependency 'carmen-rails', '~> 1.0.0'
  s.add_dependency 'symmetric-encryption', '~> 3.6.0'

  s.add_development_dependency 'fakeweb', '~> 1.3'
  s.add_development_dependency 'rake', '>= 0.8.7'
  s.add_development_dependency 'simplecov'

  if defined?(JRUBY_VERSION)
    s.add_development_dependency 'activerecord-jdbc-adapter', '~> 1.3.9'
    s.add_development_dependency 'activerecord-jdbcmysql-adapter', '~> 1.3.9'
    s.add_development_dependency 'activerecord-jdbcsqlite3-adapter', '~> 1.3.9'
    s.add_development_dependency 'jdbc-mysql', '~> 5.1.25'
  else
    s.add_development_dependency 'sqlite3'
    s.add_development_dependency 'mysql2'
  end
end
