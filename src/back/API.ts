import { Item } from "./cart";

const address = "https://sportappi.enzomtp.party/api/";

async function Get(path: string): Promise<any> {
    const json = await fetch(address + path);
    return JSON.parse(await json.text())
}

//#region PRODUCTS
export async function getProducts(): Promise<Item[]> {
    let data = await Get("products")
    console.log(data)
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