# Password Validator
[The Infatuation](https://www.theinfatuation.com/)

## Introduction
[NIST](https://www.nist.gov) recently updates their [Digital Identity Guidelines](https://pages.nist.gov/800-63-3/) in June 2017. The new guidelines specify general rules for handling the security of user supplied passwords. Previously passwords were suggested to have certain composition rules (special characters, numbers, etc), hints and expiration times. Those have gone out the window and the new suggestions are as follows:

### Passwords MUST

1. Have **AT LEAST** 8 characters minimum
2. Have **AT MOST** 64 characters maximum
3. Allow all ASCII characters and spaces (unicode optional)
4. Not be a common password

## Table of Contents
#### 1. [Install Go](#markdown-header-install-go)
#### 2. [Instructions](#markdown-header-instructions)
#### 3. [Build](#markdown-header-build)
#### 4. [Usage](#markdown-header-usage)
#### 5. [Testing](#markdown-header-testing)

## Install Go
Follow the [instructions](https://golang.org/doc/install) at the golang website and install Go

## Instructions
Clone the repository into the $GOPATH and cd into the folder
```sh
$ git clone https://aAclee@bitbucket.org/aAclee/password.git
$ cd password
```
To run the application.
This will use the default flags for the common passwords file and the input passwords files.

Common passwords `./files/common_password.txt`

Input passwords `./files/input.txt`
```sh
$ go run ./cmd/password/main.go
```
To run the application with user defined flags.
```sh
$ go run ./cmd/password/main.go -invalid_list=lots_of_common_passwords.txt -input=./files/weak_password_list.txt
```

## Build
To build a file.
```sh
$ go build ./cmd/password/main.go
```

## Usage
To run the file.
```sh
$ ./main -invalid_list=lots_of_common_passwords.txt -input=./files/weak_password_list.txt
```
Feel free to rename the file from main to password_validator or something similar. The file `password_validator` is already included but was built on my machine (Ubuntu 16.04.3 LTS) and should only work with similar set ups. (Uses the default flags)
```sh
$ ./password_validator
```
To run the file with STDIN pipe.

The input file is optional using the `-input=filename.txt` flag.
```sh
$ cat ./files/10_million_password_list_top_100000.txt | ./password_validator
```

## Testing
To run tests.
```sh
$ go test -v ./...
```