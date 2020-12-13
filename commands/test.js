const { url } = require('../helpers');

module.exports = {
    name: 'test',
    description: 'test',
    execute(message) {

        let msg1 = 'slip de bain';
    let msg2 = 'Ploupi';
    
    let line1;
    let totalChar = 170;
    let nbr = totalChar - msg1.length;
    let lineNbr = 170 - nbr;
    let i = 0;

    while (i !== lineNbr) {
        if (i === 0) { line1 = ' '; }
        line1 = line1 + ' ';
        if (i === Math.trunc(lineNbr / 2)) {
            line1 = line1 + msg1;
        }
        i++;
    }

    totalChar = 164;
    let nbr1 = msg1.length + msg2.length;
    let nbr2 = totalChar - msg2.length;
    let line2;
    lineNbr = totalChar - nbr1;
    i = 0;
    while (i !== lineNbr) {
        if (i === 0) { line2 = '\n'+ msg1; }
        line2 = line2 + ' ';
        if (i === Math.trunc(lineNbr / 2)) {
            line2 = line2 + '__  __';
        }
        i++;
        if (i === lineNbr) {
            line2 = line2 + msg2;
            message.channel.send(line1 + line2);
        }

    }

    }
};