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


## Testing

Create restaurant

```bash
http POST ":3333/restaurants" restaurantName="Pizza Hut" managerName="Thiago Santana" phone="123456789" email="manager.thiago@pizzashop.com" 
```

Get restaurant

```bash
http GET ":3333/restaurants"
```