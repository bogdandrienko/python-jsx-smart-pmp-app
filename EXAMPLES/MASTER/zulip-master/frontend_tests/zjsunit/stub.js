"use strict";

const {strict: assert} = require("assert");

// Stubs don't do any magical modifications to your namespace.  They
// just provide you a function that records what arguments get passed
// to it.  To use stubs as something more like "spies," use something
// like set_global() to override your namespace.

exports.make_stub = function () {
    const self = {};
    self.num_calls = 0;

    self.f = function (...args) {
        self.last_call_args = args;
        self.num_calls += 1;
        return true;
    };

    self.get_args = function (...param_names) {
        const result = {};

        for (const [i, name] of param_names.entries()) {
            result[name] = self.last_call_args[i];
        }

        return result;
    };

    return self;
};

exports.with_stub = function (f) {
    const stub = exports.make_stub();
    f(stub);
    assert.equal(stub.num_calls, 1);
};

(function test_ourselves() {
    exports.with_stub((stub) => {
        stub.f("blue", 42);
        const args = stub.get_args("color", "n");
        assert.equal(args.color, "blue");
        assert.equal(args.n, 42);
    });
})();
