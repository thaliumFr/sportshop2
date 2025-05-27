import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import './shop.css';
import ShopItem from "../components/ShopItem";
import React from 'react';
import { getProducts } from "../back/API";
import { Item } from '../back/cart';
import { IonSearchbar } from '@ionic/react';
// let products = getProducts()

interface ShopState {
  error: any;
  isLoaded: boolean;
  items: Item[];
}

class Shop extends React.Component<{}, ShopState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    getProducts()
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <IonPage>
          <link rel="stylesheet" href="shop.css" />
          <IonHeader>
            <IonToolbar>
              <IonImg
                src="./resources/icon.png"
                className='logoM2l'
                alt="Logo SportShop"
              ></IonImg>
              <IonTitle size='large'>SportShop</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonSearchbar animated={true} placeholder='Rechercher'></IonSearchbar>
            <IonContent className="ion-padding">
              {items.map((item: Item) => (
                <div key={item.reference}>
                  <ShopItem item={item} />
                </div>
              ))}

              {items.length == 0 && <IonItem><IonLabel>Aucun produit disponible</IonLabel></IonItem>}

            </IonContent>
          </IonContent>
        </IonPage >
      );
    }
  }
};

export default Shop;
