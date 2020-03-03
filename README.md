# Code Climate Connector SDK

The SDK for building Code Climate Connectors. This package provides code for
connectors to use in their implementations, and a CLI to help with developing
connectors.

## Record schemas

See [docs/schemas/README.md](docs/schemas/README.md) for a reference of the
types of records Code Climate Connectors can use.

## CLI

From within a connectors package that depends on this package, run `yarn
codeclimate-connectors` to run the CLI.

### Running a connector

The CLI can be used to run connectors locally during development to verify
behavior. To get started, use the CLI's `help` functionality:

```
yarn run codeclimate-connector help  # See general help
yarn run codeclimate-connector sync-stream --help  # Help for a specific command
```

## Creating a new connector

See https://github.com/codeclimate/create-codeclimate-connector.

## Development

Clone this repo, run `yarn install` to install dependencies. `yarn test` will
run unit tests. See [DEVELOPERS.md](DEVELOPERS.md) for more in depth details
about working on this package.

