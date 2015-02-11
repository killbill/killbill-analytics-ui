
Overview
========

`Kanaui` stands for Kill Bill Analytics UI. This is a mountable rails engine which allows to view the analytics dashboard. In order to work correctly:
* Kill Bill must be running somewhere with the analytics plugin
* Kanaui can be started locally or can be mounted in a rails APP.


Getting Started
===============

You can run Kanaui locally by using the test/dummy app provided and interracting with a running version of Kill Bill along with the analytics plugin. In that mode,
there is no support for authorization and no support for multi-tenancy. Instead, Kanaui will use the default user `admin:password` and rely on static configuration
to provide the tenant apiKey and apiSecret.



Kanaui Configuration
--------------------

Specify your Kill Bill server url, api key and secret in ```test/dummy/config/initializers/killbill_client.rb```:

```
KillBillClient.url = 'http://127.0.0.1:8080/'
KillBillClient.api_key = 'bob'
KillBillClient.api_secret = 'lazar'
```

Running Kanaui
--------------

You can run Kanaui locally by using the test/dummy app provided:

```
bundle install
cd test/dummy
export RAILS_ENV=development
bundle install
rails server
```
