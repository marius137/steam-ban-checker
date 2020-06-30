const SteamAPI = require('steamapi');
const fs = require('fs');
const readline = require('readline');
const apiKey = fs.readFileSync('apiKey.txt', 'utf8');
if (apiKey == "") {
    console.log("No API Key found, please get one at https://steamcommunity.com/dev/apikey and paste it in apiKey.txt");
    process.exit();
}
if(apiKey=="0123456789ABCDEF0123456789ABCDEF"){
    console.log("Stop Trying to use the example API Key! Go and get your own at  https://steamcommunity.com/dev/apikey and paste it in apiKey.txt")
    process.exit();
}
const steam = new SteamAPI(apiKey);


const rl = readline.createInterface({
    input: fs.createReadStream('accounts.txt'),
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    if (!line.startsWith("#")) {
        doBanCheck(line);
    }
});

function doBanCheck(steamid) {
    steam.resolve(steamid).then(id => {
        var output;
        steam.getUserSummary(id).then(summary => {
            output = summary.nickname + " (" + summary.steamID + ")\n"
            steam.getUserBans(id).then(PlayerBans => {
                output += "VAC Bans: " + PlayerBans.vacBans + " GameBans: " + PlayerBans.gameBans + "\n";
                console.log(output);
            });
        });
    });
}