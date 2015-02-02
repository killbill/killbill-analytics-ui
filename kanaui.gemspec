$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "kanaui/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "kanaui"
  s.version     = Kanaui::VERSION
  s.authors     = 'Killbill core team'
  s.email       = 'killbilling-users@googlegroups.com'
  s.homepage    = 'http://www.killbill.io'
  s.summary     = 'Killbill Analytics UI mountable engine'
  s.description = "Rails UI plugin for Killbill analytics."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.14"
  s.add_dependency 'jquery-rails', '~> 3.0.4'
  s.add_dependency 'money-rails', '~> 0.8.1'
  s.add_dependency 'd3_rails', '~> 3.2.8'
  s.add_dependency 'twitter-bootstrap-rails', '~> 2.2.8'
  s.add_dependency 'killbill-client', '~> 0.10.1'
  s.add_dependency 'devise', '~> 3.0.2'
  s.add_dependency 'cancan', '~> 1.6.10'
  s.add_dependency 'carmen-rails', '~> 1.0.0'
  s.add_dependency 'symmetric-encryption', '~> 3.6.0'

  s.add_development_dependency 'fakeweb', '~> 1.3'
  s.add_development_dependency 'rake', '>= 0.8.7'
  s.add_development_dependency 'simplecov'

  s.add_development_dependency "sqlite3"
end
