# turbo-octo-couscous

## Prerequisites - 
Node version v15.14.0 is required \
Run 'npm i' after cloning the repository to local \
Run 'npm start' to start the application \
.env file should be present with MONGO_DB_URI and APPLICATION_SECRET values

## API's: 

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

3. To Logout (Requires Authentication) - \
Type of request - POST \
Request URL - http://localhost:3000/users/logout

4. To add a movie (Requires Authentication) - \
Type of request - POST \
Request URL - http://localhost:3000/movies \
Request Body - {\
         "title":<title> \
        "language":<language> \
        "genre":<genre> \
        "released_on":<released_on> \
        "description": <description> \
}

5. To update a movie (Requires Authentication) - \
Type of request - PATCH \
Request URL - http://localhost:3000/movies/<movie_id> \
Request Body - {\
        "genre":<genre> \
        "description": <description> \
}
Update can be performed only on genre or description or both.

6. To delete a movie (Requires Authentication) - \
Type of request - DELETE \
Request URL - http://localhost:3000/movies/<movie_id>

7. To rate a movie (Requires Authentication) - \
Type of request - POST \
Request URL - http://localhost:3000/movieRating \
Request Body - {\
        "title":<title> \
        "language":<language> \
        "released_on":<released_on> \
        "rating": <rating> \
}

8. To view all movie ratings (Requires Authentication) - \
Type of request - GET \
Request URL - http://localhost:3000/movieRatings?limit=10&skip=10 \
Default value for limit is 10 and skip is 0 

9. To logout from all sessions (Requires Authentication) - \
Type of request - POST \
Request URL - http://localhost:3000/users/logoutAll

#### For the API's that requires authentication, in request headers add the key as 'Authorization' and corresponding value should be - Bearer <JWT_token>