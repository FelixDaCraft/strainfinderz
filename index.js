const Discord = require('discord.js');

const client = new Discord.Client();
const fetch = require('node-fetch');



client.once('ready', () => {
    console.log('Ready !')
});

client.on('message', (message) => {
    if (message.content.includes('!search') && message.content.includes('//')) {
        let strainInfo;
        let all = message.content.split('!search ');

        all.splice(0, 1);
        all = all.toString();
        all = all.split('// ')

        let strain = capitalizeWords(all[0]);
        let breeder = capitalizeWords(all[1]);

        strain = strain.replace('#', ' Nr');

        strain = strain.replace(' ', '_');

        breeder = breeder.replace(' ', '_');

        let url = 'https://en.seedfinder.eu/api/json/strain.json?br=' + breeder + '&str=' + strain + '&parents=1&ac='+ process.env.SEEDS ;

        fetch(url)
            .then(res => res.json())
            .then(json => strainInfo = json).then(() => {
                let parents;
                console.log(strainInfo);
                if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb != undefined && strainInfo.parents.strains.ccc != undefined) {
                    parents = strainInfo.parents.strains.aaa.name + ' x ' + strainInfo.parents.strains.bbb.name + ' x ' + strainInfo.parents.strains.ccc.name;
                }
                if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb != undefined && strainInfo.parents.strains.ccc == undefined) {
                    parents = strainInfo.parents.strains.aaa.name + ' x ' + strainInfo.parents.strains.bbb.name;
                }
                if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb == undefined && strainInfo.parents.strains.ccc == undefined) {
                    parents = strainInfo.parents.strains.aaa.name;
                }
                message.channel.send('Strain : ' + strainInfo.name + '\n'
                + 'Breeder : ' + strainInfo.brinfo.name + '\n'
                + 'Parent : ' + parents)
            });


    }
});

client.login(process.env.TOKEN);

// process.env.TOKEN

//fetch('https://en.seedfinder.eu/api/json/strain.json?br=Centennial_Seeds&str=Otto_Nr1&parents=1&ac=bfd10e24b41a8c503477a68f2d61c4e2').then(res => res.json())
//.then(json =>message.channel.send(json.parents.strains.aaa.name));


function capitalizeWords(text) {
    return text.replace(/(?:^|\s)\S/g, (res) => { return res.toUpperCase(); })
};