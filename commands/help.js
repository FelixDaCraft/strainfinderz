module.exports = {
    name: 'help',
    description: 'Bot Help',
    execute(message) {

        const Discord = require('discord.js');
        const MessageEmbed = new Discord.MessageEmbed()

        
        const embed = MessageEmbed.setTitle('Commandes StrainfFinder').setDescription(`Pour effectuer une recherche sur seedfinder :\n!search strain // breeder`);
       

        message.channel.send(embed);
    }
};