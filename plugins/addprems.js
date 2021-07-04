let handler = async (m, { conn }) => {
  
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (global.prems.includes(who.split`@`[0])) throw 'Already premium!'
    global.prems.push(`${who.split`@`[0]}`)
    conn.reply(m.chat, `Hi, @${who.split`@`[0]}. You are already using premium!`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })
  
}
handler.help = ['addprem *@user*']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)prem$/i
handler.rowner = true
module.exports = handler
