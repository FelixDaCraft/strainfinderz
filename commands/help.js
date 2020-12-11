module.exports = {
    name: 'helpstrainfinder',
    description: 'Bot Help',
    execute(message) {


        const Discord = require('discord.js');

        const MessageEmbed = new Discord.MessageEmbed()
        const embed = MessageEmbed.setTitle('Commandes StrainfFinder').setColor('DARK_GREEN').setDescription(`Pour effectuer une recherche sur seedfinder : !search strain // breeder`);
        
        message.channel.send(embed);
    }
};

