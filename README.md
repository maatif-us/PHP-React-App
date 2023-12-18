
# PHP + React Customers app



## Front End Setup
- `npm i`
- `npm run dev` 


## Backend Setup
- `cd Api`
- `cp .env.example .env`
- `composer i && php artisan key:generate`
- `php artisan migrate`
- `php artisan serve`

## API Reference

#### Get all customers

```http
  GET /api/customers
```


#### Get item

```http
  POST /api/customers/store
```

| Type     | Description                       |
| :------- | :-------------------------------- |
| `formData` | **Required**. fullName, email, address, phoneNumber



#### Update Customer

```http
  PATCH /api/customers/update/{$customerID}
```

| parameter |
| :-------  |
| `customerId`| 

#### Update Customer

```http
  DELETE /api/customers/destroy/{$customerID}
```

| parameter |
| :-------  |
| `customerId`| 

