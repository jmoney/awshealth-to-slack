FROM amazon/aws-lambda-nodejs:14

# Copy function code
ADD . ${LAMBDA_TASK_ROOT}

RUN npm ci

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]