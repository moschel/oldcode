// testing out uglify compressor
// js steal/build/scripts/uglify/test/run.js
(function(){
	print("testing uglify")
	print("***before***")
	var file = readFile("steal/build/scripts/uglify/test/basicsource.js")
	print(file)
	print("***after***")
	load("steal/build/scripts/uglify/squeeze-more.js")
	var compressed = Uglify.compress(file);
	print(compressed)
})()
