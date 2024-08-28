# Employee Management System - SPA Approach
Technologies used
1. Svelte
2. Javascript
3. Vitest

## To Run :
### Locally
1. Clone this repository to your local machine using the following command:

`` 
git clone git@github.com:jpauljayme/lm-emp-mgmt-spa.git
``

2. ``npm install``

3. ``npm run dev``
4. By default, the app will be running on http://localhost:5173. Open your web browser and navigate to this URL to see the app in action.

### Building the Docker Image
1.Build the Docker image using the provided Dockerfile:
``
docker build -t lm-emp-mgmt-spa .
``

2. Run the Docker Container
``
docker run -d -p 80:80 --name lm-emp-mgmt-spa lm-emp-mgmt-spa
``

### Pulling from Docker Hub
1. In the command line...

``
docker pull devmayhm/lm-emp-mgmt-spa
``

2. Run

``
docker run -d -p 80:80 devmayhm/lm-emp-mgmt-spa
``
