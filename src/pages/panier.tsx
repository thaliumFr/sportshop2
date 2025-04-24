import { IonContent, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './panier.css';
import { cart, storefront } from 'ionicons/icons';
import { Item } from '../back/cart';
import PanierItem from '../components/PanierItem';
// import { use, useEffect, useState } from 'react';
// import { getProducts } from '../back/API';



const Panier: React.FC = () => {
  // let products = use(getProducts());

  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   // React advises to declare the async function directly inside useEffect
  //   async function getToken() {
  //     const data = await getProducts()
  //     setToken(data);
  //   };

  //   // You need to restrict it at some point
  //   // This is just dummy code and should be replaced by actual
  //   if (!token) {
  //     getToken();
  //   }
  // }, []);

  let products = [
    new Item("tapis-courses-a", "tapis de course", "aefzgheg", 1000, 2),
    new Item("tapis-courses-b", "tapis de course", "dsf", 2500, 4),
    new Item("tapis-courses-c", "tapis de course", "SFH", 1400, 5),
    new Item("tapis-courses-d", "tapis de course", "aefSGwgdzgheg", 3141, 1)
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonIcon aria-hidden="true" icon={cart} /> Panier</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {products.map(item => {
              return (
                <PanierItem item={item} />
              )
            })}

          </IonList>
        </IonContent>

      </IonContent>
    </IonPage>
  );
};

export default Panier;
