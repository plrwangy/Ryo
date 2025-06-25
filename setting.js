const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone')
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')	
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const renSc = new require('./lib/scrape/noapi')
const Fichan = new require('./lib/functions')
const renSc2 = new require('./lib/scrape/scraperf')
const Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    })
  );
  var str = text.toLowerCase().split('');
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
const ab = '`'
//=================================================//
// System
global.baileys = require('@whiskeysockets/baileys')
global.usePairingCode = true

//—————「 Set Link 」—————//
global.saluran = 'Yusuf-Senpai'
global.idch = "120363417724861553@newsletter" // ID saluran
global.gr = 'https://whatsapp.com/channel/0029Vb6nObCFcowFKpj78O0J'
global.yt = 'https://youtube.com/radityayusufalbarkah'
global.ig = 'https://www.tiktok.com/@fenrir_fel?_t=ZS-8xUkfHI2pwA&_r=1' // ubah aja
global.web = "https://linktr.ee/DITZZMC"
global.email = 'yusufsenpai15@gmail.ID' //serah
global.ap = 'https://wa.me/62895356336040'
global.region = 'Isekai' // serah

//—————「 Set Nama Own & Bot 」—————//
global.ownername = 'Yusuf-Senpai' //ubah jadi nama mu
global.namaStore = 'Ysf-senpai'
global.ownerStore = 'Yusuf-senpai'
global.rowner = [["62895356336040", "Ysf-Senpai", true], ["-", "-", false]];
global.owner = ["62895356336040"] // GLOBAL NOMOR 
global.botname = 'Iki botak' //ubah jadi nama bot mu

//—————「 Set Media & Thumb Bot 」—————//
global.img = "https://files.catbox.moe/a8qgx8.jpg"
global.thumb = "https://files.catbox.moe/a8qgx8.jpg"
global.tumburl = 'https://files.catbox.moe/a8qgx8.jpg'
global.hstt = "https://files.catbox.moe/a8qgx8.jpg"
global.tqtdd = "https://files.catbox.moe/a8qgx8.jpg"
global.tqto = "https://files.catbox.moe/a8qgx8.jpg"
global.vn = "https://files.catbox.moe/1lcos1.jpg"
// Sisanya di folder media

//—————「 Set Pack Sticker 」—————//
global.packname = 'By yusuf ayub' // ubah aja ini nama sticker
global.author = `Yusuf` // ubah aja ini nama sticker

//==========================Biiofc=======================//
global.keyopenai = `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`
//====================BY Biiofc=============================//
global.hiasan = `	◦  `
global.prefa = ['','!','.',',','🐤','🗿']
global.sp = '⭔' // Gausah Juga
global.wlcm = []
global.wlcmm = []
global.themeemoji = "乂"
global.tTeks = '      ◦‎‎‎  .'
global.tTeks2 = '> '
global.gris = '`'
global.wm = `Yusuf ayub`
global.footer = Styles(`${tTeks2} Cartethyia Multi Device`)
global.footer2 = Styles(`Tiktok fenrir_fel`)
//=================================================//
// ApiKeys
global.netlify = `nfp_wixfsScxSsSP1aboRhX3XnekctaRyyova03f`
global.xfarApi = `OYi6LEZ6QY`
global.caliph = `MyBiibotz`
global.KayBii = `BiiXKayy`
global.zenzkey = `zenzkey_41b4fe7a5d` // ZahwaZein
global.btbApi = `w4SYozNA`
global.ApiNx = `kceScM`
global.skizo = `Twelve`
global.skizo2 = `kyuu`
global.beta = 'BRexrqpD' // https://api.betabotz.org
global.kimz = `kayy`
global.ziro = `ojbSxpdBb4`
global.xyro = `4OfcqDtWMj`
global.rose = 'Aliciazyn'
global.arif = `AR-xQWGNiqhwVaJ`
global.arifyn = `AR-eS8sE0ShK48c`
global.ibeng = `j8a2H4Tly6`
global.ibeng3 = `a5wXu8gj58`
global.ibeng2 =`uYmf6Sgjxl`
global.xeonApi = `976b505f`
global.rbot = `punyaku`
global.miftah = `free`
global.qyuApi = `XjEycutl8w`
global.ApiNeko = `7198c803`
global.ramz = `kayydev`
global.pitu = `3aa275992a`
global.yanzApi = `kyuurzy`
global.ifung = `sCbXLTDebA`
global.alya = `muzan23`
global.zoner = `6D0979`
global.koi = `tWQaPXtQH8`
global.rdnApi = `5o7fzt6nir2`
global.ouzen = `zenzkey_a3ac079e820f` //https://api.ouzen.xyz/
global.kicode = `KC-euHoZ2JgkOhs`
global.maelyn = `SvbxiWHTmt`
global.apikey = `XingYuEmperor`
//=================================================//
global.trash = fs.readFileSync('./process.json')
global.document = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.link = ""
global.select = 2
//=================================================//
global.scrap = renSc2
global.chApi = renSc
global.Func = Fichan
global.tag = `© 2025 | ${botname}`
global.systemN = `*[ System Notice ]*`
global.mess = {
    ban: Styles('*[ System Access Failed ]* you are banned by the owner'),
    badm: Styles('*[ System Notice ]* please add bot *admin*'),
    regis: Styles(`*[ System Access Failed ]*\n\nKamu belum daftar!\nSilahkan daftar dengan cara *.daftar*`),
    premium: Styles('*[ System Notice ]* this only premium user'),
    search: Styles('🔍 *Search for server. . .*'),
    done: Styles('Done Ga Bang?? Done...'),
    success: Styles('*[ Loaded Success ]*'),
    admin: Styles('*[ System Notice ]* for *admin!* not *npc*'),
    owner: Styles('*[ System Access Failed ]* Access Denied'),
    group: Styles('*[ System Notice ]* Use this in group chat!'),
    private: Styles('*[ System Notice ]* Use this in private chat!'),
    bot: Styles('*[ System Notice ]* Only Bot user'),
    wait: Styles('*[ Loading ]* Please Wait'),
    getdata: Styles('Scraping metadata . . .'),
    fail: Styles('Can\'t get metadata!'),
    error: Styles('*[ System Failed ]* Error, please contact the owner'),
    errorF: Styles('*[ System Failed ]* Sorry this feature is in error.'),
}


// SETTING GAME
global.gamewaktu = 60 // Game waktu
global.bmin = 1000 // Balance minimal 
global.bmax = 10000 // Balance maksimal
//Gausah Juga

// DATABASE GAME

global.suit = {};
global.tictactoe = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar2 = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.kuismath = {};
//=================================================//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})