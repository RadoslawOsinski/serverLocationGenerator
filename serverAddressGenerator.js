#!/usr/bin/jjs -fv
if(arguments.length === 0){
    print("Hint: no parameters specified, invoke with serverAddressGenerator.js [dev|prod]");
}

var configurationType = arguments[0];
print('configurationType: ' + configurationType);

var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var JString = Java.type("java.lang.String");
generateServerAddress(configurationType);

function generateServerAddress(configurationType) {
    var content = generateJSCode(configurationType);
    write(content, './output/backendServerLocation.js');
}

function generateJSCode(configurationType) {
    var output = '';
    if (configurationType === 'prod') {
        output = 'var serverLocation = \'http://host.domain.eu\';';
    } else {
        output = 'var serverLocation = \'http://localhost:8080\';';
    }
    print('Output: ' + output);
    return output;
}

function write(content, filePath) {
    Files.write(Paths.get(filePath), new JString(content).bytes);
}
