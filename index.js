const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

if (fs.existsSync('config.js')) {
    console.log("The config file exists!");
} else {
    console.log('The config file does not exist, creating it from scratch.');
    fs.writeFile('config.js', "var config = {};\n\n//Variables go here!\nconfig.BOT_TOKEN = 'BOT_TOKEN';\n\nmodule.exports = config;", function (err) {
        if (err) throw err;
        console.log('Config file created successfully, please add variables and run again.');
        process.exit(1)
    });
}

var config = require('./config');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(config.BOT_TOKEN);