var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ', //omit 0,O,I,l to avoid confusion
    base = alphabet.length;
    
function encode(num) {  //base10 int to base58 string
    var encoded = '';
    while (num) {
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}

function decode(str) {  //base58 string to base10 int
    var decoded = 0;
    while (str){
        var index = alphabet.indexOf(str[0]);
        var power = str.length -1;
        decoded += index * (Math.pow(base, power));
        str = str.substring(1);
    }
    return decoded;
}

//export functions
module.exports.encode = encode;
module.exports.decode = decode;