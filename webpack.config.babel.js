import path from 'path';
import fs from 'fs';
module.exports = {
	entry: getModuleEntry("./target"), 
	entry: {
	   	  main:"./target/page/index.js"
	      },
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/public/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	}
};
 
function getModuleEntry(srcDir){
	var files=[];
	var getFiles=function(srcDir,files){
		var matchs = [];
		if(/.*?(.js|.cs|.tpl)$/.test(srcDir)){
    		return;
  		}
		var dirs = fs.readdirSync(srcDir); 
		dirs.forEach(function (item) { 
  			var temp;
    		matchs = item.match(/^index.js$/); 
    		temp=path.resolve(srcDir, item); 
    		if (matchs) { 
    		  files.push(temp); 
   	 		}else{
    			var stat = fs.statSync(srcDir);
    			if(stat.isDirectory()){
    				getFiles(path.resolve(srcDir, item),files);
    			}
    		} 
  		});
	} 
	getFiles(srcDir,files)
	// console.log(files);
	 return files;
 } 