const jwt = require("jsonwebtoken");

exports.authenticateToken = function(req, res, next) {
  console.log("from authenticate token");
  const refreshTokensGlobal = global.refreshTokens;
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER------------", authHeader);
  const accessToken = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.cookies.refreshtoken;
  console.log("received", refreshToken);
  console.log("array", global.refreshTokens);
  if (!accessToken) return res.status(401).send("You don't have access");
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    let newAccessToken;
    let currentUser = user;
    if (err){
      // TODO -> Finalize whether refreshtoken needs to be verified
      if (refreshTokensGlobal.find(token => token === refreshToken)) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.status(401).send("Invalid Token");
          }
          newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
          currentUser = user;
        })
      } else {
        console.log("Expired token");
        return res.status(403).send("Expired token");
      }
    } 
    req.user = currentUser;
    req.token = newAccessToken;
    next();
  });
};

exports.deleteToken = function(req, res, next) {
  console.log("from delete token");
  var refreshTokensGlobal = global.refreshTokens;
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER------------", authHeader);
  const accessToken = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.cookies.refreshtoken;
  console.log("received", refreshToken);
  console.log("array", global.refreshTokens);
  if (!accessToken) return res.status(401).send("Unauthorized Logout");
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err){
      // TODO -> Finalize whether refreshtoken needs to be verified 
      if (refreshTokensGlobal.find(token => token === refreshToken)) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.status(401).send("Unauthorized Logout");
          }
          else{
            refreshTokensGlobal = refreshTokensGlobal.filter(token => token !== refreshToken);
          }
        })
      } else {
        return res.status(403).send("Unauthorized Logout");
      }
    }
    refreshTokensGlobal = refreshTokensGlobal.filter(token => token !== refreshToken); 
    next();
  });
};