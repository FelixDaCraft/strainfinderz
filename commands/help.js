module.exports = {
    name: 'help',
    description: 'Bot Help',
    execute(message) {

        const Discord = require('discord.js');
        const MessageEmbed = new Discord.MessageEmbed()

        try {
        const embed = new MessageEmbed().setTitle('Commandes StrainfFinder').setDescription(`Pour effectuer une recherche sur seedfinder :\n!search strain // breeder`);
        }
        catch(error){
            console.log(error);
        }

        message.channel.send(embed);
    }
};