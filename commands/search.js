module.exports = {
    name: 'search',
    description: 'Search a strain on Seedfinder.com',
    execute(message) {

        const helpers = require('../helpers/helpers');
        const fetch = require('node-fetch');

        let searchedJson;
        let urls = helpers.urlFormat(message.content);
        let urlApi = urls[0];
        let urlSeed = urls[1];
        let strainsJsonArray = [];
        let msg;


        fetch(urlApi)
            .then(res => res.json())
            .then(json => strainInfo = json).then(() => {
                let parents = helpers.parentFilter(strainInfo);
                message.channel.send(`Strain : ${strainInfo.name}\nBreeder : ${strainInfo.brinfo.name}\nParent : ${parents}\nLink : ${urlSeed}`)
                    .then((message) => {
                        message.react('👍').then(() => message.react('👎'));

                        let parents = searchedJson.parents.strains;
                        let parentsKeys = Object.keys(parents);
                        let nbrOfStrains = parentsKeys.length + 1;

                        strainsJsonArray.push(searchedJson);

                        for (let [key, parent] of Object.entries(parents)) {

                            urlApi = helpers.url(parent.brid, parent.id);
                            fetch(urlApi)
                                .then(res => res.json())
                                .then(json => parentJson = json).then(() => {

                                    strainsJsonArray.push(parentJson);


                                    if (strainsJsonArray.length === nbrOfStrains) {

                                        parentsDetails.push(parentJson);


                                        if (parentsDetails.length === numberOfStrainKeys) {
                                            let msg = '';
                                            parentsDetails.forEach((parentDetail, index) => {
                                                parents = helpers.parentFilter(parentDetail)
                                                msg = msg.concat('', `Strain : ${parentDetail.name}\nBreeder : ${parentDetail.brinfo.name}\nParent : ${parents}\nLink : <${parentDetail.links.info}>\n\n`);
                                                console.log(index);
                                                if (index + 1 === numberOfStrainKeys) {
                                                    message.channel.send(msg);
                                                }
                                            })
                                        }
                                    };

                                })


                        };

                    });

            });
    }
}