# @octokit/rest plugin example

[`@octokit/rest`](https://github.com/octokit/rest.js) has an [experimental plugin API](https://github.com/octokit/rest.js/tree/master/lib/plugins). A plugin can
be shared as npm module


```js
// init octokit
const octokit = require('@octokit/rest')()
// load plugin
octokit.plugin(require('my-octokit-rest-plugin'))
```

In order to add a new method to `octokit`, a plugin can look like this

```js
module.exports = function helloWorldPlugin(octokit) {
  // add .helloWorld method to `octokit` instance
  octokit.helloWorld = function () {
    console.log('Hello, world!')
  }
}
```

To add a method for a new GitHub API endpoint, a plugin can look like this

```js
module.exports = function newEndpointsPlugin(octokit) {
  // add .helloWorld method to `octokit` instance
  octokit.repos.myNewEndpoint = function (options) {
    return octokit.request({
      method: 'POST',
      url: '/repos/:owner/:repo/something-new',
      headers: {
        accept: 'application/vnd.github.black-panther-preview+json'
      },
      ...options
    })
  }
}
```

The method can then be used like this

```js
const octokit = require('@octokit/rest')()
octokit.plugin(require('octokit-rest-new-endpoints-plugin'))
octokit.repos.myNewEndpoint({
  owner: 'octokit',
  repo: 'welcome',
  foo: 'bar'
})
```

If there are many new endpoints it could be worth to create a [`routes.json file like @octokit/rest/lib/routes.json`](https://github.com/octokit/rest.js/blob/master/lib/routes.json)
and then build the endpoints based on that file like the core [endpoint-methods plugin](https://github.com/octokit/rest.js/tree/master/lib/plugins/endpoint-methods).
