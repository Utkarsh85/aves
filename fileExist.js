var fs= require('fs');

var fileExist= function (path) {
	try 
	{
	    fs.accessSync(path, fs.F_OK);
	} 
	catch (e) 
	{
	    return false;
	}

    return true;
}

module.exports= fileExist;