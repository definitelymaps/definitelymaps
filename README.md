# Definitely Maps

Collaborative maps for everyone.

Check out the [demo](https://definitelymaps.app)


## Development

We provide a self-contained reproducible docker environment; to start it all up

```bash
make
make up
```

To get a shell in the containers for development

```bash
make backend-sh
make frontend-sh
```

To work with the postgres database

```bash
make postgres-migrate
make postgres-sh
```


# License

Copyright (c) 2022 definitely maps.

Distributed under the MIT License (MIT).
