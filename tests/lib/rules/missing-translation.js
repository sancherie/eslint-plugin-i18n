/**
 * @fileoverview Find the unresolved translations
 * @author sancherie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/missing-translation"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("missing-translation", rule, {

    valid: [
        {
            code: '$t(\'foo.bar\')',
        },{
            code: 'this.$t(\'foo.bar\')',
        }
    ],

    invalid: [
        {
            code: '$t(\'hello.world\')',
            errors: [{
                message: 'Unresolved translation key: hello.world',
                type: 'ExpressionStatement'
            }]
        },{
            code: 'this.$t(\'hello.world\')',
            errors: [{
                message: 'Unresolved translation key: hello.world',
                type: 'ExpressionStatement'
            }]
        }
    ]
});
