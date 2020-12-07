const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const commands = require('./commands');

if (fs.existsSync('config.js')) {
    console.log("The config file exists!");
    config = require('./config');
    client.login(config.BOT_TOKEN);
} else {
    console.log('The config file does not exist, creating it from scratch.');
    fs.writeFile('config.js', "var config = {};\n\n//Variables go here!\nconfig.BOT_TOKEN = 'BOT_TOKEN';\nconfig.prefix = '!';\n\nmodule.exports = config;", function (err) {
        if (err) throw err;
        console.log('Config file created successfully, please add variables to ./config.js and run again.');
        process.exit(0)
    });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(config.prefix)) {
        if (msg.content === (config.prefix + 'ping')) {
            commands.ping(msg);
        } else if (msg.content.startsWith(config.prefix + 'help')) {
            var helpcommand = msg.content.substring((config.prefix.length + 'help '.length))
            commands.help(msg, helpcommand, client);
        } else if (msg.content === (config.prefix + 'meme')) {
            commands.meme(msg);
        }
    }
});

