# Quick Pollster
#####by Nicholas Stephenson

## About

Quick Pollster is a Rails based webapp that allows registered users and guests to quickly make short polls to share with friends, enemies, acquantances, coworkers, or anyone else with a functioning connection to the internet.

## Getting Started

*Note: This assumes you have Ruby 2.2.3 or later installed properly and have a basic working knowledge of how to use RubyGems*

First, fork and clone this repo

```bash
git clone https://github.com/NStephenson/quick-pollster-rails-assessment.git
```

Then setup ruby dependencies using bundler

```bash
bundle install
```

And javascript packages using npm

```bash
npm install
```

Now create the database

```bash
rake db:migrate
```

Next, to allow the users to authorize accounts using facebook, create a file in the root of the directory named `.env`

```bash
touch .env
```

Then inside your .env place your facebook key and secret as follows. Instruction on how to obtain a key and ID can be found at http://developers.facebook.com

```
FACEBOOK_KEY = 'YOUR KEY'
FACEBOOK_SECRET = 'YOUR SECRET'
```

Now you are ready to run your server.

```bash
rails s
```

Enjoy!


## Contributing

Bug reports, pull requests, and suggestions for a better name for this app are welcome on GitHub at https://github.com/nstephenson/quick_pollster


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).