# Installation

## Requirements

* Install `go` https://golang.org/doc/install

## Folder Structure
For the packages to import properly ensure that the folder structure looks like below:

```
$GOPATH/src
└── nl/
    ├── cmd/
    ├── csv/
    ├── http/
    ├── ship/
    └── util/
```

## Optional

Included in the app is a `ShipRepository` wrapping a postgres connection. This usage requires more to set up.

1. Install `docker-compose` https://docs.docker.com/compose/install/

2. Run docker-compose to create postgres containers

    2.1 Before running the `docker-compose` command ensure first that no instances of postgres is running.

    2.2 Note that the `-d` flag is for running the containers in the background and not necessary.

```shell
$ docker-compose up -d
```

3. Install the postgres driver; https://github.com/lib/pq

```shell
$ go get github.com/lib/pq
```

4. Run the following command to set up the database

```shell
$ go run cmd/setup/main.go -postgres

# If everything went smoothly
$ Successfully set up postgres database and seeded with data
```

## How to start server

Ensure to run the commands below in the `/nl` folder

```shell
$ go run cmd/server/main.go
```

### Optional

Running the postgres repository instead of the default csv requires a `-db` flag.

```shell
$ go run cmd/server/main.go -db=postgres
```

## Endpoints

### 1. `/api/total_distance`

Query params `start` and `end` are required for the `total_distance` endpoint.

Sample URL

`http://localhost:8000/api/total_distance?start=1561536001&end=1561760001`

Sample 200 response
```
{
    "total_distance": 1112.7400913238525
}
```

Sample 400 response
```
{
    "error": "PARAM_ERR: end query param is missing"
}
```

### 2. `/api/total_fuel`

Query params `start` and `end` are required for the `total_fuel` endpoint.

Sample URL

`http://localhost:8000/api/total_fuel?start=1561536001&end=1561760001`

Sample 200 response
```
{
    "total_fuel": 28145.906252399986
}
```

Sample 400 response
```
{
    "error": "PARAM_ERR: end query param is missing"
}
```

### 3. `/api/efficiency`

Query params `start` and `end` are required for the `efficiency` endpoint.

Sample URL

`http://localhost:8000/api/efficiency?start=1561536001&end=1561760001`

Sample 200 response
```
{
    "efficiency": 0.30649974565701876
}
```

Sample 400 response
```
{
    "error": "PARAM_ERR: end query param is missing"
}
```

Attached in the repo is a postman collection.

## How to run tests

```shell
$ go test ./...
```

# Design

## Handler

The handler layer controls the logic to parse and validate the incoming requests. This ensures that bad parameters are not passed into the services.

## Service

The service layer controls the management of repository data. When an endpoint requires data from one or multiple repositories the service will communicate with all necessary repositories and/or services for such data.

## Repository

The repository layer interfaces with the data. A repository may directly access a database, a cached systerm, or any other data source but it's implementation is abstracted from the service layer.

# Discussion Points

## 1. `cmd/server/main.go`

The main point of the current design is for simple usage of the server although underneath the implementation may be complex. The process of starting a server is in a few quick steps.

1. Instantiate the necessary services and repositories
2. Pass in configurations for the server
3. Create a server
4. Listen and serve

## 2. `http/http.go`

The option to use [gorilla/mux](https://github.com/gorilla/mux) or [go-chi/chi](https://github.com/go-chi/chi) was possible and would have been better in a production build since a lot of boilerplate and redundant code is abstracted. The decision to not use third party libraries is mainly for the reason of easy building without having to either inlcude more installation instructions or managing a vendor package. It was also an oppurtunity to understand the go standard package library a bit better.

The `Close` function was mainly added for `http_test.go` but was later not used.

## 3. `ship/service.go`

The ship service is currently the least necessary of the codebase but potentially a very important piece when the codebase scales. Many times a codebase turns into spaghetti code simple because there is no architecture to define where certain logic belongs.

Note the `NewService` function parameter is a `Repository` `interface` and not a `ShipRepository` as defined in `csv/ship.go`. This is to establish an abstraction between the service and the repository so that the repository implementaion is not tangled with the service. Currently the repository is instantiated from `csv/ship.go` but it can easily be defined in `postgres/ship.go` where the `ShipRepository ` wraps a PostgresQL connection as opposed to a `csv` file.

## 4. `csv/ship.go`

The `data` in the `ShipRepository` is assumed to be sorted since a binary search is used to find the `start` and `end` index. Type `ShipData` was also created to to provide a more concise definition of busines logic between two data points.
