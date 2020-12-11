
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
        let messageAuthor = message.author;
        let parentsDetails = [];
        parentsDetails.push('im crying');

        try {
            fetch(urlApi)
                .then(res => res.json())
                .then(json => strainInfo = json).then(() => {
                    let parents = helpers.parentFilter(strainInfo);
                    message.channel.send(`Strain : ${strainInfo.name}\nBreeder : ${strainInfo.brinfo.name}\nParent : ${parents}\nLink : ${urlSeed}`).then((message) => {
                        message.react('👍').then(() => message.react('👎'));

                        const filter = (reaction, user) => {
                            return reaction.emoji.name === '👍' && user.id === messageAuthor.id;
                        };

                        const collector = message.createReactionCollector(filter, { time: 15000 });

                        collector.on('collect', (reaction, user) => {

                            for (let parent in strainInfo.parents.strains) {
                                let parentJson;


                                

                            };
                            Object.keys(strainInfo.parents.strains).forEach(async (strain, index) => {

                                urlApi = helpers.url(strain.brid, strain.id)
                                fetch(urlApi)
                                    .then(res => res.json())
                                    .then(json => parentJson = json).then(() => {
                                       parentsDetails.push('or not');
                                       
                                       console.log(strain);

                                    });
                            });
                            console.log(parentsDetails);

                            
                        });

                        collector.on('end', collected => {
                            console.log(`Collected ${collected.size} items`);
                        });
                    });

                }).catch((error) => { console.log(error.message) })
        } catch (error) {
            message.content(error.message);
        }
    }
};