#!/usr/bin/env node

const process = require("process");
const {basename} = require("path");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

function showHelp(progname) {
    console.log("A Cutter-Sanborn Four-Figure number generator");
    console.log(`
options:
    --help
        shows the help

    --file <filename>
        A comma-separated list of names.
        If <filename> is -, then input is read from stdin

    --outputname
        Shows the name in output

    --name=lastname,firstname

examples:
    cuttersanborn --name=Adams,John --name=Gabel,Linda --name="Andrews, Mary Helen"
    cuttersanborn --outputName --name=Adams,John --name=Gabel,Linda
    cuttersanborn --outputName --file sample.txt
`);
}

async function main() {
    let generateCutter = require("./lib");
    let progname = basename(process.argv[1]);
    let args = require("minimist")(process.argv.slice(2));

    if (args.help) {
        showHelp(progname);
        process.exit(2);
    }

    let parseNameStr = str => {
        if (typeof str != "string") {
            console.error(`** name must be a string: ${str}`);
            return null;
        }
        if (!str.trim()) {
            return null;
        }

        let [lname, fname] = str.split(",").map(s => s.trim());
        if (lname && fname)
            return {lname, fname};

        console.error(`** ignoring invalid name: ${str}`);
        return null;
    }

    let names = [];

    if (args.file) {
        try {
            let contents = await fs.readFileAsync(args.file, "utf-8");
            names = contents.split("\n").map(parseNameStr);
            names = names.filter(o=>o); // remove nulls
        } catch (e) {
            console.error(`** failed to read file: ${args.file}`);
            process.exit(1);
        }
    }

    if (Array.isArray(args.name)) {
        let names_ = args.name.map(parseNameStr).filter(o=>o);
        names = names.concat(names_);
    } else if (typeof args.name == "string") {
        let obj = parseNameStr(args.name);
        if (obj)
            names = names.concat([obj]);
    }

    if (names.length == 0) {
        showHelp(progname);
        process.exit(2);
    }

    for (let {lname, fname} of names) {
        let cutterNum = generateCutter(lname, fname)
        if (!cutterNum) {
            console.error(`** failed to generate number for ${lname},${fname}`);
        } else {
            let output;
            if (args.outputname) {
                output = `${lname},${fname} ${cutterNum}`;
            } else {
                output = cutterNum;
            }
            console.log(output);
        }
    }
}

main();
