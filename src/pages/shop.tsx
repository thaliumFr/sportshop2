import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './shop.css';
import { storefront } from 'ionicons/icons';
import ShopItem from "../components/ShopItem";
import React from 'react';
import { getProducts } from "../back/API";
import { Item } from '../back/cart';
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
          <IonHeader>
            <IonToolbar>
              <IonTitle><IonIcon aria-hidden="true" icon={storefront} /> Magasin</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Magasin</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              {items.map((item: Item) => (
                <div key={item.reference}>
                  <ShopItem item={item} />
                </div>
              ))}
              <ShopItem item={new Item("a", "a", "aef0", 100, 1)} />
              <ShopItem item={new Item("b", "bb", "azertfef0", 2, 1)} />

            </IonContent>
          </IonContent>
        </IonPage >
      );
    }
  }
};

export default Shop;
