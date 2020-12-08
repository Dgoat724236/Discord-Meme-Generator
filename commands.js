const Discord = require('discord.js');
const config = require('./config');
const Canvas = require('canvas');
var sizeOf = require('image-size');
var fs = require('fs')
const FileType = require('file-type');
const request = require('request');
const RC = require('reaction-core')


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

        //Variables
        var step1;
        var step2;
        var step3;
        var step4 = [];

        //Functions

        async function getImageEmbed(message) {
            let filter = m => message.author.id === m.author.id;
            message.channel.send(imageEmbed).then(() => {
                message.channel.awaitMessages(filter, {
                    time: 60000,
                    max: 1,
                    errors: ['time']
                })
                    .then(messages => {
                        message = messages.first()
                        if (message.attachments.size > 0) {
                            message.attachments.forEach(Attachment => {
                                step1 = Attachment.url;
                                message.channel.send(`Input '${step1}' received ${messages.first().author}!`);
                                getTextEmbed(message);
                                return;
                            })
                        } else {
                            step1 = message.content;
                            message.channel.send(`Input '${step1}' received ${messages.first().author}!`);
                            getTextEmbed(message);
                            return;
                        }
                    })
                    .catch(() => {
                        message.channel.send(`No input received.`);
                    });
            });
        }

        async function getTextEmbed(message) {
            let filter = m => message.author.id === m.author.id;
            message.channel.send(textEmbed).then(() => {
                message.channel.awaitMessages(filter, {
                    time: 60000,
                    max: 1,
                    errors: ['time']
                })
                    .then(messages => {
                        message = messages.first()
                        if (message.content.length > 0) {
                            step2 = message.content;
                            message.channel.send(`Input '${step2}' received ${messages.first().author}!`);
                            getTextPosEmbed(message, handler);
                            return;
                        }
                    })
                    .catch(() => {
                        message.channel.send(`No input received.`);
                    });
            });
        }

        async function getTextPosEmbed(message, handler) {

            const buttons = [
                {
                    emoji: '↖',
                    run: () => {
                        let step3 = 'topleft';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⬆',
                    run: () => {
                        let step3 = 'top';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '↗️',
                    run: () => {
                        let step3 = 'topright';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⬅',
                    run: () => {
                        let step3 = 'left';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⏺',
                    run: () => {
                        let step3 = 'center';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '➡',
                    run: () => {
                        let step3 = 'right';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '↙️',
                    run: () => {
                        let step3 = 'bottomleft';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '⬇️',
                    run: () => {
                        let step3 = 'bottom';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                },
                {
                    emoji: '↘️',
                    run: () => {
                        let step3 = 'bottomright';
                        message.channel.send(`Input '${step3}' received ${message.author}!`)
                        getEffectEmbed(message, handler)
                    }
                }
            ]

            let getTextPosMenu = new RC.Menu(textPosEmbed, buttons, { owner: message.author.id });
            handler.addMenus(getTextPosMenu);
            message.channel.send(typeof getTextPosMenu.text === 'string' ? getTextPosMenu.text : { embed: getTextPosMenu.text }).then(async m => {
                for (let button in getTextPosMenu.buttons) {
                    await m.react(button).catch(console.error)
                }
                getTextPosMenu.register(m)
            })
        }

        async function getEffectEmbed(message, handler) {

            const buttons = [
                {
                    emoji: '❌',
                    run: () => {
                        let step4 = 'none';
                        message.channel.send(`Input '${step4}' received ${message.author}!`);
                        compileImage(message)
                    }
                },
                {
                    emoji: '✨',
                    run: () => {
                        let step4 = 'sparkle';
                        message.channel.send(`Input '${step4}' received ${message.author}!`);
                        compileImage(message)
                    }
                },
                {
                    emoji: '🔲',
                    run: () => {
                        let step4 = 'blackandwhite';
                        message.channel.send(`Input '${step4}' received ${message.author}!`);
                        compileImage(message)
                    }
                }
            ]

            let getEmbed = new RC.Menu(effectEmbed, buttons, { owner: message.author.id });
            handler.addMenus(getEmbed);
            message.channel.send(typeof getEmbed.text === 'string' ? getEmbed.text : { embed: getEmbed.text }).then(async m => {
                for (let button in getEmbed.buttons) {
                    await m.react(button).catch(console.error)
                }
                getEmbed.register(m)
            })
        }

        async function compileImage(message) {

            console.log(step1);

            const download = (url, path, callback) => {
                request.head(url, (err, res, body) => {
                    request(url)
                        .pipe(fs.createWriteStream(path))
                        .on('close', callback)
                })
            }

            const url = step1;
            const id = Math.floor(1000 + Math.random() * 9000);
            const path = './images/image' + String(id);

            function get_url_extension(url) {
                return url.split(/[#?]/)[0].split('.').pop().trim();
            }

            fs.writeFile(path, '', (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
                download(url, path, () => {
                    console.log('Done downloading!');
                    fs.rename(path, path + '.' + get_url_extension(url), (err) => {
                        if (err) throw err;
                        console.log('The file has been renamed!');
                        step1 = path + '.' + get_url_extension(url);
                        console.log(step1);
                        drawImage(message);                 
                    });
                });
            });            

            async function drawImage (message) {
                var dimensions = sizeOf(step1);

                const canvas = Canvas.createCanvas(dimensions.width, dimensions.height);
                const ctx = canvas.getContext('2d');

                const background = await Canvas.loadImage(step1);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'finished' + id + '.' + get_url_extension(url));
                message.channel.send(attachment);

                try {
                    fs.unlinkSync(step1)
                    //file removed
                } catch (err) {
                    console.error(err)
                }
            }
        }

        //Start everything
        getImageEmbed(msg);
    }
}