const chai = require("chai");
const trailingZerosFn = require("../4 kyu Trailing zeros in factorials, in any given integer base.js");
const assert = chai.assert;

describe("Tests",function() {

    it("Simple test", function(){
        assert.strictEqual(trailingZerosFn(15, 10),3, "Incorrect");
        assert.strictEqual(trailingZerosFn(7, 2),4, 'Incorrect');
    });

    it("Hard one",function(){
        assert.strictEqual(trailingZerosFn(685835283661262, 2484008889),25677316, 'Incorrect');
        assert.strictEqual(trailingZerosFn(4553696352741090, 1780437961),181591530, 'Incorrect');
        assert.strictEqual(trailingZerosFn(5517078280973720, 1555212289),97851766182, 'Incorrect');
    });

});