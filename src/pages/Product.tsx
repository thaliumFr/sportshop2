import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Product.css';
import { cart as cartIcon } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import { cart, Item } from '../back/cart';

interface ProductDetailProps
    extends RouteComponentProps<{
        id: string;
    }> { }

const Product: React.FC<ProductDetailProps> = ({ match }) => {
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
                    <h1>{match.params.id}</h1>

                    <IonButton onClick={() => {
                        cart.AddProduct(new Item(match.params.id, "afeq", "sgfd", 1000, 1))
                        cart.Save()
                        console.log(cart.Get())
                    }}>Add to Cart</IonButton>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default Product;
