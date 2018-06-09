# jscoin nodes pool manager

## Description

Simple server which manage all started mining nodes
Collecting all started nodes and sending list of currenctly active nodes to everyone
Also listen notifications from nodes and notify others if someone added new block to chain

PS. No test coverage. No API documantation. Just as is:)

## Environment

`Node >= 8.11.2`

```
export DEBUG=jscoin*                              # debug information in console
export PORT=8080                                  # application server port
```

## Start

 - Clone or download this repository
``` bash
git clone
```

 - Enter your local directory, and install dependencies:

``` bash
npm i
```

## Commands

``` bash
# run server in development mode
npm run dev
```

``` bash
# build documentation
npm run doc
```

``` bash
# run linter
npm run lint
```

``` bash
# run tests
npm test
```

## Docker

 - For start application inside docker container use command
``` bash
docker run -d --name=jscoin-miner-pool \
  -p 8285:8080 \
  -e DEBUG="jscoin*" \
  --restart=always dpanchenko/jscoinminerpool:latest
```


