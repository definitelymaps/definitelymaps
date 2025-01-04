# Definitely Maps

Collaborative maps for everyone.

Check out the [demo](https://definitelymaps.app)


## Development

We provide a self-contained reproducible docker environment; to start it all up

```bash
just
just build
just up
```

To get a shell in the containers for development

```bash
just backend-sh
just frontend-sh
```

To work with the postgres database

```bash
just postgres-migrate
just postgres-sh
```


# License

Copyright (c) 2022-2025 definitely maps.

Distributed under the MIT License (MIT).
