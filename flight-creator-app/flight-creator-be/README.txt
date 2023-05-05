docker build -t flight-creator-be .

Run the container: Run the backend server container by running the following command:
docker run -d -p 3000:3000 --name flight-creator-be-container flight-creator-be
This command maps port 3000 on the host machine to port 3000 in the container and gives the container a name for easy reference.

This Dockerfile uses the official Node.js Docker image, copies your application files into the container, installs the dependencies, and specifies the command to start the server.



visit:
http://localhost:3000