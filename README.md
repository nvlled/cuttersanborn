
# cuttersanborn

A Cutter-Sanborn Four-Figure number generator

## CLI installation
Either install through npm:
```
npm install -g cuttersanborn
```
or [download a standalone binary](https://github.com/nvlled/cuttersandborn/releases) (note: it's large)

## CLI usage help
```
options:
    --help
        shows the help

    --file <filename>
        A comma-separated list of names: 
        lastname1, firstname1
        lastname2, firstname2
        lastname3,firstname3
        ...
                    
    --outputname
        Shows the name in output

    --name=lastname,firstname
```

### Example usage
```
$ cuttersanborn --name=Adams,John --name=Gabel,Linda --name="Andrews, Mary Helen"
A214
A216
M393

$ cuttersanborn --outputName --name=Adams,John --name=Gabel,Linda
Adams,John A214
Gabel,Linda A216

```


## Npm installation and usage
Install on npm:
```
$npm install --save cuttersanborn
```

Then require/import in your code:
```
let generateCutter = require("cuttersanborn")();
let cutterNum      = generateCutter(lastname, firstname);

```
Note: the functions return a promise.

## Related Links
[OCLC Dewey Cutter Program](https://www.oclc.org/support/services/dewey/program.en.html)
This is a windows GUI program, so it was hard to use programmatically.

