This nginx.conf file does the following:

Sets the number of worker processes to 1 (the default).
Specifies the number of worker connections to 1024 (the default).
Defines an HTTP server block that listens on port 80 and handles requests for the my-app.com domain name.
Specifies that requests should be handled by serving files from the /usr/share/nginx/html directory.
Sets the default file to serve as index.html.
Defines a fallback rule that serves index.html if the requested file or directory is not found.
Sets up error pages to be served from the /usr/share/nginx/html directory.




docker build -t flight-creator-fe .


docker run -d -p 80:80 --name flight-fe --network flight-network --link flight-be:backend flight-creator-fe
