
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

                            let strainJSon = strainInfo.parents.strains;
                            let strainsObj = Object.keys(strainInfo.parents.strains);
                            console.log(strains.length)

                            strainsObj.forEach((strain, index) => {
                                urlApi = helpers.url(strain.brid, strain.id)
                                console.log(urlApi);
                                fetch(urlApi)
                                    .then(res => res.json())
                                    .then(json => parentJson = json).then(() => {
                                       parentsDetails.push(parentJson);
                                       
                                       if(strainsObj.length === index + 1 ){
                                           console.log(parentsDetails);
                                           parentsDetails.forEach((parentDetail) => {
                                            parents = helpers.parentFilter(parentDetail)
                                               message.channel.send(message.channel.send(`Strain : ${parentDetail.name}\nBreeder : ${parentDetail.brinfo.name}\nParent : ${parents}\nLink : ${parentDetail.links.info}`));
                                           })
                                       }

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