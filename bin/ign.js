#! /usr/bin/env node

var program = require('commander');
var path = require('path');
var fs = require('fs');
var prompt = require('prompt'); 


program
  .version('0.0.1')

program
  .command('create')
  .description('İgnore file created')
  .action(function(){
		 fs.writeFile(path.resolve(process.cwd())+'/.gitignore', '', function(err) {
          if(err) {
              console.log(err);
          } else {
              console.log("Gitignore file created");
          }
      }); 
});

program
  .command('apply')
  .description('Cache ignore file apply')
  .action(function(){
		
		if (fs.existsSync(process.env.HOME+'/.igncache')) {
		   var cache =fs.readFileSync(process.env.HOME+'/.igncache','utf8');
			if(cache ==	""){
				console.log('Cache file edit!');
			}else{
			fs.writeFile(path.resolve(process.cwd())+'/.gitignore', cache, function(err) {
		          if(err) {
		              console.log(err);
		          } else {
		              console.log("Gitignore file apply");
		          }
		      }); 

			}
		}else{
			console.log('ign [cache] command!');
		}
});

program
  .command('add')
  .description('Add ignore file name')
  .action(function(){
   		if (fs.existsSync(path.resolve(process.cwd())+'/.gitignore')) {
   		 prompt.get([{name: 'name',required: true,description: 'File Name?'}], function (err, result) { 

   			fs.open(path.resolve(process.cwd())+'/.gitignore', 'a', 0666, function(err, fd){
   					fs.write(fd, result.name+"\n", null, undefined, function (err, written) {
					  console.log('Added file name');
					});
			});

   		  });
   		}else{
   			console.log('ign [create] command!');
   		}
  
		
});

program
  .command('delete')
  .description('Delete ignore file')
  .action(function(){

  	fs.unlink(path.resolve(process.cwd())+'/.gitignore', function (err) {
	  if (err) throw err;
	  console.log('Gitignore file deleted.');
	});
		
});

program
  .command('cache')
  .description('Cache file created')
  .action(function(){

		fs.writeFile(process.env.HOME+'/.igncache', '', function(err) {
          if(err) {
              console.log(err);
          } else {
              console.log("Cache file created..  >  "+ process.env.HOME+"/.igncache");
          }
      }); 
});

program
  .command('*')
  .action(function(env){
    console.log('Bilinmeyen komut!');
    
});

program.parse(process.argv);