module.exports = {
    name: 'help',
    description: 'Search a strain on Seedfinder.com',
    execute(message) {

        const MessageEmbed = require('discord.js');

        const embed = new MessageEmbed().setTitle('Commandes StrainfFinder').setColor(CFE8BA).setDescription(`Pour effectuer une recherche sur seedfinder :\n!search strain // breeder`);

        message.channel.send(embed);
    }
};