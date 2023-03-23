# Coffee Ordering Platform

**Pre-requisites**

1. Docker Engine

-[Windows](https://docs.docker.com/desktop/install/windows-install/)

-[Mac](https://docs.docker.com/desktop/install/mac-install/)

2. Docker CLI
3. Node.js
4. Terraform

## Package initialization

Open `terminal` on mac or `powershell` on Windows, or open terminal in visual code

Run the following command `pnpm install`

## Run Hashicups API locally

To execute our app we need to run Hashicups locally, which creates a PostgreSQL database and API to perform CRUD operations

Open new separate terminal and run the following command `pnpm run hashicups-start` and keep it running

## Initial setup

Create a new .env file with variables and corresponding values

```
HASHICUPS_USERNAME
HASHICUPS_PASSWORD
HASHICUPS_HOST
HASHICUPS_ORDERS_FOLDER_NAME

```

Once the docker app is up and running and env file is created, run the following command to setup initial setup.

`pnpm run setup`

The HASHICUPS_TOKEN will be set automatically, verify it with command
`echo $HASHICUPS_TOKEN`.

If HASHICUPS_TOKEN is not set then copy the token from setup command and set it manually

Windows - `set HASHICUPS_TOKEN={copied_token}`

Mac - `export HASHICUPS_TOKEN={copied_token}`

## Terraform setup

To generate terraform providers run command

`pnpm run get`

To create terraform state

`pnpm run deploy`

## CRUD setup

### create new order (new folder name should be in format order-{number})

`HASHICUPS_ORDERS_FOLDER_NAME/{order-{number}}`

### update order (folder name should be in format order-{number})

change the {number} of existing order folder name
`HASHICUPS_ORDERS_FOLDER_NAME/{order-{number}}`

### delete an order (folder name should be in format order-{number})

delete `{order-{number}}` under `HASHICUPS_ORDERS_FOLDER_NAME`

### create new coffee (new file name should be in format {id}.json)

`HASHICUPS_ORDERS_FOLDER_NAME/{order-{number}}/{id}.json`

with content

```
{
  "quantity": {some_number}
}
```

### update coffee (file name should be in format {id}.json)

`HASHICUPS_ORDERS_FOLDER_NAME/{order-{number}}/{id}.json`

update content with new number value

```
{
  "quantity": {some_number}
}
```

### delete coffee (file name should be in format {id}.json)

`HASHICUPS_ORDERS_FOLDER_NAME/{order-{number}}/{id}.json`

delete {id}.json file

## To perform CRUD operation

run command `cdktf deploy --auto-approve`

## automatic CRUD setup and operation

we have a watch folder script which can detect changes and run deploy command, make sure to hit save once the all data setup is done

Open new separate terminal and run command `npm run watch-orders` and keep it running

**_I have created my own provider as the one provided by the harshicorp does not support M1 mac, you can find provider with name `ashishyd/haschicups`_**

## final clean up

Press Ctrl+C to exit the running hashicups docker container then run command `pnpm run hashicups-stop`