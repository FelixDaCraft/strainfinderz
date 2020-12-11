module.exports = {
    name: 'help',
    description: 'Bot Help',
    execute(message) {

        const MessageEmbed = require('discord.js');

        try {
        const embed = new MessageEmbed().setTitle('Commandes StrainfFinder').setDescription(`Pour effectuer une recherche sur seedfinder :\n!search strain // breeder`);
        }
        catch(error){
            console.log(error);
        }

        message.channel.send(embed);
    }
};