const nock = require('nock')
const test = require('tap').test

const Octokit = require('@octokit/rest')
const plugin = require('.')

test('octokit.root', t => {
  nock('https://api.github.com')
    .get('/')
    .reply(200, {foo: 'bar'})

  const octokit = Octokit()
  octokit.plugin(plugin)

  octokit.root()

  .then(result => {
    console.log(result.data)
    t.is(result.data.foo, 'bar')
    t.end()
  })

  .catch(t.error)
})
