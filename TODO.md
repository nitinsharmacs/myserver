## TODO

- [ ] implement response to create multiple headers of same header name
  - [ ] for eg, Set-Cookie
- [ ] Handle request when body is big
- [ ] remove the file url path dependancy from serveFile
- [ ] MyServer as an entity
- [ ] Implement fallback request
- [ ] Make a Request entity
- [ ] implement redirect method on reponse
- [ ] Don't pass router to server. Server should have router

## DONE

- [x] don't lowercase header values
- [x] Implement body parser
  - [x] x-www-form-urlencoded
  - [x] application/json
- [x]~~Make your own query parser, don't use URLSearchParams~~
- [x] ~~Rename serveFile to static~~
  - [x] ~~static should return controller as closure~~
- [x] Query parser
- [x] redirect method in Response
- [x] Implement route handler without any endpoint
- [x] make router working with multiple handlers
  - [x] Route entity
    - [x] next method for next action
  - [x] control should go to next handler unless reponse is sent
- [x] serve static files
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
