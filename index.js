const Discord = require('discord.js');
const fs = require('fs');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready !')
});

client.on('message', message => {
    if (!message.content.startsWith('!') || message.author.bot) { return }
    else {
        if (!client.commands.has(command)) { return }
        else {
            try {
                client.commands.get.execute(message, args);
            } catch {
                console.error(error);
                message.reply('Error');
            }
        }

    }

})

client.login(process.env.TOKEN);