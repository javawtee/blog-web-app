const express = require("express");
const router = express.Router();
const connection = require("./connector");
const server_session = require("./server_session");
const uuid5 = require("uuid/v5");
const NAMESPACE = "45e669ee-e736-4354-9efc-e1d620b18c69"; // random UUID

router.get("/fetch", (req, res) => {
    // don't need to validate token for every fetch, since isAuthenticated(function in client) does it
    connection.query(`SELECT tweeted_time as time, user_name as userName, tweet as tweetContent FROM tweets ORDER BY tweeted_time DESC`, 
        (err, rows) => {
            if(err) {console.log("fatal error: " + err); throw err;}
            else {
                if(rows.length > 0) res.json({msg:"success", tweets: rows});
                else res.json({msg: "failure", tweets: []});
            }
    })
})

router.post("/add", (req, res) => {
    const {token, tweetContent} = req.body;
    const uid = uuid5(token.name, NAMESPACE); // user_tokenId stored in server
    server_session.validateToken(token.id, uid).then(msg => {
        if(msg === "validated"){
            connection.query(`INSERT INTO tweets(user_name, tweet) VALUES('${token.name}', '${tweetContent}')`, (err, result) => {
                if(err) {console.log("fatal error: " + err); throw err;}
                else {
                    if(result.affectedRows > 0) res.json("success");
                    else res.json("failure");
                }
            })
        } else res.json("invalid");
    })
})

module.exports = router;