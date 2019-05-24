# My Blog Site - installation guide

Basic requirements: 
- Installation of Node.js: https://nodejs.org/en/download/
- Installation of XAMPP: https://www.apachefriends.org/index.html
- Basic knowledge of command-line interface

I) Setup client and server hosts
  1. Open cmd (Windows) or terminal (Linux-based OS)
  2. Clone repository to local machine
    - Put command: <b>git clone https://github.com/javawtee/blog-web-app.git</b>
  3. Put command to redirect to repository that has been recently cloned to your local machine
  4. Go to 'client' directory
  5. Put command: <b>npm i</b>
  6. Repeat step 4,5 but with 'server' directory
  
II) Setup database
  1. Open XAMPP (if not installed, here is <a href="https://www.apachefriends.org/index.html">download link</a>)
  2. On XAMPP window, look for modules Apache and MySQL and click Start (Actions column) for both modules
  3. Open any web browser, type in: <a href="localhost">localhost</a> or <a href="127.0.0.1">127.0.0.1</a>; then, you should see XAMPP home page
  4. On the top right corner of the page, click phpMyAdmin
  5. Look for SQL tab and click on it; then, there should be a text area appears
  6. In repository, there should be a folder named 'schema'. Go into it and open 'myblogsite.sql'
  7. Copy all content in 'myblogsite.sql' file and paste to the text area in step 5
  8. On the bottom right corner, click Perform
  
III) Run client and server hosts <br/>
  <i>Assumed XAMPP is running (follow step 1 and 2 in <b>II- Setup database)</b></i>
  1. Open cmd (Windows) or terminal (Linux-based OS)
  2. Go to 'server' directory, and put command: <b>npm start</b> <br/>
      If successfully started server host, shell should show: <i> Welcome to Express JS. You are connected </i>
  3. Open another cmd or terminal
  4. Repeat step 2, but with 'client' directory <br/>
      If successfully started client host, shell should show: <i> Compiled successfully </i> <br/>
      Then, web browser should automatically open a tab with url <a href="localhost:3000">localhost:3000</a> <br/>
 
 If there is any issue during setup or using application, please feel free to contact me at <a href="mailto:javawtee@gmail.com">javawtee@gmail.com</a>
