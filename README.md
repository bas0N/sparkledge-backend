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

**Register**
----
  Creates a user in the database and returns access token. Available for anyone without permission.

* **URL**

  /register/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `email=[string]`
   `firstName=[string]`
   `lastName=[string]`
   `password=[string]`
   
   **Optional:**
   
* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: `New user added:${email}` }`
 
* **Error Response:**

  * **Code:** 400  <br />
    **Content:** `{ message: "Email, password and personal data are required." }`

  OR

  * **Code:** 409 Conflict <br />
    **Content:** `{ message: "User already exists." }`

* **Sample Call:**
