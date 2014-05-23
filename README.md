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

# Develop
Run the `develop` task with `grunt`:
```bash
grunt develop
```
Then visit `localhost:9000` in Firefox or Chrome.
This task will persist and watch for changed files, updating the build.
If you're using [LiveReload Extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) it'll even reload your page for you.

# Test
Run the `test` task with `grunt`:
```bash
grunt test
```
Or, just use `npm test`

# Deploy
Run the `default` task with `grunt`:
```bash
grunt
```

# Future Plans

* Consider moving to `make` instead of `grunt`
