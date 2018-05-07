var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  connection.query('SELECT * from bookmark WHERE user_id = "' + res.body.user_id + '"', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send({"status": 200, "error": null, "response": results});
  			//If there is no error, all is good and response is 200OK.
	  	}
      console.log(res.body)
      console.log(req.body)
  });
});



module.exports = router;
