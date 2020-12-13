const Discord = require('discord.js');
const config = require('./config');
const Canvas = require('canvas');
var sizeOf = require('image-size');
var fs = require('fs')
const request = require("request")
const RC = require('reaction-core')
const { DownloaderHelper } = require('node-downloader-helper');

module.exports = {
    ping: function (msg) {
        var currentDate = new Date();
        msg.reply('pong! This took ' + (currentDate.getTime() - msg.createdTimestamp) + ' ms.');
    },
    help: function (msg, client, args) {

        var helpEmbed = new Discord.MessageEmbed();

        if (args[0] === 'ping') {
            helpEmbed.setColor('#13613A');
            helpEmbed.setTitle('Meme Generator Help: Ping Command');
            helpEmbed.setURL('https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setDescription('How to use the "ping" command');
            helpEmbed.setThumbnail('https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif');
            helpEmbed.addField(config.prefix + 'ping', 'This will return the time it takes for the bot to receive a message. It will be in the format "<@' + msg.author + '>, pong! This took __ ms.".', false)
            helpEmbed.setTimestamp();
            helpEmbed.setFooter('If I break, please make an issue on the GitHub!');
        } else if (args[0] === 'meme') {
            helpEmbed.setColor('#13613A');
            helpEmbed.setTitle('Meme Generator Help: Meme Command');
            helpEmbed.setURL('https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator');
            helpEmbed.setDescription('How to use the "meme" command');
            helpEmbed.setThumbnail('https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif');
            helpEmbed.addField(config.prefix + '', 'TODO', false)
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
                {name: config.prefix + 'meme [image] [text] [textpos] [effect]', value: 'TODO', inline: true}
            )
            helpEmbed.setTimestamp();
            helpEmbed.setFooter('If I break, please make an issue on the GitHub!');
        }
        msg.channel.send(helpEmbed);
    },
    meme: function (msg, client, handler, args) {

        // Embeds
        const imageEmbed = new Discord.MessageEmbed()
            .setColor('#13613A')
            .setTitle('Meme Generator: Meme Setup')
            .setURL('https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setDescription('Step 1: Image (<@' + msg.author + '>)')
            .setThumbnail('https://media.giphy.com/media/xRJZH4Ajr973y/giphy.gif')
            .addField('Submit an image', 'Please submit an image in a message. Feel free to use any image format, and either a url or a file. You have 60 seconds to submit something.', true)
            .setTimestamp()
            .setFooter('If I break, please make an issue on the GitHub!');
        const textEmbed = new Discord.MessageEmbed()
            .setColor('#13613A')
            .setTitle('Meme Generator: Meme Setup')
            .setURL('https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setDescription('Step 2: Text (<@' + msg.author + '>)')
            .setThumbnail('https://media.giphy.com/media/xRJZH4Ajr973y/giphy.gif')
            .addField('Submit text', 'Please submit a string of text that will be placed on the image. You have 60 seconds to submit text.', true)
            .setTimestamp()
            .setFooter('If I break, please make an issue on the GitHub!');
        const textPosEmbed = new Discord.MessageEmbed()
            .setColor('#13613A')
            .setTitle('Meme Generator: Meme Setup')
            .setURL('https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setDescription('Step 3: Text Position (<@' + msg.author + '>)')
            .setThumbnail('https://media.giphy.com/media/xRJZH4Ajr973y/giphy.gif')
            .addFields(
                { name: 'React to this message', value: 'Please react to this message with the position you want the text to be located in.', inline: true },
                { name: 'Diagram', value: ':arrow_upper_left::arrow_up::arrow_upper_right:\n:arrow_left::record_button::arrow_right:\n:arrow_lower_left::arrow_down::arrow_lower_right:', inline: true },
            )
            .setTimestamp()
            .setFooter('If I break, please make an issue on the GitHub!');
        const effectEmbed = new Discord.MessageEmbed()
            .setColor('#13613A')
            .setTitle('Meme Generator: Meme Setup')
            .setURL('https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setAuthor(client.user.username, client.user.avatarURL(), 'https://github.com/Dgoat724236/Discord-Meme-Generator')
            .setDescription('Step 4: Effects (<@' + msg.author + '>)')
            .setThumbnail('https://media.giphy.com/media/xRJZH4Ajr973y/giphy.gif')
            .addFields(
                { name: 'React to this message', value: 'Please react to this message with the effect you would like applied to the gif.', inline: true },
                { name: 'Options', value: ':x: None\n:sparkles: Sparkles\n:black_square_button: Black & White', inline: true },
            )
            .setTimestamp()
            .setFooter('If I break, please make an issue on the GitHub!');
        const loadingEmbed = new Discord.MessageEmbed()
            .setColor('#13613A')
            .setDescription("Loading...");

        //Variables
        var step1;
        var step2;
        var step3;
        var step4;

        var botMessage;

        //Functions

        async function getImageEmbed(message) {

            var botMessage;

            let filter = m => message.author.id === m.author.id;
            message.channel.send(imageEmbed).then(m => {
                botMessage = m;
                message.channel.awaitMessages(filter, {
                    time: 60000,
                    max: 1,
                    errors: ['time']
                })
                    .then(messages => {
                        newMessage = messages.first()
                        if (newMessage.attachments.size > 0) {
                            newMessage.attachments.forEach(Attachment => {
                                step1 = Attachment.url;
                                console.log(step1);
                                botMessage.delete();
                                newMessage.delete();
                                getTextEmbed(message);
                            })
                        } else {
                            step1 = newMessage.content;
                            console.log(step1);
                            botMessage.delete();
                            newMessage.delete();
                            getTextEmbed(message);
                        }
                    })
                    .catch(() => {
                        botMessage.delete();
                        message.channel.send(`No input received.`);
                    });
            });
        }

        async function getTextEmbed(message) {

            var botMessage;

            let filter = m => message.author.id === m.author.id;
            message.channel.send(textEmbed).then(m => {
                botMessage = m;
                message.channel.awaitMessages(filter, {
                    time: 60000,
                    max: 1,
                    errors: ['time']
                })
                    .then(messages => {
                        newMessage = messages.first()
                        if (newMessage.content.length > 0) {
                            step2 = newMessage.content;
                            console.log(step2);
                            botMessage.delete();
                            newMessage.delete();
                            getTextPosEmbed(message, handler);
                            return;
                        }
                    })
                    .catch(() => {
                        botMessage.delete();
                        message.channel.send(`No input received.`);
                    });
            });
        }

        async function getTextPosEmbed(message, handler) {

            var botMessage;

            const buttons = [
                {
                    emoji: '↖',
                    run: () => {
                        step3 = 'topleft';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⬆',
                    run: () => {
                        step3 = 'top';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '↗️',
                    run: () => {
                        step3 = 'topright';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⬅',
                    run: () => {
                        step3 = 'left';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⏺',
                    run: () => {
                        step3 = 'center';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '➡',
                    run: () => {
                        step3 = 'right';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '↙️',
                    run: () => {
                        step3 = 'bottomleft';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⬇️',
                    run: () => {
                        step3 = 'bottom';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '↘️',
                    run: () => {
                        step3 = 'bottomright';
                        console.log(step3);
                        botMessage.delete();
                        getEffectEmbed(message, handler)
                    }
                }
            ]

            let getTextPosMenu = new RC.Menu(textPosEmbed, buttons, { owner: message.author.id });
            handler.addMenus(getTextPosMenu);
            message.channel.send(typeof getTextPosMenu.text === 'string' ? getTextPosMenu.text : { embed: getTextPosMenu.text }).then(async m => {
                botMessage = m;
                for (let button in getTextPosMenu.buttons) {
                    await m.react(button).catch(console.error)
                }
                getTextPosMenu.register(m)
            })
        }

        async function getEffectEmbed(message, handler) {

            var botMessage;

            const buttons = [
                {
                    emoji: '❌',
                    run: () => {
                        step4 = 'none';
                        console.log(step4);
                        botMessage.delete();
                        compileImage(message)
                    }
                },
                {
                    emoji: '✨',
                    run: () => {
                        step4 = 'sparkle';
                        console.log(step4);
                        botMessage.delete();
                        compileImage(message)
                    }
                },
                {
                    emoji: '🔲',
                    run: () => {
                        step4 = 'blackandwhite';
                        console.log(step4);
                        botMessage.delete();
                        compileImage(message)
                    }
                }
            ]

            let getEmbed = new RC.Menu(effectEmbed, buttons, { owner: message.author.id });
            handler.addMenus(getEmbed);
            message.channel.send(typeof getEmbed.text === 'string' ? getEmbed.text : { embed: getEmbed.text }).then(async m => {
                botMessage = m;
                for (let button in getEmbed.buttons) {
                    await m.react(button).catch(console.error)
                }
                getEmbed.register(m)
            })
        }

        async function compileImage(message) {

            var botMessage;

            message.channel.send(loadingEmbed).then(m => {
                botMessage = m;
            });

            function get_url_extension(url) {
                return url.split(/[#?]/)[0].split('.').pop().trim();
            }

            const url = step1;
            const id = Math.floor(1000 + Math.random() * 9000);
            const path = "./images/";

            const options = {
                fileName: 'image' + id + '.' + get_url_extension(url)
            };

            const dl = new DownloaderHelper(step1, path, options);

            dl.on('end', () => {
                step1 = "./images/" + String(id) + '.' + get_url_extension(url);
                console.log(step1);
                drawImage(message);
            });

            await dl.start().catch(err => { console.error(err) });

            async function drawImage (message) {
                var dimensions = sizeOf(step1);

                const canvas = Canvas.createCanvas(dimensions.width, dimensions.height);
                const ctx = canvas.getContext('2d');

                const background = await Canvas.loadImage(step1);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                botMessage.delete();

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'finished' + id + '.' + get_url_extension(url));
                message.channel.send(attachment);

                try {
                    fs.unlinkSync(step1)
                } catch (err) {
                    console.error(err)
                }
            }
        }

        //Start everything
        getImageEmbed(msg);
    }
}