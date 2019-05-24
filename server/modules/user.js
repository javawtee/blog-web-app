const express = require("express");
const router = express.Router();
const connection = require("./connector");
const server_session = require("./server_session");
const uuid5 = require("uuid/v5");
const NAMESPACE = "45e669ee-e736-4354-9efc-e1d620b18c69"; // random UUID

const gererateRandomCode = (codeLength,cb) => {
    var code = '' , i = 0;
    for(i; i < codeLength; i++){
        const randomNumber = Math.floor(Math.random() * Math.floor(10));
        if(i === 0 && randomNumber === 0){
            i--;
            continue;
        }
        code = code.concat(randomNumber);
    }
    cb(code);
}

router.post("/sign-up/first", (req, res) => {
    const user = req.body;
    connection.query(`SELECT COUNT(id) AS count FROM users WHERE name='${user.name}' OR email='${user.email}'`, (err, result) => {
        if(err) {console.log("fatal error: " + err); res.json("failure"); throw err;}
        else {
            if(result[0].count > 0) res.json("invalid");
            else {
                // --- valid name and email ---
                // generate code
                gererateRandomCode(6, code => {
                    // store in server_session for user to verify code
                    user.code = code;
                    server_session.addCode(user);
                    // send to email
                    require('./mailer')(user.email, `My Blog Site: Verification code`,
                    `Enter this code to verify your email: ${code}<br/>
                    Best regards,<br/>
                    T.`).then(() => res.json("success")).catch(() => res.json("failure"));
                });
            }
        }
    })
})

router.post("/sign-up/verify", (req,res) => {
    const user = req.body;
    server_session.verifyCode(user).then(msg => {
        res.json(msg)
    })
})

router.post("/sign-up/cancel", (req, res) => {
    const user = req.body;
    server_session.removeCode(user).then(msg => res.json(msg))
})

router.post("/sign-up/final", (req,res) => {
    const user = req.body;
    connection.query(`INSERT INTO users(name,email,password) VALUES('${user.name}', '${user.email}', '${user.password}')`, (err, result) => {
        if(err) {console.log("fatal error: " + err); res.json("failure");throw err;}
        else {
            if(result.affectedRows > 0) { 
                server_session.removeCode(user); 
                res.json("success"); 
            } else res.json("failure");
        }
    })
})

router.post("/login", (req, res) => {
    const {email, password, ip, keepLoggedIn} = req.body;
    connection.query(`SELECT name FROM users WHERE email='${email}' AND password= BINARY '${password}'`, (err, result) => {
        if(err) {console.log("fatal error: " + err); res.json({msg:"failure"}); throw err;}
        else {
            if(result.length > 0) {
                if(password.length < 6) return res.json({msg:"success"})
                const userName = result[0].name;
                const uid = uuid5(userName, NAMESPACE); // user_tokenId stored in server
                const id = uuid5(ip, uid); // simple server_tokenId stored in client
                var expiration = (new Date()).getTime();
                // simple persistent login example; persistent login for 30 minutes; if not, for 5 minutes 
                expiration += keepLoggedIn ? 30 * 60 * 1000 : 5 * 60 * 1000;
                server_session.addOnlineUser({id, uid, expiration}).then(msg => {
                    res.json({msg,token:{id, name: userName}});
                })
            }
            else res.json({msg:"failure"});
        }
    })
})

router.post("/logout", (req, res) => {
    const {tokenId, userName} = req.body;
    const uid = uuid5(userName, NAMESPACE); // user_tokenId stored in server
    server_session.removeOnlineUser(tokenId, uid).then(msg => res.json(msg))
})

router.post("/validate-token", (req, res) => {
    const {tokenId, userName} = req.body;
    const uid = uuid5(userName, NAMESPACE); // user_tokenId stored in server
    server_session.validateToken(tokenId, uid).then(msg => res.json(msg))
})

router.post("/forgot-password", (req, res) => {
    const email = req.body.email;
    // generate new random password/code of length less than 6 to require user change to new password
    gererateRandomCode(5, code => {
        // check if email exists in database
        connection.query(`SELECT COUNT(id) AS count FROM users WHERE email='${email}'`, (err, result) => {
            if(err) {console.log("fatal error: " + err); throw err;}
            else {
                if(result[0].count > 0) {
                    connection.query(`UPDATE users SET password='${code}' WHERE email='${email}'`, (err, result2) => {
                        if(err) {console.log("fatal error: " + err); res.json("failure"); throw err;}
                        else if(result2.affectedRows > 0) {
                            // send to email
                            require('./mailer')(email, `My Blog Site: Verification code`,
                            `Use this code to login : ${code}<br/>
                            Best regards,<br/>
                            T.`).then(() => res.json("success")).catch(() => res.json("failure"));
                        } else res.json("failure")
                    })
                }
                else res.json("invalid");
            }
        })
    });
})

router.post("/update-password", (req, res) => {
    const {email, password} = req.body;
    connection.query(`UPDATE users SET password='${password}' WHERE email='${email}'`, (err, result) => {
        if(err) {console.log("fatal error: " + err); res.json("failure"); throw err;}
        else if(result.affectedRows > 0) res.json("success");
        else res.json("failure")    
    })
})

router.get("/sign-up/codes", (req,res) => {
    res.send(server_session.codes);
})

router.get("/online/users", (req,res) => {
    res.send(server_session.onlineUsers);
})

module.exports = router;

