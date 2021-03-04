# Mail service aggregator

## About

This service aims at abstracting and aggregating multiple services for sending emails in one.

## API

```javascript
POST /email-service/send

{
	"to": "<email address>",
	"subject": "Hey, there. This is a test email",
	"body": "<body><h2>Welcome to my email service</h2><p>May you have a pleasant experience using it!</p></body>",
	"from": "<email address>"
}
```

### Responses
```
{
    "status": 0,
    "result": "Email queued",
    "lastService": "SendgridService"
}
```

## Folder structure
Since this is a NestJS app, it follows the NestJS methods of delivering code:

### Root of source
All source code can be found under `src/` folder;

### Controllers
This is where all the controllers are, alongside with all the API definitions

### DTOs
The Data Transferable Objects can be found here

### Interfaces
Some interface files I needed for defining the contracted structure

### Services
This is where the main email service is, as well as the plug-ins for different emaling services

### Types
All the used classes are defined here


## Install
Make sure you are using a recent version of node.

```
nvm use 12
npm install
```

## How to run

```
npm run start:dev
```

This command will start the development servier, with nodemon.

```
npm run test
```

This target will run all tests. Currently just the main controller has some tests.


## Current services:

### Sendgrid
In order for enabling this service, you must add an environment variable for the API key:
```
SENDGRID_API_KEY=<your api key>
```

### Mailgun
For this service, 2 environment variables are needed:

```
MAILGUN_DOMAIN=<your domain>
MAILGUN_API_KEY=<your api key>
```

## Environment

Apart from the service-specific environment variables, you also need to add a list of preferred services. These will be used in the order they were saved in this environment variable:

```
servicePreference=ses,sendgrid,mailgun
```
In the example above, the app will first try with `ses`, then with `sendgrid`, then with `mailgun`, pointing out in the response which one did it use.

If no service could be used, an error is thrown:

```
{
    "status": 1,
    "error": "All services are down. Panic."
}
```