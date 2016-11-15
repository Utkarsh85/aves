#!/usr/bin/env node
var argv = require('yargs').argv;
var fileExist= require('./fileExist');
var lib= require('./lib/lib');

// console.log(argv);

if( !(argv.template || argv.t) )
{
	throw 'No template provided.';
}

else
{
	if(fileExist('./templates/config.js'))
	{
		var config= require('./templates/config.js');

		lib.process(config,argv);
	}
	else
	{
		throw 'No config.js file found at templates/config.js';
	}
}