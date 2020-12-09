
const Discord = require('discord.js');
const helpers = require('./helpers')
const fetch = require('node-fetch');


const client = new Discord.Client();




client.once('ready', () => {
    console.log('Ready !')
});

client.on('message', (message) => {
    if (message.content.includes('!search') && message.content.includes('//')) {

        let strainInfo;

        let url = helpers.urlFormat(message.content);

        try {
            fetch(url)
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
                        message.channel.send('Strain : ' + strainInfo.name + '\n'
                            + 'Breeder : ' + strainInfo.brinfo.name + '\n'
                            + 'Parent : ' + parents)
                    } else {
                        message.channel.send(strainInfo.error);
                    }
                });
        } catch (error) {
            message.content(error.message);
        }


    }
});

client.login(process.env.TOKEN);



