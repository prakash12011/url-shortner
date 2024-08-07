**Commands to run:**

 - yarn dev – To run dev environment 


**Frontend Pages**

Index page functionality: 

- Added validations for form so if user filled a valid URL and check the checkbox only then he/she is able to shorten the URL
- Form provide functionality to shorten the URL, reset form and copy output short URL in user clipboard
- It shows a Snackbar/Popup when user copy URL to clipboard and after 5 sec it automatically disappears.
- When user click on “Shorten URL” button it generate a random string and send a API request to express server with random string and user provided URL to shorten the URL
- Server respond with shorten URL and then we show that to an alertbox and enable the “Copy to clipboard” Button

URL page functionality: 

- It gets shorten URL ID from URL and send it to server and server respond with full URL 
- If we didn’t get full URL from server then we show an alert with error
- When we get full URL then we open that link in new tab after 250 milisecond or .25 sec
- Sometime browser block popup opening so we show a normal link which open full URL in new tab

**Express Server URLs:**

Working:

- We added Server Middleware in Nuxt and file is placed on /server/url.js
- url.js file provide 3 endpoints to perform API requests
- We used a JSON file as database to store short URL key and full URL as its value in JSON Format

/url Endpoint:

- This URL read JSON file and show all available links on page

/ setUrl Endpoint:

- This URL works with POST method and takes two argument key and url
- After getting URL and short URL, we read the JSON file so our previous URLs can be safe and store it’s data in different variable
- We add key and full URL to that new variable and then write database file with new data which includes new and all old URLs

/ getUrl Endpoint:

- It require a parameter which is short URL or key 
- After that we read database JSON file and match short URL/key with object if it match then send full URL otherwise send an empty object
                       