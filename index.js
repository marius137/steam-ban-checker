const SteamAPI = require('steamapi');
const fs = require('fs');
var apiKey;

apiKey = fs.readFileSync('apiKey.txt', 'utf8');
if(apiKey==""){
    console.log("⚠⚠⚠No API Key found, please get one at https://steamcommunity.com/dev/apikey and paste it in apiKey.txt");
    process.exit();
}
const steam = new SteamAPI(apiKey);
steam.resolve('76561198886202103').then(id => {
    steam.getUserSummary(id).then(summary => {
        console.log(summary.nickname + " (" + summary.steamID + ")");
        steam.getUserBans(id).then(PlayerBans => {
            console.log("VAC Bans: "+PlayerBans.vacBans+" GameBans: "+PlayerBans.gameBans);
        });
    });
});
