# sparkledge-backend api

* /register
* * /  `POST` 
* /auth
* *  /`POST` 
* /refresh
* * /`GET`
* /logout
* * /`GET`
* /users
*  * /`GET` | `POST` | `DELETE` | `PUT`
* /files
* * /`GET` | `POST`

## Register

### Register a user

  Creates a user in the database and returns a confirmation. Available for anyone without permission.

* **URL**

  /register/

* **Method:**

  `POST`
  
* **Role required:**

  `None`
  
*  **URL Params**
   
* **Data Params**

    **Required:**
 
   `email:[string]`
   `firstName:[string]`
   `lastName:[string]`
   `password:[string]`
   

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added:${email}` }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email, password and personal data are required." }`

  OR

  * **Code:** 409 Conflict <br />
    **Content:** `{ message: "User already exists." }`

* **Sample Call:**

## Authorization & Authentication

### Log in the user

  Identifies a user and checks if the login credentials provided are correct

* **URL**

  /auth/

* **Method:**

  `POST`
* **Role required:**

  `None`
  
*  **URL Params**

   **Required:**
 
   `email:[string]`
   `password:[string]`
   
   **Optional:**
   
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 Successful request and response. <br />
    **Content:** `{ accessToken }` }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email & password required." }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User not found"  }`

* **Sample Call:**


## Refresh

### Refreshes access token.

  Refreshes the access token for a new period of time.

* **URL**

  /refresh/

* **Method:**

  `GET`
* **Role required:**

  `User`
  
*  **URL Params**

   **Required:**
 
   **Optional:**
   
* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added:${email}` }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email & password required." }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User not found"  }`

* **Sample Call:**

## Logout

### Logout the user.

  Deletes the access token from the given user.

* **URL**

  /logout/

* **Method:**

  `GET`
  
* **Role required:**

  `User`
  
*  **URL Params**

 None
   
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 Successful request and response. <br />
    **Content:** `{ message: "Logged out succesfully."  }`
    
  * **Code:** 204 No content. <br />
    **Content:** `{ message: "Cookies not found."  }`
    
  * **Code:** 204 No content. <br />
    **Content:** `{ message: "User not found."  }`
 
* **Error Response:**

* **Sample Call:**



## Users

### Get all users.

Retrievess all of the users from DB.

* **URL**

  /user/

* **Method:**

  `GET`
 
* **Role required:**

  `Admin`
  
*  **URL Params**
*  
   None
   
* **Data Params**
* 
   None
   
* **Success Response:**

  * **Code:** 204 No content <br />
    **Content:** `{  message: "No users found."  }`
    
  * **Code:** 200  <br />
    **Content:** `{ users }`
 
* **Error Response:**

None

* **Sample Call:**

### Create new user.

Creates new user with possibility to give role (permissions such as "Admin" or "Editor").


* **URL**

  /user/

* **Method:**

  `POST`
  
 * **Role required:**

  `Admin`
  
*  **URL Params**
   
* **Data Params**

    **Required:**
 
   `email:[string]`
   `firstName:[string]`
   `lastName:[string]`
   `password:[string]`
   
    **Optional:**
    
    `role:{ "Admin":5150,"Editor":1984,"User":2001}`
   

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added: ${email}` }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Email, password and personal data are required."}`

  OR

  * **Code:** 409 Conflict <br />
    **Content:** `{ message: "User already exists." }`

* **Sample Call:**

### Update User

Updates the user entry with a given id in the DB.


* **URL**

  /user/

* **Method:**

  `PUT`
  
* **Role required:**

  `Admin`
  
*  **URL Params**
   
* **Data Params**

    **Required:**
 
   `id:[string]`
    `firstName:[string]`
   `lastName:[string]`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ response` }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "No user matches Id of: ${req.body.id}"}`

* **Sample Call:**


### Delete User

Deletes the user from DB.

* **URL**

  /user/

* **Method:**

  `DELETE`

* **Role required:**

  `Admin`
  
*  **URL Params**
   
* **Data Params**

    **Required:**
 
   `id:[string]`

  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: "User deleted succesfully"  }`
 
* **Error Response:**

 * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "USER ID required." }`
    
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "No user matches Id of: ${req.body.id}"}`

* **Sample Call:**

### Get single user

Retreives a signle user fromm the DB on the basis of ID.

* **URL**

  /users/:id

* **Method:**

  `GET`
  
* **Role required:**

  `Admin`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "User ID required." }`

  OR

  * **Code:** 400 UNAUTHORIZED <br />
    **Content:** `{ message: "No user matches Id of: ${req.params.id}" }`

* **Sample Call:**


## Files

### Allows to post and get files to/from server.

  Deletes the access token from the given user.

* **URL**

  /files/documents

* **Method:**

  `GET`
  
* **Role required:**

  `User`
  
*  **URL Params**

 None
   
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 Successful request and response. <br />
    **Content:** `{ message: "Logged out succesfully."  }`
    
  * **Code:** 204 No content. <br />
    **Content:** `{ message: "File not found."  }`
    
  
 
* **Error Response:**

* **Sample Call:**


