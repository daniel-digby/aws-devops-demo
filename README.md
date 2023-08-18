# IAC + Containerisation Demo

# Docker

Dockerfiles can be found under docker directories of client and server. They have been separated out in order to build both components of the monorepo seperately for composition during development and deployment to different locations during production.

Each dockerfile undergoes multiple build stages to efficiently cache shared dependencies, client/server specific dependencies, and then client/server specific code- prior to defining target stages for testing, development, and production

# Testing

The .circleci directory holds a definition for the test pipeline that gets run. CircleCi has been configured to watch this repo and pick up the config.yml file in order to run the pipeline on push. 

The pipeline first installs dependencies then splits out into four in order to build and test both the client and the server.

# Deployment

The deployment action was largely configured following this AWS tutorial:
https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/

Other sources can be found in the workshop notes on the facebook event.

In the cdk directory I use the AWS Cloud Development Kit to define a CDK stack and provision the necessary services to host our containerized backend in a Fargate cluster, leveraging ECS and the ECR to store the container.

The fargate task definition is defined at the project root as task-definition.json

The deployment action is configured to run after tests and the file can be viewed under .github/workflows

# Secrets

I have configured secrets in both github and circleCi

Github secrets contain:
- AWS_ACCESS_KEY_ID
- AWS_ROLE_TO_ASSUME
- AWS_ROLE_EXTERNAL_ID
- AWS_SECRET_ACCESS_KEY

CircleCi secrets contain:
- DOCKERHUB_USER
- DOCKERHUB_PASSWORD
