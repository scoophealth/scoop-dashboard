[![Build Status](https://travis-ci.org/scoophealth/scoop-dashboard.png)](https://travis-ci.org/scoophealth/scoop-dashboard)

# Prereqs

* [Node](http://nodejs.org/) - This should provide `node` and `npm`.
* [Grunt](http://gruntjs.com/) - A `npm` module.

On a Mac, using [Homebrew](http://brew.sh/):
```
brew install nodejs
npm install -g grunt-cli
```

# Install
Clone the directory:
```bash
git clone https://github.com/scoophealth/scoop-dashboard
cd scoop-dashboard
```
Install the required dependencies:
```bash
npm install
```

# Test
Run the `test` task with `grunt`:
```bash
grunt test
```
Or, just use `npm test`

# Serve
Run the `default` task with `grunt`:
```bash
grunt serve
```
Then visit `localhost:8080` in Firefox or Chrome.
This task will persist and watch for changed files, if you're using [LiveReload Extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) it'll even reload your page for you.

