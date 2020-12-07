export const linkify = text => {
  if (text) {
    const linkify = require('linkifyjs')
    // const linkifyStr = require('linkifyjs/string')
    const linkifyHtml = require('linkifyjs/html')

    // require('linkifyjs/plugins/hashtag')(linkify)
    require('linkifyjs/plugins/mention')(linkify)

    const linkified = linkifyHtml(text, {
      formatHref: {
        /* hashtag: val => '/#' + val.substr(1), */
        mention: val => '/@' + val.substr(1)
      },
      validate: {
        // url: val => /^https?:\/\//.test(val), // only allow URLs that begin with a protocol
        url: true, // only allow URLs that begin with a protocol
        email: true
        // email: true // don't linkify emails
      }
    })

    return linkified
  }
  return text
}
