Uglify = {};

Uglify.compress = (function(){
load("steal/build/scripts/uglify/parse-js.js");
load("steal/build/scripts/uglify/process.js");
	var jsp = Uglify.Parser,
		pro = Uglify.Process,
	    slice = jsp.slice,
	    member = jsp.member,
	    PRECEDENCE = jsp.PRECEDENCE,
	    OPERATORS = jsp.OPERATORS;

function ast_squeeze_more(ast) {
        var w = pro.ast_walker(), walk = w.walk;
        return w.with_walkers({
                "call": function(expr, args) {
                        if (expr[0] == "dot" && expr[2] == "toString" && args.length == 0) {
                                // foo.toString()  ==>  foo+""
                                return [ "binary", "+", expr[1], [ "string", "" ]];
                        }
                }
        }, function() {
                return walk(ast);
        });
};


// stuff i added

    //Add .reduce to Rhino so UglifyJS can run in Rhino,
    //inspired by https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
    //but rewritten for brevity, and to be good enough for use by UglifyJS.
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (fn /*, initialValue */) {
            var i = 0,
                length = this.length,
                accumulator;

            if (arguments.length >= 2) {
                accumulator = arguments[1];
            } else {
                do {
                    if (i in this) {
                        accumulator = this[i++];
                        break;
                    }
                }
                while (true);
            }

            for (; i < length; i++) {
                if (i in this) {
                    accumulator = fn.call(undefined, accumulator, this[i], i, this);
                }
            }

            return accumulator;
        };
    }

function compress(code) {
//	var orig_code = "... JS code here";
//var ast = jsp.parse(orig_code); // parse code and get the initial AST
//ast = pro.ast_mangle(ast); // get a new AST with mangled names
//ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
//var final_code = pro.gen_code(ast); // compressed code here
	
	var ast = jsp.parse(code);
	print("parsed")
	ast = pro.ast_mangle(ast);
	print("mangled")
//	ast = pro.ast_squeeze(ast, {no_warnings: true/*, extra: true*/});
	print("squeezed")
//        ast = ast_squeeze_more(ast);
	return pro.gen_code(ast);
};
return compress;
})()
