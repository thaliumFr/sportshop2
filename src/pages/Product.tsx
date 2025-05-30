import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Product.css';
import { cart as cartIcon } from 'ionicons/icons';
import { RouteComponentProps, withRouter } from "react-router";
import { Cart, Item } from '../back/cart';
import React from 'react';

import { useParams } from 'react-router-dom';


const Product: React.FC<RouteComponentProps> = ({ match }) => {
    const { id } = useParams<{ id: string }>();
    const cart = Cart.Get();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle><IonIcon aria-hidden="true" icon={cartIcon} /> Product</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <h1>{id}</h1>

                    <IonButton onClick={() => {
                        cart.AddProduct(new Item(id, "afeq", "sgfd", 1000, 1))
                        cart.Save()
                        console.log(cart.Get())
                    }}>Add to Cart</IonButton>
                </IonContent>
            </IonContent>
        </IonPage >
    );
};


export default Product;
