let fetch = require('node-fetch')

const artinama_api = [
  ['xteam', '/primbon/artinama', 'q', 'APIKEY', json => {
    if (!json.status) throw json
    return `
*Name:* ${json.result.nama}
*Meaning:* ${json.result.arti}

*mean:* ${json.result.maksud}
`.trim()
  }],
  ['http://nzcha-apii.herokuapp.com', '/artinama', 'name', null, json => {
    if (!json.status) throw json
    return `
*Meaning:* ${json.result}
`.trim()
  }],
  ['https://scrap.terhambar.com', '/name', 'n', null, json => {
    if (!json.status) throw json
    return `
*Meaning:* ${json.result.arti}
`.trim()
  }]
]

let handler = async (m, { text }) => {
  if (!text) throw 'What is your Name?'
  let result = ''
  for (let [origin, pathname, query, apikey, fn] of artinama_api) {
    try {
      let res = await fetch(global.API(origin, pathname, { [query]: text }, apikey))
      if (!res.ok) throw res.text()
      let json = await res.json()
      result = await fn(json)
      break
    } catch (e) {
      lastErr = e
    }
  }
  m.reply(result)
}
handler.help = ['meaningname'].map(v => v + ' [name]')
handler.tags = ['clams']
handler.command = ['name']

module.exports = handler
