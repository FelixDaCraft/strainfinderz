const { searchRequest } = require('../helpers/helpers');

module.exports = {
    name: 'search',
    description: 'Search a strain on Seedfinder.com',
    execute(message) {

        const Discord = require('discord.js');

        const client = new Discord.Client();
        const fetch = require('node-fetch');
        const helpers = require('../helpers/helpers');



        let urls = helpers.urlFormat(message.content);
        let urlApi = urls[0];
        let urlSeed = urls[1];
        let strainInfo = helpers.searchRequest(urlApi);
        let parents = helpers.parentFilter(strainInfo);
        
        message.channel.send(`Strain : ${strainInfo.name}\nBreeder : ${strainInfo.brinfo.name}\nParent : ${parents}\nLink : ${urlSeed}`).then((message) => {
            message.react('👍').then(() => message.react('👎'));

            const filter = (reaction) => {
                return reaction.emoji.name === '👍';
            };

            const collector = message.createReactionCollector(filter, { time: 15000 });

            collector.on('collect', (reaction, user) => {
                strainInfo.parents.strains.forEach(element => {
                    console.log(element);
                });
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            });

            collector.on('end', collected => {
                console.log(strainInfo);
            });

        })
    }
};