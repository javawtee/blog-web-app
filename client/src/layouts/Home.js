import React, { Component } from 'react'

export class Home extends Component {
  componentDidMount(){
    const signupSession = sessionStorage.getItem("signup");
    if(signupSession){
      const session = JSON.parse(signupSession);
      if(session.openCodeDialog || session.codeEntered) window.location.href = "/sign-up"
      else sessionStorage.removeItem("signup");
    }
  }
  render() {
    return (
      <div className="container home-container">
        <div className="row">
            <div className="col text-center"><h1>WELCOME TO <b>MY BLOG SITE</b></h1></div>
        </div>
        <div className="row">
            <div className="col text-center">
                <a href="/sign-up">Sign up</a>
            </div>
        </div>
        <div className="row">
            <div className="col text-center">
                <a href="login">Login</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Home
