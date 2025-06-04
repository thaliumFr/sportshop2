import { Item } from "./cart";
import { genSalt, hash, compare } from 'bcryptjs';

const passwordSettings = {
    saltRounds: 12
}

const primaryAddress = "https://sportappi.enzomtp.party/api/";
//const primaryAddress = "http://localhost/404/"; // Force l'échec
const fallbackAddress = "http://localhost/sportapi/"; // l'API WAMP locale

// Adapte le chemin pour la fallback locale (PHP)
function adaptPathForFallback(path: string): string {
    if (path.startsWith("products")) {
        if (path === "products") return "products.php";
        const parts = path.split("/");
        if (parts.length === 2) return `product.php?reference=${parts[1]}`;
        if (parts.length === 3 && parts[2] === "images") return `product_images.php?reference=${parts[1]}`;
    }
    if (path.startsWith("users")) {
        if (path === "users") return "users.php";
        const parts = path.split("/");
        if (parts.length === 2) return `user.php?id=${parts[1]}`;
        if (parts.length === 3 && parts[1] === "login") return `user_login.php?login=${parts[2]}`;
    }
    if (path.startsWith("orders")) {
        if (path === "orders") return "orders.php";
        const parts = path.split("/");
        if (parts.length === 2) return `order.php?id=${parts[1]}`;
    }
    // Ajoute d'autres adaptations si besoin
    return path;
}

async function fetchWithFallback(path: string, options?: RequestInit): Promise<any> {
    try {
        const res = await fetch(primaryAddress + path, options);
        if (!res.ok) throw new Error("Primary API failed");
        return await res.json();
    } catch (e) {
        console.warn("Primary API failed, trying fallback:", e);
        const fallbackPath = adaptPathForFallback(path);
        const res = await fetch(fallbackAddress + fallbackPath, options);
        if (!res.ok) throw new Error("Fallback API failed");
        return await res.json();
    }
}

async function Get(path: string): Promise<any> {
    return fetchWithFallback(path);
}

async function Post(path: string, body: any): Promise<any> {
    return fetchWithFallback(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(body)
    });
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
export async function getOrder(id: number) {
    return await Get("orders/" + id)
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