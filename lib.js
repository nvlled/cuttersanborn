
// algorithm reference
// https://confluence.cc.lehigh.edu/display/LTSTS/Constructing+Cutter+Numbers

const baseURL = "http://203.241.185.12/asd/board/Author/upfile";

const cheerio = require("cheerio");
const request = require("request-promise");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const {isAbsolute: isAbsolutePath} = require("path");

const config = {
    dir: {
        output: __dirname,
        cache: __dirname+"/cache",
    },
}

const util = {
    // recursive mkdir
    async mkdir(dir) {
        for (let subdir of util.subpaths(dir)) {
            try {
                await fs.mkdirAsync(subdir)
            } catch(e) {
                /* ignore */
            }
        }
    },

    // subpaths('a/b/c') == ['a', 'a/b', 'a/b/c']
    subpaths(dir) {
        let {join: joinPath} = require("path");
        let paths = [];
        let path = isAbsolutePath(dir) ? "/" : "";
        for (let p of dir.split(/\/+/)) {
            path = joinPath(path, p);
            paths.push(path);
        }
        return paths;
    },
}

async function fetch(path) {
    await util.mkdir(config.dir.cache);
    let cachefile = `${config.dir.cache}/${path}`;
    try {
        return await fs.readFileAsync(cachefile, "utf-8");
    } catch (e) {
        let url = `${baseURL}/${path}`;
        console.log("fetching ", url);
        let html = await request.get(url);

        await fs.writeFileAsync(cachefile, html);
        return html;
    }
}

async function scrapeLinks() {
    let html = await fetch("abcd.htm");
    let $ = cheerio.load(html);
    let navLinks = [];
    $("table a").each(function(i, a) {
        navLinks.push($(a).attr("href"));
    });

    return navLinks;
}

async function scrape() {
    let navLinks = await scrapeLinks();
    let index = {}
    for (let link of navLinks) {
        let html = await fetch(link);
        let $ = cheerio.load(html);
        $("pre").each(function(i, pre) {
            let lines = $(pre).text().split(/\n+/);
            for (let line of lines) {
                let fields = line.trim().split(/\s+/);
                let pref = fields.slice(1, 3).join("").toLowerCase();
                if (pref) {
                    index[pref] = fields[0];
                    console.log(pref, "=>", fields[0]);
                }
            }
        });
    }
    return index;
}

async function readCutterIndex() {
    let filename = `${config.dir.output}/cutter-data.json`;
    try {
        let str = await fs.readFileAsync(filename, "utf8");
        return JSON.parse(str);
    } catch (e) {
        console.log(e);
        let index = await scrape();
        await fs.writeFileAsync(filename, JSON.stringify(index, null, 4));
        return index;
    }
}

async function generateCutter(firstname, lastname, args) {
    let {
        index,
        suffix=""
    } = args || {};

    firstname = firstname.toLowerCase().replace(/\W/, "");
    lastname = lastname.toLowerCase().replace(/\W/, "");

    if (index == null)
        index = await scrape();

    let format = num => {
        let ch = lastname.toUpperCase().slice(0, 1);
        return `${ch}${num}${suffix}`;
    }

    let letters = "abcdefghijklmnopqrstuvwxyz".split("");
    letters = letters.slice(0, letters.indexOf(firstname[0])+1);
    for (let c of letters.reverse()) {
        let key = `${lastname},${c}.`;
        let num = index[key];
        if (num) {
            return format(num);
        }
    }

    let key = lastname;
    while (key) {
        let num = index[key];
        if (num) {
            return format(num);
        }
        key = key.slice(0, key.length-1);
    }
    return "";
}

async function load() {
    let index = await readCutterIndex();
    return (fname, lname) => generateCutter(fname, lname, {index});
}

module.exports = load;
