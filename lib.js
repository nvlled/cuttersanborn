
// algorithm reference
// https://confluence.cc.lehigh.edu/display/LTSTS/Constructing+Cutter+Numbers

let cutterData = require("./data");

function generateCutter(lastname, firstname, args) {
    let {
        suffix=""
    } = args || {};

    firstname = firstname.toLowerCase().replace(/\W/, "");
    lastname = lastname.toLowerCase().replace(/\W/, "");

    let format = num => {
        let ch = lastname.toUpperCase().slice(0, 1);
        return `${ch}${num}${suffix}`;
    }

    let letters = "abcdefghijklmnopqrstuvwxyz".split("");
    letters = letters.slice(0, letters.indexOf(firstname[0])+1);
    for (let c of letters.reverse()) {
        let key = `${lastname},${c}.`;
        let num = cutterData[key];
        if (num) {
            return format(num);
        }
    }

    let key = lastname;
    while (key) {
        let num = cutterData[key];
        if (num) {
            return format(num);
        }
        key = key.slice(0, key.length-1);
    }
    return "";
}

module.exports = generateCutter;
