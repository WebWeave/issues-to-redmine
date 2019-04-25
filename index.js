/**
 * This is the main entrypoint
 * @param {import('probot').Application} app
 */

const redmine = require('./lib/redmine')

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    // Insert issue into redmine
    redmine.insertIssueFromGithub(context)

    const issueComment = context.issue({ body: 'Thank you for reporting this issue, it has been added to our backlog' })
    return context.github.issues.createComment(issueComment)
  })
}
