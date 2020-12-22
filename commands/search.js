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
        let parentsDetails = [];

<<<<<<< HEAD
        try {
            fetch(urlApi)
                .then(res => res.json())
                .then(json => strainInfo = json).then(() => {
                    let parents = helpers.parentFilter(strainInfo);
                    message.channel.send(`Strain : ${strainInfo.name}\nBreeder : ${strainInfo.brinfo.name}\nParent : ${parents}\nLink : ${urlSeed}`).then((message) => {
<<<<<<< HEAD
=======

        fetch(urlApi)
            .then(res => res.json())
            .then(json => searchedJson = json).then((searchedJson) => {
                let parents = helpers.parentFilter(searchedJson);
                message.channel.send(`Strain : ${searchedJson.name}\nBreeder : ${searchedJson.brinfo.name}\nParent : ${parents}\nLink : ${urlSeed}`)
                    .then((message) => {
>>>>>>> 48444d3f58e182f08b42d71e1287a5f189f8d31f
                        message.react('👍').then(() => message.react('👎'));
=======
                        message.react('👍');
>>>>>>> parent of ce97ccb... test cool display

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


                                            let msg = '';
                                            parentsDetails.forEach((parentDetail, index) => {
                                                parents = helpers.parentFilter(parentDetail)
<<<<<<< HEAD
                                                msg = msg.concat('',`Strain : ${parentDetail.name}\nBreeder : ${parentDetail.brinfo.name}\nParent : ${parents}\nLink : <${parentDetail.links.info}>\n`);
=======
                                                msg = msg.concat('', `Strain : ${parentDetail.name}\nBreeder : ${parentDetail.brinfo.name}\nParent : ${parents}\nLink : <${parentDetail.links.info}>\n\n`);
>>>>>>> 48444d3f58e182f08b42d71e1287a5f189f8d31f
                                                console.log(index);
                                                if (index + 1 === nbrOfStrains) {
                                                    message.channel.send(msg);
                                                }
                                            })
<<<<<<< HEAD
                                        }



                                    });
=======
                                        
                                    };
>>>>>>> 48444d3f58e182f08b42d71e1287a5f189f8d31f

                                })


                        };

                    });

            });
    }
}