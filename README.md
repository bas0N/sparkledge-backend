# sparkledge-backend api

#### Endpoints that require user to be logged (JWT token provided) ####
  -------------------------------------------------------------
- /[register](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#register)
  - [Register a user](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#register-a-user)
    - / `POST` path: /register/
  - [Verify Email](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#verify-email) 
    - / `GET` path: register/verify/:token
- /[auth](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#log-in-the-user)
  - [Log in the user](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#log-in-the-user)
    - /`POST` path: /auth/
- /[refresh](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#refresh)
  - [Refresh access token](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#refreshes-access-token)
    - /`GET` path: /refresh/
- /[logout](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#logout)
  - [Logout the user](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#logout-the-user) 
    - /`GET` path: /logout/
- /[infrastructure](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#infrastructure)
  - [Get universities](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#get-universities)
    - /`POST` path: infrastructure/university/
  - [Get faculties](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#get-faculties)
    - /`POST` path: infrastructure/faculty/
  - [Get programmes](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#get-programmes)
    - /`POST` path: infrastructure/programme/
  - [Get courses](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#get-courses)
    - /`POST` path: infrastructure/course/
  - [Add university](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#add-university)
    - /`POST` path: infrastructure/university/new
  - [Add faculty](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#add-faculty)
    - /`POST` path: infrastructure/faculty/new
  - [Add programme](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#add-programme)
    - /`POST` path: infrastructure/programme/new
  - [Add course](https://github.com/bas0N/sparkledge-backend/edit/main/README.md#add-course)
    - /`POST` path: infrastructure/course/new
- /forgot-password
  #### Do not require user to be logged (JWT token provided) ####
  -------------------------------------------------------------
- /users
  - /`GET` | `POST` | `DELETE` | `PUT`
- /documents
  - /`GET` | `POST`
- /files
  



## Register

### Register a user

Creates a user in the database and returns a confirmation. Available for anyone without permission.

- **URL**

  /register/

- **Method:**

  `POST`

- **Role required:**

  -None

- **URL Params**
   - None
- **Body Params**

  **Required:**

  `email:[string]`
  `firstName:[string]`
  `lastName:[string]`
  `password:[string]`

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added:${email}` }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email, password and personal data are required." }`

  OR

  - **Code:** 409 Conflict <br />
    **Content:** `{ message: "User already exists." }`

- **Sample Call:**
### Verify Email

Allows to change the state of user in the database from not verified to verified

- **URL**

  /register/verify/:token

- **Method:**

  `POST`

- **Role required:**

  -None

- **URL Params**
   -  `:token` JWT token that is assigned to the user after registration and by default sent on email. 

- **Body Params**

  -None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:** `{ success: "Mail verified succesfully." }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "No user found." }`

  OR

  - **Code:** 409 Conflict <br />
    **Content:** `{ message: "Activation link has expired." }`

- **Sample Call:**

## Authorization & Authentication

### Log in the user

Identifies a user and checks if the login credentials provided are correct

- **URL**

  /auth/

- **Method:**

  `POST`

- **Role required:**

  `None`

- **URL Params**

  **Required:**

  `email:[string]`
  `password:[string]`

  **Optional:**

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 Successful request and response. <br />
    **Content:** `{ accessToken }` }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email & password required." }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User not found" }`

- **Sample Call:**

## Refresh

### Refreshes access token.

Refreshes the access token for a new period of time.

- **URL**

  /refresh/

- **Method:**

  `GET`

- **Role required:**

  `User`

- **URL Params**

  -None

- **Data Params**

  -None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added:${email}` }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email & password required." }`

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User not found" }`

- **Sample Call:**

## Logout

### Logout the user.

Deletes the access token from the given user.

- **URL**

  /logout/

- **Method:**

  `GET`

- **Role required:**

  `User`

- **URL Params**

None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 Successful request and response. <br />
    **Content:** `{ message: "Logged out succesfully." }`
  - **Code:** 204 No content. <br />
    **Content:** `{ message: "Cookies not found." }`
  - **Code:** 204 No content. <br />
    **Content:** `{ message: "User not found." }`

- **Error Response:**

- **Sample Call:**

## Users

### Get all users.

Retrievess all of the users from DB.

- **URL**

  /user/

- **Method:**

  `GET`

- **Role required:**

  `Admin`

- **URL Params**
- None
- **Data Params**
- None
- **Success Response:**

  - **Code:** 204 No content <br />
    **Content:** `{ message: "No users found." }`
  - **Code:** 200 <br />
    **Content:** `{ users }`

- **Error Response:**

None

- **Sample Call:**

### Create new user.

Creates new user with possibility to give role (permissions such as "Admin" or "Editor").

- **URL**

  /user/

- **Method:**

  `POST`

- **Role required:**

`Admin`

- **URL Params**
- **Data Params**

  **Required:**

  `email:[string]`
  `firstName:[string]`
  `lastName:[string]`
  `password:[string]`

  **Optional:**

  `role:{ "Admin":5150,"Editor":1984,"User":2001}`

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added: ${email}` }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email, password and personal data are required."}`

  OR

  - **Code:** 409 Conflict <br />
    **Content:** `{ message: "User already exists." }`

- **Sample Call:**

### Update User

Updates the user entry with a given id in the DB.

- **URL**

  /user/

- **Method:**

  `PUT`

- **Role required:**

  `Admin`

- **URL Params**
- **Data Params**

  **Required:**

  `id:[string]`
  `firstName:[string]`
  `lastName:[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ response` }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "No user matches Id of: ${req.body.id}"}`

- **Sample Call:**

### Delete User

Deletes the user from DB.

- **URL**

  /user/

- **Method:**

  `DELETE`

- **Role required:**

  `Admin`

- **URL Params**
- **Data Params**

  **Required:**

  `id:[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "User deleted succesfully" }`

- **Error Response:**

- **Code:** 400 BAD REQUEST <br />
  **Content:** `{ message: "USER ID required." }`
- **Code:** 400 BAD REQUEST <br />
  **Content:** `{ message: "No user matches Id of: ${req.body.id}"}`

- **Sample Call:**

### Get single user

Retreives a signle user fromm the DB on the basis of ID.

- **URL**

  /users/:id

- **Method:**

  `GET`

- **Role required:**

  `Admin`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "User ID required." }`

  OR

  - **Code:** 400 UNAUTHORIZED <br />
    **Content:** `{ message: "No user matches Id of: ${req.params.id}" }`

- **Sample Call:**

## Documents

### Get documents.

Allows to retrieve documents that fulfill the approporiate criteria.

- **URL**

  /documents

- **Method:**

  `GET`

- **Role required:**

  `User`

- **URL Params**

None

- **Data Params**
- Provide the details of documents you want to find

  `university:[string]`
  `faculty:[string]`
  `programme:[string]`
  `course:[string]`

- **Success Response:**

  - **Code:** 200 Successful request and response. <br />
    **Content:** `{documents}`

- **Error Response:**

  - **Code:** 400 No content. <br />
    **Content:** `{ message: "No document matches for the values searched." }`
    OR
  - **Code:** 500 Server error. <br />
    **Content:** `{ message: "Document retrieval error: ${err.message}" }`

- **Sample Call:**

### Post document.

Allows to post a document to the database.

- **URL**

  /files/documents

- **Method:**

  `POST`

- **Role required:**

  `User`

- **URL Params**

None

- **Data Params**
- Provide the details of documents you want to post to the database.

  `title:[string]`
  `description:[string]`
  `university:[string]`
  `faculty:[string]`
  `programme:[string]`
  `course:[string]`
  `document:[file]`

- **Success Response:**

  - **Code:** 201 Created. <br />
    **Content:** `success: `New document added.`

- **Error Response:**

  - **Code:** 400 No content. <br />
    **Content:** `{ message: "No file attached." }`

    OR

  - **Code:** 500 Server error. <br />
    **Content:** `{ message: `Database error: ${err.message}` }`

- **Sample Call:**
///////////////////////////
## Infrastructure

### Get universities

Retrieves a list of universities with nested list of faculties.

- **URL**

  /infrastructure/university

- **Method:**

  `GET`

- **Role required:**

  `None`

- **URL Params**
-   `None`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ universities }`

- **Error Response:**

  - **Code:** 404 not found  <br />
    **Content:** `{ message: "No universities found." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Universities retrieval error: ${err.message}" }`
    



### Get faculties

Retrieves a list of faculties with nested list of programmes once provided a faculty id.

- **URL**

  /infrastructure/faculty

- **Method:**

  `GET`

- **Role required:**

  `None`

- **URL Params**
- 
-   `None`

- **Data Params**

-Required:
Facultyid in this case is a mongodb object retrieved from calling endpoint infrastructure/university.

`facultyid:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ faculties }`

- **Error Response:**

  - **Code:** 404 not found  <br />
    **Content:** `{ message: "No faculties found." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Faculties retrieval error: ${err.message}" }`
    

    ### Get programmes

Retrieves a list of programmes with nested list of courses once provided a courses id.

- **URL**

  /infrastructure/programme

- **Method:**

  `GET`

- **Role required:**

  `None`

- **URL Params**
- 
-   `None`

- **Data Params**

-Required:
Programmeid in this case is a mongodb object retrieved from calling endpoint infrastructure/faculty.

`programmeid:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ programmes }`

- **Error Response:**

  - **Code:** 404 not found  <br />
    **Content:** `{ message: "No programmes found." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Programmes retrieval error: ${err.message}" }`


 ### Get courses

Retrieves a list of courses with nested list of documents once provided a courses id.

- **URL**

  /infrastructure/course

- **Method:**

  `GET`

- **Role required:**

  `None`

- **URL Params**
- 
-   `None`

- **Data Params**

-Required:
Programmeid in this case is a mongodb object retrieved from calling endpoint infrastructure/programme.

`courseid:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ programmes }`

- **Error Response:**

  - **Code:** 404 not found  <br />
    **Content:** `{ message: "No courses found." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Courses retrieval error: ${err.message}" }`



 ### Add University

Allows to add a new univeristy to the database.

- **URL**

  /infrastructure/university/new

- **Method:**

  `POST`

- **Role required:**

  `Admin`

- **URL Params**
 
  -None

- **Body Params**

- Required:
  - Name of the univeristy to be created
 `name:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{  success: `New university added.` }`

- **Error Response:**

  - **Code:** 404 not found  <br />
    **Content:** `{ message: "No name included." }`
    
    OR
   - **Code:** 409 conflict  <br />
    **Content:** `{ message: "Conflict. University with name ${req.body.name} already exists." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Database error: ${err.message}" }`
    
    
    
 ### Add Faculty

Allows to add a new faculty to the database and nest it to the university object.

- **URL**

  /infrastructure/faculty/new

- **Method:**

  `POST`

- **Role required:**

  `Admin`

- **URL Params**
 
  -None

- **Body Params**

- Required:
  - Name of the univeristy to be created
 `name:[string]`
  - Id of the univeristy where the faculty has to be nested
 `universityid:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{  success: `New faculty added.` }`

- **Error Response:**

  - **Code:** 404 not found  <br />
    **Content:** `{ message: "No name included." }`
    
     OR
   - **Code:** 409 conflict  <br />
    **Content:** `{ message: "No university id provided." }`
    OR
   - **Code:** 409 conflict  <br />
    **Content:** `{ message: "Conflict. University with name ${req.body.name} already exists." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Database error: ${err.message}" }`
    
      
 ### Add Programme

Allows to add a new programme to the database and nest it to the faculty object.

- **URL**

  /infrastructure/programme/new

- **Method:**

  `POST`

- **Role required:**

  `Admin`

- **URL Params**
 
  -None

- **Body Params**

- Required:
  - Name of the programme to be created
 `name:[string]`
  - Id of the faculty where the faculty has to be nested
 `facultyid:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{  success: `New faculty added.` }`

- **Error Response:**

  - **Code:** 400 bad request  <br />
    **Content:** `{ message: "No name included." }`
    
     OR
   - **Code:** 400 bad request  <br />
    **Content:** `{ message: "No faculty id provided." }`
    OR
   - **Code:** 409 conflict  <br />
    **Content:** `{ message: "Conflict. Programme with name ${req.body.name} already exists." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Database error: ${err.message}" }`

     
 ### Add Course

Allows to add a new course to the database and nest it to the programme object.

- **URL**

  /infrastructure/course/new

- **Method:**

  `POST`

- **Role required:**

  `Admin`

- **URL Params**
 
  -None

- **Body Params**

- Required:
  - Name of the course to be created
 `name:[string]`
  - Id of the faculty where the faculty has to be nested
 `programmeid:[string]`
  - Semester when the course takes place
 `semester:[number]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{  success: `New course added.` }`

- **Error Response:**

  - **Code:** 400 bad request  <br />
    **Content:** `{ message: "No name included." }`
    
     OR
   - **Code:** 400 bad request  <br />
    **Content:** `{ message: "No faculty id provided." }`
     OR
   - **Code:** 400 bad request  <br />
    **Content:** `{ message: "No semester  provided." }`
    OR
   - **Code:** 409 conflict  <br />
    **Content:** `{ message: "Conflict. Programme with name ${req.body.name} already exists." }`
    
    OR
    
  - **Code:** 500 Internal server error  <br />
    **Content:** `{ message: "Database error: ${err.message}" }`



