
module.exports = {
    name: 'search',
    description: 'Search a strain on Seedfinder.com',
    execute(message) {

        const helpers = require('../helpers');
        const fetch = require('node-fetch');

        let strainInfo;
        let urls = helpers.urlFormat(message.content);
        let urlApi = urls[0];
        let urlSeed = urls[1];

        fetch(urlApi)
            .then(res => res.json())
            .then(json => strainInfo = json)
            .catch((error) => {
                console.log(error);
            })
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

            });

            collector.on('end', collected => {

            });

        })
    }
};