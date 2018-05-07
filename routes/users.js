var express = require('express');
var router = express.Router();

/* handler for saving user email */
router.post('/', function(req, res, next) {
  // var insertQuery = 'INSERT INTO users VALUES(NULL,"' + req.body.email + '", "' + req.body.token + '")'
  var selectQuery = "SELECT * FROM users WHERE email = '"+req.body.email+"' ORDER BY email LIMIT 1";
  connection.query(selectQuery, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
      }
      if(results.length>0) {
        console.log('user already exist!');
      }
       else {
        var query = connection.query('INSERT INTO users VALUES(NULL,"' + req.body.email + '", "' + req.body.user_id + '")');
  			res.send({"status": 200, "error": null, "response": results});
  			//If there is no error, all is good and response is 200OK.
	  	}
      console.log(results.length)
  });
});

module.exports = router;
