import { body } from "ionicons/icons";
import { Item } from "./cart";
import { genSalt, hash, compare } from 'bcryptjs';

const passwordSettings = {
    saltRounds: 12
}

const address = "https://sportappi.enzomtp.party/api/";

async function Get(path: string): Promise<any> {
    return await fetch(address + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": import.meta.env.VITE_API_KEY
        },
    }).then(async response => {

        if (response.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }

        if (response.status !== 200) {
            throw new Error("Error " + response.status + ": " + await response.text());
        }
        return JSON.parse(await response.text());

    });
}

async function Post(path: string, body: any): Promise<any> {
    const json = await fetch(address + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify(body)
    });


    if (json.status !== 201) {
        throw new Error("Error " + json.status + ": " + await json.text());
    }

    return JSON.parse(await json.text())
}

//#region PRODUCTS
export async function getProducts(): Promise<Item[]> {
    let data = await Get("products")
    console.log(data)
    let items: Item[] = []

    for (let i = 0; i < data.length; i++) {
        let item = new Item(data[i].reference, data[i].name, data[i].desc, data[i].price, data[i].quantity)

        let img = await getProductImages(data[i].reference);
        item.images = img;

        items.push(item)
    }

    return items
}

export async function getProduct(id: string) {
    return await Get("products/" + id)
}

export async function getProductsCount() {
    let products = await Get("products")
    return products.length;
}

export async function getProductImages(id: string) {
    return await Get("products/" + id + "/images")
}

//#endregion PRODUCTS

//#region USER
export async function getUsers() {
    return await Get("users")
}

export async function getUser(id: number) {
    return await Get("users/" + id)
}

export async function createUser(name: string, surname: string, address: string, zip: string, city: string, password: string, login: string) {

    const salt = await genSalt(passwordSettings.saltRounds)
    password = await hash(password, salt);

    let body = {
        name: name,
        surname: surname,
        address: address,
        zip: zip,
        city: city,
        password: password,
        login: login
    }

    return await Post("users", body)
}

export function getUserLogin(login: string) {
    return Get("users/login/" + login)
}

export async function Login(login: string, password: string): Promise<boolean> {
    let user = await getUserLogin(login);

    if (user === null) {
        return false;
    }

    let isValid = await compare(password, user.password);
    if (!isValid) {
        console.log("Invalid password");
        return false;
    }

    localStorage.setItem("user", JSON.stringify(await getUser(user.id)));
    return true;
}
//#endregion USER

//#region ORDERS
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

export async function createOrder(delivery_address: string, price: number, id_user: string, products: Item[]) {
    let body = {
        delivery_address: delivery_address,
        price: price,
        id_user: id_user,
        products: products.map(item => ({
            reference: item.reference,
            quantity: item.quantity,
        }))
    }

    return await Post("orders", body)
}
//#endregion ORDERS