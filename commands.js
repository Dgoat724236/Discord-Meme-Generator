const Discord = require('discord.js');
const config = require('./config');

module.exports = {
    ping: function (msg) {
        var currentDate = new Date();
        msg.reply('pong! This took ' + (currentDate.getTime() - msg.createdTimestamp) + ' ms.');
    },
    help: function (msg, helpcommand, client) {

        var helpEmbed = new Discord.MessageEmbed();

        if (helpcommand === 'ping') {
            helpEmbed.setColor('#13613A');
            helpEmbed.setTitle('Meme Generator Help: Ping Command');
            helpEmbed.setURL('https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setDescription('How to use the "ping" command');
            helpEmbed.setThumbnail('https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif');
            helpEmbed.addField(config.prefix + 'ping', 'This will return the time it takes for the bot to receive a message. It will be in the format "<@' + msg.author + '>, pong! This took __ ms.".', false)
            helpEmbed.setTimestamp();
            helpEmbed.setFooter('If I break, please make an issue on the GitHub!');
        } else if (helpcommand === 'meme') {
            helpEmbed.setColor('#13613A');
            helpEmbed.setTitle('Meme Generator Help: Meme Command');
            helpEmbed.setURL('https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setDescription('How to use the "meme" command');
            helpEmbed.setThumbnail('https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif');
            helpEmbed.addField(config.prefix + 'ping', 'TODO', false)
            helpEmbed.setTimestamp();
            helpEmbed.setFooter('If I break, please make an issue on the GitHub!');
        }
        else {
            ;
            helpEmbed.setColor('#13613A');
            helpEmbed.setTitle('Meme Generator Help');
            helpEmbed.setURL('https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setDescription('How to use this bot');
            helpEmbed.setThumbnail('https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif');
            helpEmbed.addFields(
                {name: config.prefix + 'ping', value: 'This will return the time it takes for the bot to receive a message. It will be in the format "<@' + msg.author + '>, pong! This took __ ms.".', inline: true },
                {name: config.prefix + 'meme', value: 'TODO', inline: true}
            )
            helpEmbed.setTimestamp();
            helpEmbed.setFooter('If I break, please make an issue on the GitHub!');
        }
        msg.channel.send(helpEmbed);
    },
    meme: function (msg) {

    }
}