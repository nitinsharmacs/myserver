## TODO

<<<<<<< HEAD
=======
- [ ] Serve files
- [ ] Make server entity
- [ ] Create a fallback route when non uri matches
>>>>>>> main
- [ ] Don't pass router to server. Server should have router

## DONE

<<<<<<< HEAD
- [x] serve static files
=======
- [x] Server shouldn't end the socket. Route handler should do it
>>>>>>> main
- [x] Implement methods in Response class
  - [x] send : sending text/plain
  - [x] json : sending application/json
  - [x] sendHtml : send html files text/html
- [x] Introduce http request
  - [x] parse request
- [x] Implement myServer function with followings
  - [x] Server takes router
  - [x] Router should get request and response entity
- [x] Introduce router
- [x] Create simple server with socket, without any http request
