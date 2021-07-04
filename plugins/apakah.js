let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `
*Question:* ${m.text}
*Answer:* ${pickRandom(['Yes','Probably yes','Probably','Probably not','No','No way'])}
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['what <teks>?']
handler.tags = ['clams']
handler.customPrefix = /(\?$)/
handler.command = /^if$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

