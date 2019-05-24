# My Blog Site
<h6>A web application of blogging</h6>
<hr/>

DEMO link: <a href="http://52.23.242.183:3000">www.ec2-52-23-242-183.compute-1.amazonaws.com</a>

<h3> Features </h3>
  <ul>
    <li> User can sign up for an account </li>
      <ul>
        <li>Sign up will have email verfication. Server will send a code to email and user has to get that code to continue sign up</li>
      </ul>
  <li> User can login with an account </li>
    <ul>
        <li> There will be an option to keep user logged in every time user accesses to the website. For testing purpose, I put only 30 minutes </li>
        <li> There will be an alert if user's account is logged in another device </li>
    </ul>
  <li> User can reset password with forgot-password option </li>
    <ul>
      <li> Server will send a new temporary password/ code to user's email </li>
      <li> Once users login with it, they will be prompted to update their password </li>
    </ul>
  <li> User can view other users' blogs/ tweets </li>
    <ul>
      <li> Blogs/ tweets are displayed vertically in order of posted time (latest to oldest) </li>
    <li> Every blog/ tweet will consist of other users' profile picture (not implemented), name, elapsed time from the posted time and content </li>
    </ul>
  <li> User can post/ tweet a new blog/ tweet </li>
    <ul>
      <li> If user is working on content, he/ she will be prompted to confirm to leave </li>
      <li> Content is limited in 1000 characters </li>
      <li> After successfully posted, user can see the recently posted blog/ tweet on top of other users' ones </li>
    </ul>
  </ul>

<h3>Documentations</h3>
  <ol>
    <li> <a href="https://docs.google.com/document/d/1YNi9C5Pp1VYKzVq4rx9rBvnKx9T9Ejw9AvqHkJcPN-w/edit?usp=sharing">Installation guide</a> </li>
    <li> <a href="https://drive.google.com/file/d/1wTqGqdJ2qziZyp5WLy1WcIzy7hEZWL2t/view?usp=sharing">Design documentation</a></li>
  </ol>
  
<h3>Using:</h3>
<ol>
  <li> Bootstrap 4 </li>
  <li> Material-UI </li>
  <li> ReactJS </li>
  <li> Node.js </li>
  <li> Express.js </li>
  <li> Redux </li>
  <li> MySQL </li>
  <li> Other packages
    <ul>
      <li> nodemon </li>
      <li> ip </li>
      <li> zxcvbn </li>
      <li> nodemailer </li>
      <li> uuid </li>
    </ul>
  </li>
</ol>
  
<h3>Issue</h3>
If there is any issue, please feel free to <a href="mailto:javawtee@gmail.com">contact me</a>
