# sparkledge-backend api

#### Endpoints that require user to be logged (JWT token provided)

---

- /[register](https://github.com/bas0N/sparkledge-backend#register)
  - [Register a user](https://github.com/bas0N/sparkledge-backend#register-a-user)
    - / `POST` path: /register/
  - [Verify Email](https://github.com/bas0N/sparkledge-backend#verify-email)
    - / `GET` path: /register/verify/:token
- /[auth](https://github.com/bas0N/sparkledge-backend#log-in-the-user)
  - [Log in the user](https://github.com/bas0N/sparkledge-backend#log-in-the-user)
    - /`POST` path: /auth/
- /[refresh](https://github.com/bas0N/sparkledge-backend#refresh)
  - [Refresh access token](https://github.com/bas0N/sparkledge-backend#refreshes-access-token)
    - /`GET` path: /refresh/
- /[logout](https://github.com/bas0N/sparkledge-backend#logout)
  - [Logout the user](https://github.com/bas0N/sparkledge-backend#logout-the-user)
    - /`GET` path: /logout/
- /[infrastructure](https://github.com/bas0N/sparkledge-backend#infrastructure)
  - [Get universities](https://github.com/bas0N/sparkledge-backend#get-universities)
    - /`POST` path: /infrastructure/university/
  - [Get faculties](https://github.com/bas0N/sparkledge-backend#get-faculties)
    - /`POST` path: /infrastructure/faculty/
  - [Get programmes](https://github.com/bas0N/sparkledge-backend#get-programmes)
    - /`POST` path: /infrastructure/programme/
  - [Get courses](https://github.com/bas0N/sparkledge-backend#get-courses)
    - /`POST` path: /infrastructure/course/
  - [Get documents](https://github.com/bas0N/sparkledge-backend#get-documents)
    - /`POST` path: /infrastructure/document/
  - [Add university](https://github.com/bas0N/sparkledge-backend#add-university)
    - /`POST` path: /infrastructure/university/new
  - [Add faculty](https://github.com/bas0N/sparkledge-backend#add-faculty)
    - /`POST` path: /infrastructure/faculty/new
  - [Add programme](https://github.com/bas0N/sparkledge-backend#add-programme)
    - /`POST` path: /infrastructure/programme/new
  - [Add course](https://github.com/bas0N/sparkledge-backend#add-course)
    - /`POST` path: /infrastructure/course/new
- /[forgot-password](https://github.com/bas0N/sparkledge-backend#forgot-password)

  - [Send change password link to email](https://github.com/bas0N/sparkledge-backend#send-change-password-link-to-email)
    - /`POST` path: /forgot-password/
  - [Change password](https://github.com/bas0N/sparkledge-backend#change-password)
    - /`POST` path: /forgot-password/:userId/:token

  ***

  #### Do not require user to be logged (JWT token provided)

  ***

- /[users](https://github.com/bas0N/sparkledge-backend#users)
  - [Get all users](https://github.com/bas0N/sparkledge-backend#get-all-users)
    - /`GET` path: /user/
  - [Get single user](https://github.com/bas0N/sparkledge-backend#add-university)
    - /`GET` path: /user/:Id
  - [Create new user](https://github.com/bas0N/sparkledge-backend#create-new-user)
    - /`POST` path: /user/
  - [Delete user](https://github.com/bas0N/sparkledge-backend#delete-user)
    - /`DELETE` path: /user/
  - [Update user object](https://github.com/bas0N/sparkledge-backend#update-user)
    - /`PUT` path: /user/
  - [Get last views](https://github.com/bas0N/sparkledge-backend#get-last-views)
    - /`GET` path: /lastViews/
- /[documents](https://github.com/bas0N/sparkledge-backend#documents)
  - [Add document](https://github.com/bas0N/sparkledge-backend#add-document)
    - /`POST` path: /document/
  - [Get document](https://github.com/bas0N/sparkledge-backend#get-document)
    - /`GET` path: /getDocument/:documentId
  - [Get file](https://github.com/bas0N/sparkledge-backend#get-file)
    - /`GET` path: /document/:key
  - [Add like](https://github.com/bas0N/sparkledge-backend#add-like)
    - /`GET` path: /document/likes
- /files - to be written

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

  - `:token` JWT token that is assigned to the user after registration and by default sent on email.

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

- **Body Params**

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

- **Body Params**

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

- **Body Params**

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
- **Body Params**
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
- **Body Params**

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
- **Body Params**

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
- **Body Params**

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

- **Body Params**

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

### Get last views

Retrieves a list of recently viewed documents for the logged user.

- **URL**

  /users/lastViews/

- **Method:**

  `GET`

- **Role required:**

  `None`

- **URL Params**

  `None`

- **Body Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** A list of document id's recentry viewed by the user

- **Error Response:**

  - **Code:** 500 INTERNAL ERROR <br />
    **Content:** `{ message: `Data retrieval error: ${err.message}` }`

  OR

  - **Code:** 400 Bad request <br />
    **Content:** `{ message: `No user matches Id of: ${req.id} or views array is empty.` }`

- **Sample Call:**

## Documents

### Add document.

Allows to post a document to the database and returns the id of newly created document.

- **URL**

  /documents

- **Method:**

  `POST`

- **Role required:**

  `User`

- **URL Params**

None

- **Body Params**
- Provide the details of documents you want to post to the database.

  `title:[string]`
  `description:[string]`
  `courseId:[string]`
  `file:[file]`

- **Success Response:**

  - **Code:** 201 Created. <br />
    **Content:** `{success: `New document added.`, id:document._id ()}`

- **Error Response:**

  - **Code:** 400 No content. <br />
    **Content:** `{ message: "No file attached." }`

    OR

  - **Code:** 400 Bad request <br />
    **Content:** `{ message: "File size is too big. It should not exceed 50Mb." }`

    OR

  - **Code:** 500 Server error. <br />
    **Content:** `{ message: `Database error: ${err.message}` }`

- **Sample Call:**

### Get Document.

Allows to get a full document from the database (without file).

- **URL**

  /documents/getDocument/:documentId

- **Method:**

  `GET`

- **Role required:**

  `User`

- **URL Params**

  - `:documentId` Id od the document that is to be retrieved from the database.

- **Body Params**

  -None

- **Success Response:**

  - **Code:** 20- Success. <br />
    **Content:** `Document object.`

- **Sample Call:**

### Get File.

Allows to retrieve a pdf file from the database and updates the viewcount.

- **URL**

  /documents/:key

- **Method:**

  `GET`

- **Role required:**

  `User`

- **URL Params**

  - `:key` S3 file key that can be retrieved from course endpoint.

- **Body Params**

  -None

- **Success Response:**

  - **Code:** 200 Success. <br />
    **Content:** `PDF file`

- **Sample Call:**

### Add like.

Allows to add like if not liked and remove like if liked

- **URL**

  /documents/likes

- **Method:**

  `POST`

- **Role required:**

  `User`

- **URL Params**

  -None

- **Body Params**
- Provide the details of documents you want to post to the database.

  `documentId:[string]`

- **Success Response:**

  - **Code:** 200 Success. <br />
    **Content:** `message: "Document liked successfully"`

    OR

- **Code:** 200 Success. <br />
  **Content:** `message: "Document disliked successfully"`

- **Error Response:**

  - **Code:** 400 Bad request. <br />
    **Content:** `{ message: "No document id provided." }`

    OR

  - **Code:** 404 No content. <br />
    **Content:** `{ message: `Document not found: ${err.message}` }`

    OR

  - **Code:** 500 Server error. <br />
    **Content:** `{ message: `Database error: ${err.message}` }`

- **Sample Call:**

## Infrastructure

### Get universities

Retrieves a list of universities with nested list of faculties.

- **URL**

  /infrastructure/university

- **Method:**

  `POST`

- **Role required:**

  `None`

- **URL Params**
- `None`

- **Body Params**

  `None`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ universities }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No universities found." }`

    OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Universities retrieval error: ${err.message}" }`

### Get faculties

Retrieves a list of faculties with nested list of programmes once provided a faculty id.

- **URL**

  /infrastructure/faculty

- **Method:**

  `POST`

- **Role required:**

  `None`

- **URL Params**
-
- `None`

- **Body Params**

-Required:
Facultyid in this case is a mongodb object retrieved from calling endpoint infrastructure/university.

`facultyId:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ faculties }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No faculties found." }`

    OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Faculties retrieval error: ${err.message}" }`

    ### Get programmes

Retrieves a list of programmes with nested list of courses once provided a courses id.

- **URL**

  /infrastructure/programme

- **Method:**

  `POST`

- **Role required:**

  `None`

- **URL Params**
-
- `None`

- **Body Params**

-Required:
Programmeid in this case is a mongodb object retrieved from calling endpoint infrastructure/faculty.

`programmeId:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ programmes }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No programmes found." }`

    OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Programmes retrieval error: ${err.message}" }`

### Get courses

Retrieves a list of courses with nested list of documents once provided a courses id.

- **URL**

  /infrastructure/course

- **Method:**

  `POST`

- **Role required:**

  `None`

- **URL Params**
-
- `None`

- **Body Params**

-Required:
CourseId in this case is a mongodb object id retrieved from calling endpoint infrastructure/programme.

`courseId:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ programmes }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No courses found." }`

    OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Courses retrieval error: ${err.message}" }`

### Get documents

Retrieves a document once provided a particular documentId.

- **URL**

  /infrastructure/document

- **Method:**

  `POST`

- **Role required:**

  `None`

- **URL Params**
-
- `None`

- **Body Params**

-Required:
DocumentId in this case is a mongodb objectid retrieved from calling endpoint infrastructure/course.

`documentId:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ document }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No document found." }`

    OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Document retrieval error: ${err.message}" }`

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
    **Content:** `{ success: `New university added.` }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No name included." }`

    OR

  - **Code:** 409 conflict <br />
    **Content:** `{ message: "Conflict. University with name ${req.body.name} already exists." }`

  OR

  - **Code:** 500 Internal server error <br />
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
    `universityId:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ success: `New faculty added.` }`

- **Error Response:**

  - **Code:** 404 not found <br />
    **Content:** `{ message: "No name included." }`

    OR

  - **Code:** 409 conflict <br />
    **Content:** `{ message: "No university id provided." }`
    OR
  - **Code:** 409 conflict <br />
    **Content:** `{ message: "Conflict. University with name ${req.body.name} already exists." }`

  OR

  - **Code:** 500 Internal server error <br />
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
    `facultyId:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ success: `New faculty added.` }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "No name included." }`

    OR

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "No faculty id provided." }`
    OR
  - **Code:** 409 conflict <br />
    **Content:** `{ message: "Conflict. Programme with name ${req.body.name} already exists." }`

  OR

  - **Code:** 500 Internal server error <br />
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
    `programmeId:[string]`
  - Semester when the course takes place
    `semester:[number]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ success: `New course added.` }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "No name included." }`

    OR

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "No faculty id provided." }`
    OR
  - **Code:** 400 bad request <br />
    **Content:** `{ message: "No semester provided." }`
    OR
  - **Code:** 409 conflict <br />
    **Content:** `{ message: "Conflict. Programme with name ${req.body.name} already exists." }`

  OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Database error: ${err.message}" }`

## Forgot password

### Send change password link to email

Request an email to be sent to a provided email adress with a link.
Link redirects to a login page andconsists of a change password token that will be put into change password method.

- **URL**

  /forgot-password/

- **Method:**

  `POST`

- **Role required:**

  `User`

- **URL Params**

  -None

- **Body Params**

- Required:

  - Email of the account of which password we want to change.
    `email:[string]`

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ success: `Email with password reset instructions succesfully sent to: ${req.body.email}` }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "No name included." }`

    OR

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "Email is required." }`
    OR
  - **Code:** 404 no content <br />
    **Content:** `{ message: "User doesn't exist." }`

  OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Database error: ${err.message}" }`

### Change password

Changes the password of the user in the database after providing a change password session token.

- **URL**

  /forgot-password/:userId/:token

- **Method:**

  `POST`

- **Role required:**

  `User`

- **URL Params**

  - `:email` email of the user whose password we want to change.
  - `:token` Token that is included in the redirect email sento to an indicated email adress

- **Body Params**

  - Required:
    - New password to be set  
      `password:[string]`

  -none

- **Success Response:**

  - **Code:** 200 Succes <br />
    **Content:** `{ message: `Password has been changed succesfully.`` }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ message: "Email and password are required." }`

    OR

  - **Code:** 404 no content <br />
    **Content:** `{ message: "User doesn't exist or token is invalid." }`
    OR
  - **Code:** 400 bad request <br />
    **Content:** `{ message: "Activation link has expired." }`

  OR

  - **Code:** 500 Internal server error <br />
    **Content:** `{ message: "Database error: ${err.message}" }`
