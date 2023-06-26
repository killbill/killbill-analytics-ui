
Overview
========

`Kanaui` stands for Kill Bill Analytics UI. This is a mountable rails engine which allows to view the analytics dashboard. In order to work correctly:
* Kill Bill must be running somewhere with the [analytics plugin](https://github.com/killbill/killbill-analytics-plugin)
* Kanaui can be started locally or can be [mounted in a rails app](https://github.com/killbill/killbill-admin-ui-standalone)

Kill Bill compatibility
-----------------------

| Kanaui version | Kill Bill version |
|---------------:|------------------:|
|          0.4.y |            0.16.z |
|          0.5.y |  0.18.z (Rails 4) |
|          0.6.y |  0.18.z (Rails 5) |
|          1.x.y |  0.20.z (Rails 5) |
|          2.1.y |  0.22.z (Rails 5) |
|          2.2.y |  0.24.z (Rails 6) |
|          4.x.y |  0.24.z (Rails 7) |

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

Testing
-------

To run the dummy app:

```
rails s
```


To run tests:

```
rails t
```
