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
        const totalChar = 128;
        let spaceLength = totalChar - ((searchedStrain.name.length + searchedStrain.brinfo.name.length) + 1);
        let i = 0;

        while (i !== spaceLength) {
            line1 = line1 + ' ';
            if (i === Math.trunc(spaceLength / 2)) {
                line1 = line1 + searchedStrain.name + ' ' + searchedStrain.brinfo.name;
            }
            i++;
        };




        let line2;
        i = 0;

        while (i !== totalChar) {
            if (i === 0) {
                line2 = '\n' + parent1.name;
                i = parent1.name.length;
            }
            line2 = line2 + ' ';
            i++;

            if (i === (Math.trunc(totalChar / 2) - 3)) {
                line2 = line2 + '__  __';
                i = i + 6
            }
            if (i === totalChar - parent2.name.length) {
                line2 = line2 + parent2.name
                i = i +parent2.name.length;
            }

        };





        let line3;
        i = 0;
        while (i !== totalChar) {
            if (i === 0) {
                line3 = '\n' + parent1.parents.strains.aaa.name;
                i = parent1.parents.strains.aaa.name.length;
            };

            line3 = line3 + ' ';
            i++;
            if (i === Math.trunc(totalChar / 2) - 3) {
                line3 = line3 + "\\ \\/ /";
                i = i + 8;
            };



            if (i === totalChar - parent2.parents.strains.aaa.name.length) {
                line3 = line3 + parent2.parents.strains.aaa.name;
                i = i + parent2.parents.strains.aaa.name.length;

            };

        };

        i = 0;
        
        while (i !== totalChar) {
            if (i === 0) {
                line4 = '\n' + 'X';
                i++;
            };

            line4 = line4 + ' ';

            i++
            if (i === Math.trunc(totalChar / 2)-2) {
                line4 = line4 + ">  <";
                i = i + 4;
            };

            if (i === 127) {
                line4 = line4 + 'X';
                i++;
            }

        }
    
        strainsLength = parent1.parents.strains.bbb.name.length + parent2.parents.strains.bbb.name.length;
        crossPlace = ((Math.trunc(122 / 2)) - 3) - parent1.parents.strains.bbb.name.length;
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
