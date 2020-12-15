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
        `https://en.seedfinder.eu/api/json/strain.json?br=${breeder}&str=${strain}&parents=1&ac=${process.env.SEED}`,
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
            parents = [`${strainInfo.parents.strains.aaa.name} (from ${strainInfo.parents.strains.aaa.brname})`, `${strainInfo.parents.strains.bbb.name} (from ${strainInfo.parents.strains.bbb.brname})`, `${strainInfo.parents.strains.ccc.name} (from ${strainInfo.parents.strains.ccc.brname})`];
        }
        if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb != undefined && strainInfo.parents.strains.ccc == undefined) {
            parents = [`${strainInfo.parents.strains.aaa.name} (from ${strainInfo.parents.strains.aaa.brname})`, `${strainInfo.parents.strains.bbb.name} (from ${strainInfo.parents.strains.bbb.brname})`];
        }
        if (strainInfo.parents.strains.aaa != undefined && strainInfo.parents.strains.bbb == undefined && strainInfo.parents.strains.ccc == undefined) {
            parents = [`${strainInfo.parents.strains.aaa.name} (from ${strainInfo.parents.strains.aaa.brname})`];
        }

        return parents;
    }
}

function coolDisplay(strainsJsonArray) {


    let msg;

    if (strainsJsonArray.length === 3) {

        let searchedStrain = strainsJsonArray[0];
        let parent1 = strainsJsonArray[1];
        let parent2 = strainsJsonArray[2];

        let line1 = '``` \n';
        let totalChar = 128;
        let spaceLength = totalChar - ((searchedStrain.name.length + searchedStrain.brinfo.name.length) + 1);
        let i = 0;

        while (i !== spaceLength) {
            line1 = line1 + ' ';
            if (i === Math.trunc(spaceLength / 2)) {
                line1 = line1 + searchedStrain.name + ' ' + searchedStrain.brinfo.name;
            }
            i++;
        };

        totalChar = 122;
        let strainsLength = parent1.name.length + parent2.name.length;
        let crossPlace = ((Math.trunc(128 / 2)) - 3) - parent1.name.length;
        spaceLength = totalChar - strainsLength;
        let line2;
        i = 0;
        spaceLength = totalChar - strainsLength;

        while (i !== spaceLength) {
            if (i === 0) { line2 = '\n' + parent1.name; }
            line2 = line2 + ' ';
            if (i === crossPlace) {
                line2 = line2 + '__  __';
            }
            i++;
            if (i === spaceLength) {
                line2 = line2 + parent2.name
            }

        };



        totalChar = 122;
        strainsLength = parent1.parents.strains.aaa.name.length + parent2.parents.strains.aaa.name.length;
        crossPlace = ((Math.trunc(128 / 2)) - 3) - parent1.parents.strains.aaa.name.length;
        spaceLength = totalChar - strainsLength;
        let line3;
        spaceLength = totalChar - strainsLength;
        i = 0;
        while (i !== spaceLength) {
            if (i === 0) {
                line3 = '\n' + parent1.parents.strains.aaa.name;
            };

            line3 = line3 + ' ';

            if (i === crossPlace) {
                line3 = line3 + "\\ \\/ /";
            };

            i++;

            if (i === spaceLength) {
                line3 = line3 + parent2.parents.strains.aaa.name;

            };

        };

        i = 0;
        crossPlace = Math.trunc(128 / 2) - 2
        while (i !== 124) {
            if (i === 0) {
                line4 = '\n' +'X';
            };

            line4 = line4 + ' ';
            

            if (i === crossPlace) {
                line4 = line4 + ">  <";
            };

            i++;

            if(i === 123){
                line4 = line4 + 'X';
                i++;
            }

        }
        totalChar = 122;
        strainsLength = parent1.parents.strains.bbb.name.length + parent2.parents.strains.bbb.name.length;
        crossPlace = ((Math.trunc(128 / 2)) - 3) - parent1.parents.strains.bbb.name.lengthh;
        let line5;
        spaceLength = totalChar - strainsLength;
        i = 0;
        while (i !== spaceLength) {
            if (i === 0) { line5 = '\n' + parent1.parents.strains.aaa.name; }
            line5 = line5 + ' ';
            if (i === crossPlace) {
                line5 = line5 + "/_/\\_\\";
            };

            i++;

            if (i === spaceLength) {
                line5 = line5 + parent2.parents.strains.bbb.name + '```';
                msg = line1 + line2 + line3 + line4 + line5;
            };

        }
    }

    return msg;

}


module.exports = { urlFormat, url, parentFilter, coolDisplay };
