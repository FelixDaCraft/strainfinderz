const { url } = require('../helpers/helpers');

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

        try {
            fetch(urlApi)
                .then(res => res.json())
                .then(json => searchedJson = json)
                .then((searchedJson) => {

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

                                    msg =helpers.coolDisplay(strainsJsonArray);
                                    console.log(msg);;
                                }
                            });
                    }



                });


        } catch (error) {
            message.channel.send(error.message);
        }
    }
};