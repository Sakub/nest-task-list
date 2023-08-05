# Simple Task-List written with [NestJS]
### Project created to learn [NestJS]

### Prerequisites
1. [Docker]

### Installation
1. Clone this repository. You don't need to manually install anything since [Docker] will handle all installations and setup:
````
 git clone https://github.com/sakub/nest-task-list.git 
````
2. Navigate to the project directory
````
cd nest-task-list 
 ````
3. Copy the `.env.example` to `.env`
````
cp .env.example .env
````
4. Edit the `.env` file and fill in all the required fields. These environment variables will be used to establish a connection with the MySQL database running inside the Docker container.

### How to run
1. Run this project using [Docker Compose]:
`docker-compose up --build`
2. Once built and running, access the application at `localhost:3000`

### ToDo List:
- [x] ~~Create Task Module~~
- [x] ~~Create User Module~~
- [x] ~~Create Logger Domain~~
- [ ] Create Database Domain 
- [ ] Connect data with Database
- [ ] Create Auth Module 

### License
This project is licensed under the MIT License

[NestJS]: https://nestjs.com
[Docker]: https://docker.com
[Docker Compose]: https://docs.docker.com/compose/
