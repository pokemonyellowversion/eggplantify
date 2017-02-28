var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

module.exports.createToken = function(user, res) {
  var token = jwt.sign(
    {user: user},
    SECRET,
    {expiresIn: '24h'}
  );
  res.set('Authorization', token);

  return token;
}

// Export a middleware function that checks if there
// is a user's _id in the session and, if there is,
// fetch the user from the db and add to the req.
module.exports.verifyToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.get('Authorization');
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, function(err, decoded) { //returns decoded payload
      if (!err) {
        req.user = decoded.user;
        module.exports.createToken(decoded.user, res);
        next();
      }
    });
  } else {
    next();
  }
}