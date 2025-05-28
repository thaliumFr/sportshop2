# Documentation APP-API

## Global functions

> [!WARNING]
> Ces fonction ne servent que de support pour les autres fonctions, elle ne doivent pas être utilisées directement car ne donne aucun formatage ou verification de données auparavant.

### Get

function: ``Get(path)``

#### Parameters

path (string) - the API url path.

**Example**

```ts
let users = await Get("users")
// returns the content of the api form /api/users
```

## Products

### Get all products

function: ``getProducts()``
*pulls from: <https://sportappi.enzomtp.party/api/products/>*

**Example**

```ts
let products = await getProducts()

for(let product in products){
    console.log(product.reference, product.name, product.description, product.price )
}
```

### Get a Product

function: ``getProduct(reference)``
*pulls from: <https://sportappi.enzomtp.party/api/products/(reference)>*

**Example**

```ts
let shorts = await getProduct('best-shorts-ever')

console.log(shorts.reference, shorts.name, shorts.description, shorts.price )
```

### Get all Product number

function: ``getProductsCount()``
*pulls from: <https://sportappi.enzomtp.party/api/products>*

## Users

### Get all Users

function: ``getUsers()``
*pulls from: <https://sportappi.enzomtp.party/api/users/>*

### Get a User

function: ``getUser(id)``
*pulls from: <https://sportappi.enzomtp.party/api/users/(id)>*

**Example**

```ts
let myUser = await getUser('3ed75d43-3b01-11f0-bed1-8e3d9a028201')
// returns the content of the api form /api/users
```

### Créer un User

function: ``createUser(name, surname, address, zip, city, password, login)``
*pulls from: <https://sportappi.enzomtp.party/api/users/> (POST)*
