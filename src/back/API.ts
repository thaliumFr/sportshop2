import { Item } from "./cart";

const address = "https://sportappi.enzomtp.party/api/";

async function Get(path: string): Promise<any> {
    const json = await fetch(address + path);
    return [
        { id: 1, name: "Tapis de course", desc: "Tapis de course", price: 1000, quantity: 2 },
        { id: 2, name: "Tapis de course", desc: "Tapis de course", price: 2500, quantity: 4 },
        { id: 3, name: "Tapis de course", desc: "Tapis de course", price: 1400, quantity: 5 },
        { id: 4, name: "Tapis de course", desc: "Tapis de course", price: 3141, quantity: 1 }
    ]
    //return JSON.parse(await json.json())
}

//#region PRODUCTS
export async function getProducts(): Promise<Item[]> {
    let data = await Get("products")
    let items: Item[] = []
    for (let i = 0; i < data.length; i++) {
        items.push(new Item(data[i].id, data[i].name, data[i].desc, data[i].price, data[i].quantity))
    }

    return items
}

export async function getProduct(id: number) {
    return await Get("products/" + id)
}

export async function getProductsCount() {
    let products = await Get("products")
    return products.length;
}
//#endregion PRODUCTS

//#region USER
export async function getUsers() {
    return await Get("users")
}

export async function getUser(id: number) {
    return await Get("users/" + id)
}
//#endregion USER

//#region PRODUCTS
export async function getOrders() {
    return await Get("orders")
}

export async function getOrder(id: number) {
    return await Get("orders/" + id)
}

export async function getOrdersCount() {
    let orders = await Get("orders/")
    return orders.length
}
//#endregion PRODUCTS