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

module.exports = {
    isTranslationCall,
    getTranslationKey,
}
