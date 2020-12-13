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
        let crossPlace = ((Math.trunc(128 / 2)) - 3)- msg1.length;
        let strain2Place = totalChar - strainsLength;
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


        msg1 = 'Dosidos x purple dupain';
        msg2 = 'Dosidos x purple kushy kush dupain';
        totalChar = 122;
        strainsLength = msg1.length + msg2.length;
        crossPlace = ((Math.trunc(128 / 2)) - 3)- msg1.length;
        strain2Place = totalChar - strainsLength;
        let line3;
        spaceLength = totalChar - strainsLength;
        i = 0;
        while (i !== strain2Place) {
            if (i === 0) { line3= '\n' + msg1; }
            line3 = line3 + ' ';
            if (i === crossPlace) {
                line3 = line3 + "\\ \\/ /";
            }
            i++;
            if (i === strain2Place) {
                line3 = line3 + msg2 + '\n';
                
            }

        }

        msg1 = 'Dosidos x purple dupain';
        msg2 = 'Dosidos x purple kushy kush dupain';
        totalChar = 122;
        strainsLength = msg1.length + msg2.length;
        crossPlace = ((Math.trunc(128 / 2)) - 3)- msg1.length;
        strain2Place = totalChar - strainsLength;
        let line4;
        spaceLength = totalChar - strainsLength;
        i = 0;
        while (i !== strain2Place) {
            if (i === 0) { line4= '\n' + msg1; }
            line4 = line4 + ' ';
            if (i === crossPlace) {
                line4 = line4 + "/ /\\ \\";
            }
            i++;
            if (i === strain2Place) {
                line4 = line4 + msg2 + '```';
                message.channel.send(line1+line2+line3+line4)
            }

        }

        

    }
};