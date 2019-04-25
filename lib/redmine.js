module.exports.insertIssueFromGithub = insertIssueFromGithub

const Redmine = require('node-redmine')

let hostname = process.env.REDMINE_URL
let config = {
  apiKey: process.env.REDMINE_API_KEY
}

const redmine = new Redmine(hostname, config)

function insertIssueFromGithub (context) {
  let issue = context.payload.issue

  redmine.create_issue({
    issue: {
      project_id: process.env.PROJECT_ID,
      subject: issue.title,
      description: issue.body + ' ' + issue.html_url,
      estimated_hours: 0
    }
  }, function (res) {
    console.log(res)
  })
  return true
}
