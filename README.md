# pizzashop-api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

--

## Drizzle ORM

To generate migrations

```bash
bun generate
```

To apply migrations

```bash
bun migrate
```

To seed data

```bash
bun seed
```

To open Drizzle Studio

- NodeJS >= v18 required.

```bash
bun studio
```

--

## REST API

- [httpie](https://httpie.io/) required

Send Auth Link

```bash
http POST ":3333/authenticate" email="manager.thiago@pizzashop.com"
```

Auth from Link

```bash
http GET ":3333/auth-links/authenticate?code=bzm5b4iufhit3t3pldacv6lw&redirect=http://localhost:5173"
```

Create Restaurant

```bash
http POST ":3333/restaurants" restaurantName="Pizza Hut" managerName="Thiago Santana" phone="123456789" email="manager.thiago@pizzashop.com" 
```

Get Managed Restaurant

```bash
http GET ":3333/managed-restaurant" Cookie:auth=<jwt-token>; Max-Age=604800; Path=/; HttpOnly
```

Get User Profile

```bash
http GET ":3333/me" Cookie:auth=<jwt-token>; Max-Age=604800; Path=/; HttpOnly
```