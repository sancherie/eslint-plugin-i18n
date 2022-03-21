"use strict";

module.exports = {

}
const isTranslationFunction = function(node) {
    return node.callee.name === '$t'
        && node.arguments.length === 1
        && node.arguments[0].type === 'Literal';
}

const isTranslationMethod = function(node) {
    return node.callee.type === 'MemberExpression'
        && node.callee.property.type === 'Identifier'
        && node.callee.property.name === '$t'
        && node.arguments[0].type === 'Literal'
}

const isTranslationCall = function (node) {
    return isTranslationFunction(node) || isTranslationMethod(node);
}

const getTranslationKey = function(node) {
    return node.arguments[0].value;
}

const match = function (wildcard, str) {
    let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape
    const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
    return re.test(str); // remove last 'i' above to have case sensitive
}

module.exports = {
    isTranslationCall,
    getTranslationKey,
    match,
}
