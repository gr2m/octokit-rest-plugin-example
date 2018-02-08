module.exports = rootEndpointPlugin

function rootEndpointPlugin (octokit) {
  octokit.root = (options) => {
    return octokit.request({
      method: 'get',
      url: '/'
    })
  }
}
