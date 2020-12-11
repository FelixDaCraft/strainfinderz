module.exports = {
    name: 'help',
    description: 'Bot Help',
    execute(message) {

        const MessageEmbed = require('discord.js');

        const embed = new MessageEmbed().setTitle('Commandes StrainfFinder').setColor('DARK_GREEN').setDescription(`Pour effectuer une recherche sur seedfinder :\n!search strain // breeder`);

        message.channel.send(embed);
    }
};