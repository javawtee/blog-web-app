const fs = require("fs");

class server_session {
    constructor(){
        this.codes = [], 
        this.onlineUsers = [] // tokens ... {id, uid, expiration}
        this.loadSession = () => {
            fs.readFile("./modules/server_session.json", "utf8", (err, data) => {
                if(err) { 
                    console.log("ERR-loadSession" + err);
                    throw err; // stop server for now
                } else {
                    // data:{date, session:UserManagerInstance}
                    var lastSession = JSON.parse(data).session;
                    if(lastSession !== null){
                        const {codes, passwords} = lastSession;
                        this.codes = codes;
                    }
                }
            })
        };
        this.loadSession();
        this.writeSession = () => {
            const {codes} = this;
            const session = {codes};
            fs.writeFile("./modules/server_session.json", JSON.stringify({session}), err => {
                if(err) console.log("ERR-writeSession: " + err);
            })
        }
    }

    addCode(user){
        delete user.name;
        delete user.openCodeDialog;
        delete user.codeEntered;
        this.codes.push(user);
        this.writeSession();
    }

    getIndex(user){
        return this.codes.findIndex(code => code.ip === user.ip && code.time === user.time && code.email === user.email);
    }

    codeExists(user){
        return this.getIndex(user) > -1;
    }

    verifyCode(user){
        return new Promise(resolve => {
            if(this.codeExists(user) && this.codes[this.getIndex(user)].code === user.code) resolve("verified");
            else resolve("not-verified")
        })
    }

    removeCode(user){
        return new Promise(resolve => {
            if(this.codeExists(user)) {
                const id = this.getIndex(user);
                this.codes.splice(id, 1);
                this.writeSession();
                resolve("success");
            }
            else resolve("failure")
        })
    }

    addOnlineUser(user){
        return new Promise(resolve => {
            const exists = this.onlineUsers.findIndex(online => online.id === user.id) > -1;
            if(!exists) {
                this.onlineUsers.push(user); 
                resolve("success");
            } else {
                // check whether account is logged in another device
                resolve("is-logged-in");
            }
        })
    }

    removeOnlineUser(tokenId, uid){
        return new Promise(resolve => {
            const refId = this.onlineUsers.findIndex(online => online.id === tokenId && online.uid === uid);
            if(refId > -1){ // token found
                this.onlineUsers.splice(refId, 1);
                resolve("success");
            } else resolve("exception")
        })
    }

    validateToken(tokenId, uid){
        return new Promise(resolve => {
            const refId = this.onlineUsers.findIndex(online => online.id === tokenId && online.uid === uid);
            if(refId > -1) { // token found
                const token = this.onlineUsers[refId];
                const expired = (new Date()).getTime() - token.expiration >= 0;
                if(expired) {
                    // remove expired token
                    this.onlineUsers.splice(refId, 1);
                    resolve("expired");
                }
                else {
                    resolve("validated");
                }
            } else resolve("failed-to-validate");
        })
    }
}

module.exports = new server_session();