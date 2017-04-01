# Google Home Actions for Logapps Challenge

Written by Alex Dao

## Installation
```
$npm install
```

## Usage
1. Deploy the Node.js Cloud Function for fulfillment:
```
gcloud beta functions deploy sayNumber --trigger-http --stage-bucket ghome-logapps-naming
```

2. Run the following commands from the actionssdk-say-number-nodejs directory:
```
<sdk-dir>/gactions preview -action_package=action.json -invocation_name="my action"
```
