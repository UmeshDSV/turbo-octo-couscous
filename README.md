# turbo-octo-couscous

## Prerequisites - 
Node version v15.14.0 is required \
Run 'npm i' after cloning the repository to local \
Run 'npm start' to start the application \
.env file should be present with MONGO_DB_URI and APPLICATION_SECRET values \

API's: 

1. To register a new user - \
Type of the request - POST \
Request URL - http://localhost:3000/users \
Request Body - {\
        "user_id" : <numeric_value>\
        "name" : <name>, Accepts only string values\
        "email" : <email>, Accepts only valid email address\
        "password": <password>\
}\
Returns an Authentication Token 

2. To Login - \
Type of request - POST \
Request URL - http://localhost:3000/users/login \
Request Body - {\
        "email" : <email>, Accepts only valid email address\
        "password": <password>\
}\
Returns an Authentication Token

3. To Logout - \
Type of request - POST \
Request URL - http://localhost:3000/users/logout \
Request Body - {\
        "email" : <email>, Accepts only valid email address\
        "password": <password>\
}\