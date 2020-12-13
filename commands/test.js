const { url } = require('../helpers');

module.exports = {
    name: 'test',
    description: 'test',
    execute(message) {

        let msg1 = 'slip de bain';
        let msg2 = 'Ploupi';

        let line1 = '``` \n';
        let totalChar = 128;
        let spaceLength = totalChar - msg1.length;
        let i = 0;

        while (i !== spaceLength) {
            line1 = line1 + ' ';
            if (i === Math.trunc(spaceLength / 2)) {
                line1 = line1 + msg1;
            }
            i++;
            if(i === spaceLength){
                console.log(line1);
            };
        }

        totalChar = 122;
        let strainsLength = msg1.length + msg2.length;
        let strain2Place = totalChar - msg2.length;
        let crossPlace = ((Math.trunc(128 / 2)) - 3)- msg1.length;
        let line2;
        spaceLength = totalChar - strainsLength;
        i = 0;
        while (i !== strain2Place) {
            if (i === 0) { line2 = '\n' + msg1; }
            line2 = line2 + ' ';
            if (i === crossPlace) {
                line2 = line2 + '__  __';
            }
            i++;
            if (i === strain2Place) {
                line2 = line2 + msg2
            }

        }

        totalChar = 122;
        msg1 = 'OUlouuuuuuuuuu';
        msg2 = 'OUlouuuuYYYYYYYYYkjqhnsmkljcnjklnzuuuuuu';
        nbr1 = msg1.length + msg2.length;
        nbr2 = totalChar - msg2.length;
        let line3;
        lineNbr = totalChar - nbr1;
        i = 0;
        while (i !== lineNbr) {
            if (i === 0) { line3 = '\n' + msg1; }
            line3 = line3 + ' ';
            if (i === Math.trunc(lineNbr / 2)) {
                line3 = line3 + '__  __';
            }
            i++;
            if (i === lineNbr) {
                line3 = line3 + msg2 + '\n```';
                message.channel.send(line1 + line2 +line3 + '\n```');
            }

        }

    }
};