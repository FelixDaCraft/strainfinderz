
function capitalizeWords(text) {
    return text.replace(/(?:^|\s)\S/g, (res) => { return res.toUpperCase(); })
};

function capitalizeAll(array) {
    let capitalizedArray = [];
    array.forEach((element, index) => {
        capitalizedArray[index] = capitalizeWords(element);
    });
    return capitalizedArray
}

function strainFormat(strain) {
    strain = strain.replace('#', '_Nr');
    strain = strain.split(' ');
    strain = capitalizeAll(strain);
    strain = strain.join('_');

    return strain;
}

function breederFormat(breeder){
    breeder = breeder.split(' ');
    breeder = capitalizeAll(breeder);
    breeder = breeder.join('_');
    breeder = breeder.replace('_X_', '_x_');

    return breeder;
}

function splitSearch (search){
        search = search.replace('!search ', '');
        search = search.split(' // ');

        return search;
}

function urlFormat (search){
    let breeder;
    let strain;
    let urlApi;
    let urlSeed;
    let urlArray;

    search = splitSearch(search);
    console.log(search);
    breeder = breederFormat(search[1]);
    strain = strainFormat(search[0]);

    urlApi = `https://en.seedfinder.eu/api/json/strain.json?br=${breeder}&str=${strain}&parents=1&ac=${process.env.SEED}`;
    urlSeed = `https://en.seedfinder.eu/strain-info/${strain}/${breeder}/`;

    urlArray = [urlApi, urlSeed];

    return urlArray;
}


module.exports = {urlFormat};
