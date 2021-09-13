const SteamAPI = require('steamapi');
const fs = require('fs');


const apiKey = fs.readFileSync('apiKey.txt', 'utf8');
if (apiKey == "") {
    console.log("No API Key found, please get one at https://steamcommunity.com/dev/apikey and paste it in apiKey.txt");
    process.exit();
}
if (apiKey == "0123456789ABCDEF0123456789ABCDEF") {
    console.log("Stop Trying to use the example API Key! Go and get your own at  https://steamcommunity.com/dev/apikey and paste it in apiKey.txt")
    process.exit();
}


const steam = new SteamAPI(apiKey);


let array = fs.readFileSync("accounts.txt").toString().split("\n");
doBanCheck(array);

async function doBanCheck(steamid) {
    for (let i in steamid) {
        if (!steamid[i].startsWith("#")) {
            let id=await steam.resolve(steamid[i]);
            let output;
            let summary=await steam.getUserSummary(id);
            output = summary.nickname + " (" + summary.steamID + ")\n"
            let PlayerBans=await steam.getUserBans(id);
            output += "VAC Bans: " + PlayerBans.vacBans + " GameBans: " + PlayerBans.gameBans + "\n";
            console.log(output);
        }
    }
}