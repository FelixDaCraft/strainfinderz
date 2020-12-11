
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

        try {
            fetch(urlApi)
                .then(res => res.json())
                .then(json => strainInfo = json).then(() => {
                    if (strainInfo.error === false) {
                        let parents;
                        if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb != undefined && strainInfo.parents.strains.ccc != undefined) {
                            parents = `${strainInfo.parents.strains.aaa.name} (from ${strainInfo.parents.strains.aaa.brname}) x ${strainInfo.parents.strains.bbb.name} (from ${strainInfo.parents.strains.bbb.brname}) x ${strainInfo.parents.strains.ccc.name} (from ${strainInfo.parents.strains.ccc.brname})`;
                        }
                        if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb != undefined && strainInfo.parents.strains.ccc == undefined) {
                            parents = `${strainInfo.parents.strains.aaa.name} (from ${strainInfo.parents.strains.aaa.brname}) x ${strainInfo.parents.strains.bbb.name} (from ${strainInfo.parents.strains.bbb.brname})`;
                        }
                        if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb == undefined && strainInfo.parents.strains.ccc == undefined) {
                            parents = `${strainInfo.parents.strains.aaa.name} (from ${strainInfo.parents.strains.aaa.brname})`;
                        }
                        message.channel.send(`Strain : ${strainInfo.name}\nBreeder : ${strainInfo.brinfo.name}\nParent : ${parents}\nLink : ${urlSeed}`).then((message) => {
                            message.react('👍').then(() => message.react('👎'));

                            const filter = (reaction, user) => {
                                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === messageAuthor.id;
                            };

                            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();

                                    if (reaction.emoji.name === '👍') {
                                        message.send(messageAuthor.author.toSting() +'you reacted with a thumbs up.');
                                    } else {
                                        message.send('you reacted with a thumbs down.');
                                    }
                                })
                                .catch(collected => {
                                    message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
                                });
                        });


                    } else {
                        message.channel.send(strainInfo.error);
                    }
                }).catch((error) => { console.log(error.message) })
        } catch (error) {
            message.content(error.message);
        }
    }
};