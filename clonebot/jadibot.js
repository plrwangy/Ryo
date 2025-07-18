require("../setting")
require("./settings")
const store = makeInMemoryStore({ "logger": pino({ "level": "silent" }).child({ "level": "silent" })})
const nodeCache = new NodeCache()
const { color, bgcolor } = require("../lib/color");
const useCODE = true
const useQR = !useCODE

const client = {}

const jadibot = async (hikari, m, from) => {
  const { state, saveCreds } = await useMultiFileAuthState(`./session/${m.sender.split("@")[0]}`)
  try {
    async function startJadibot() {
      const { version, isLatest } = await fetchLatestBaileysVersion()
      client[from] = require("./clone").makeWASocket({
        version,
        keepAliveInternalMs: 30000,
        printQRInTerminal: useQR && !useCODE,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache: nodeCache,
        markOnlineOnConnect: true,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: ['Mac OS', 'Safari', '10.15.7']
      })
      store.bind(client[from].ev)
      
      if (useCODE && !client[from].user && !client[from].authState.creds.registered) {
        setTimeout(async () => {
          code = await client[from].requestPairingCode(m.sender.split("@")[0])
          code = code?.match(/.{1,4}/g)?.join("-") || code
        }, 3000)
      }
      
      client[from].ev.on("connection.update", async up => {
        const { lastDisconnect, connection } = up
        const reason = new Boom(lastDisconnect?.error)?.output.statusCode
        if (connection == "open") {
          hikari.sendMessage(from, { text: "Terhubung ( " + client[from].user?.["id"]["split"](":")[0] + " )" })
          let userKey = client[from].user?.["id"]["split"](":")[0] + '@s.whatsapp.net';
          global.db.data.users[userKey].owner = true;
        }
        if (connection === "close") {
          if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...")
            return startJadibot()
          } else if (reason === DisconnectReason.timedOut) {
            console.log(color("Connection TimedOut, Reconnecting..."))
            return startJadibot()
          } else {
          hikari.sendMessage(from, { text: "Anda sudah tidak lagi menjadi bot." })
          let userKey = client[from].user?.["id"]["split"](":")[0] + '@s.whatsapp.net';
          global.db.data.users[userKey].owner = false;
          return
          }
        }
      })
      
      client[from].ev.process(async (events) => {
        if (events['messages.upsert']) {
          const upsert = events['messages.upsert']
          for (let msg of upsert.messages) {
            if (!msg.message) {
              return
            }
            if (msg.key.remoteJid === 'status@broadcast') {
              if (msg.message?.protocolMessage) return
              console.log(`Lihat Status ${msg.pushName} ${msg.key.participant.split('@')[0]}`)
              await client[from].readMessages([msg.key])
              await delay(1000)
              return await client[from].readMessages([msg.key])
            }
            const m = smsg(client[from], msg)
            require("../hikari")(client[from], m, store)
          }
        }
      })
      
      client[from].ev.on('creds.update', saveCreds)
    }
    return startJadibot()
  } catch (e) {
    console.log(e)
  }
}

async function stopjadibot(hikari, from) {
  if (!Object.keys(client).includes(from)) {
    return hikari.sendMessage(from, { text: "Anda tidak ada di list jadi bot." })
  }
  try {
    client[from].end("Stop")
  } catch {}
  delete client[from]
  rimraf.sync(`./session/${from.split("@")[0]}`)
}

async function listjadibot(hikari, m) {
  let from = m.key.remoteJid
  let mentions = []
  let text = "List Jadi Bot :\n"
  for (let jadibot of Object.values(client)) {
    mentions.push(jadibot.user.jid)
    text += ` × @${jadibot.user.jid.split("@")[0]}\n`
  }
  return hikari.sendMessage(from, { text: text.trim(), mentions, })
}

module.exports = { jadibot, stopjadibot, listjadibot }