## OKTEN capstone project. Programming school CRM:

Back end - developed in Nest, Front end - React

Database - MySQL

Developed as per technical assignment

### Running DEV mode

1. Install latest supported version of Node.js (v23.3.0)
2. Install Docker
3. Install all Node dependencies  
   back:

   > cd back_nest

   > npm i

   front:

   > cd front_react

   > npm i

4. Build up Docker container for Nest application:

   > docker-compose build

5. Start Nest application in Docker container:

   > docker-compose up

6. Start React app:

   > cd front_react

   > npm run dev

### Swagger

1. Swagger is available on URL:
   > http://localhost:5000/api-docs

### Postman

1. Postman configuration files may be found in folder

   > root:/Postman

### Migrations

Database is built and running on http://owu.linkpc.net/, available without pre-setting

- To build up migration as per latest database update use following command from back_nest folder:

  > npm run migration:generate -name=[name of file / table change indication]

- To apply latest migration:
  > npm run migration:run
- To revert previously applied migration:
  > npm run migration:revert

### Building the application

- To build the application, enter application folder and use the command:
  > npm run build

### Running tests

- To run tests, enter application folder and use the command:
  > npm run test:unit

### Need to add:

- Add test for back end - in progress...
- Add tests for front end
