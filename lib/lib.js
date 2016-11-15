var handlebars= require('handlebars');
var fileExist= require('../fileExist');
var fs= require('fs');
var path= require('path');
var mkdir= require('mkdirp');

var lib=
{
	process: function (config,argv) {
		var templateName= argv.template || argv.t;

		if(!config.hasOwnProperty(templateName))
			throw 'No template definition for '+templateName+' found in ./template/config.js';
		else
		{
			if(config[templateName].hasOwnProperty('files') && Array.isArray(config[templateName].files) )
			{
				config[templateName].files.forEach(function (file) {
					lib.processFile(file,templateName,argv);
				});
				console.log('Done templating');
			}
			else
			{
				console.log('Done templating');
			}
		}
	},

	processFile: function (file,templateName,argv) {

		//check if required properties exist in argv
		if( file.hasOwnProperty('required') && Array.isArray(file.required) )
		{
			//check for required property
			file.required.forEach(function (val) {
				if(!argv.hasOwnProperty(val))
					throw 'Property '+val+' required but not passed as argument'; 
			});
		}

		//check if template path exists
		if(!fileExist(path.resolve('./templates/',file.templatePath)))
		{
			throw 'Template file '+file.templatePath+' not found';
		}

		var templateFile= fs.readFileSync(path.resolve('./templates/',file.templatePath),'UTF8');
		var FileName= lib.template(file.name,argv);
		var FileContent= lib.template(templateFile,argv);
		var DestinationPath= lib.template(file.destinationPath,argv);
		// console.log(DestinationPath);

		//check if the destination file already exists if it exists, then return 0
		if(fileExist(path.resolve(DestinationPath,FileName)))
		{
			return 0;
		}

		mkdir.sync(DestinationPath);
		fs.writeFileSync(path.resolve(DestinationPath,FileName),FileContent,'UTF8');
		return 0;
	},

	template: function (file,obj) {
		return handlebars.compile(file)(obj);
	}
}

module.exports= lib;