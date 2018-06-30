
# cuttersanborn

A Cutter-Sanborn Four-Figure number generator

## CLI installation
Either install through npm:
```
npm install -g cuttersanborn
```
or download a standalone binary.

## CLI usage help
```
options:
    --help
        shows the help

    --file <filename>
        A comma-separated list of names.
        If <filename> is -, then input is read from stdin
                    
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
let generateCutter = await require("cuttersanborn")();
let cutterNum      = await generateCutter(lastname, firstname);

```
Note: the functions return a promise.
