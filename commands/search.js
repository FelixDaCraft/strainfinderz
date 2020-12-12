const { url } = require('../helpers');

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

                            let strains = strainInfo.parents.strains;
                            let strainKeys = Object.keys(strains)
                            let numberOfStrainKeys = strainKeys.length


                            for (let [key, val] of Object.entries(strains)) {

                                urlApi = helpers.url(val.brid, val.id);
                                fetch(urlApi)
                                    .then(res => res.json())
                                    .then(json => parentJson = json).then(() => {

                                        parentsDetails.push(parentJson);
                                        

                                        if (parentsDetails.length === numberOfStrainKeys) {
                                            let msg = '';
                                            parentsDetails.forEach((parentDetail, index) => {
                                                parents = helpers.parentFilter(parentDetail)
                                                msg.concat('',`Strain : ${parentDetail.name}\nBreeder : ${parentDetail.brinfo.name}\nParent : ${parents}\nLink : ${parentDetail.links.info}\n`);
                                                console.log(index);
                                                if(index +1 === numberOfStrainKeys){
                                                    message.channel.send(msg);
                                                }
                                            })
                                        }



                                    });

                            }


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