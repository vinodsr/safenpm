#!/usr/bin/env node
var jsonfile = require('jsonfile')
var file = 'package.json'
console.log("safe npm");
console.log("detecting packages to install ....");
var packagesToInstall = [];
jsonfile.readFile(file, function(err, obj) {
	if(err) {
		console.error("unable to read package.json");
		process.exit(-1);
	}
	for (module in obj.dependencies) {
		console.log("module : " , module );
		packagesToInstall.push(module+"@"+ obj.dependencies[module]);
		break;
		
	}
	for (module in obj.devDependencies) {
		console.log("module : " , module );
		packagesToInstall.push(module+"@"+ obj.devDependencies[module]);
		break;
	}
  })
console.log("installing using npm ...");
  var npm = require('npm');
  npm.load(function(err) {
    // handle errors

      // install module ffi
        npm.commands.install(packagesToInstall, function(er, data) {
			if(er) {
				 console.error("NPM error : " + er );
			} else {
				console.log("installation finished");
			}
	      });

	        npm.on('log', function(message) {
		    // log installation progress
		        console.log(message);
			  });
			   
			  });
