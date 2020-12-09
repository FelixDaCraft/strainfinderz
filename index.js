
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
        console.log(url);

        try {
            fetch(url)
                .then(res => res.json())
                .then(json => strainInfo = json).then(() => {
                    if (strainInfo.error === false) {
                        let parents;
                        console.log(strainInfo.parents.strains.aaa)
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
                    }else{
                        message.channel.send(strainInfo.error);
                    }
                });
        } catch (error) {
            message.content(`Une erreur c'est produite, verifie l'orthographe du breeder ou du strain :P`);
        }


    }
});

client.login(process.env.TOKEN);

// 

//fetch('https://en.seedfinder.eu/api/json/strain.json?br=Centennial_Seeds&str=Otto_Nr1&parents=1&ac=bfd10e24b41a8c503477a68f2d61c4e2').then(res => res.json())
//.then(json =>message.channel.send(json.parents.strains.aaa.name));


