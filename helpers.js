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
    strain = strain.replace('_X_', '_x_');

    return strain;
}

function breederFormat(breeder) {
    breeder = breeder.split(' ');
    breeder = capitalizeAll(breeder);
    breeder = breeder.join('_');

    return breeder;
}

function splitSearch(search) {
    search = search.replace('!search ', '');
    search = search.split(' // ');

    return search;
}

function url(breeder, strain) {
    let urls = [
        `https://en.seedfinder.eu/api/json/strain.json?br=${breeder}&str=${strain}&parents=1&ac=${process.env.SEEDgit}`,
        `https://en.seedfinder.eu/strain-info/${strain}/${breeder}/`
    ]
    return urls;

}

function urlFormat(search) {
    let breeder;
    let strain;
    let urlArray;

    search = splitSearch(search);
    console.log(search);
    breeder = breederFormat(search[1]);
    strain = strainFormat(search[0]);



    urlArray = url(breeder, strain);

    return urlArray;
}

function parentFilter(strainInfo) {

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

        return parents;
    }
}


module.exports = { urlFormat, url, parentFilter};
