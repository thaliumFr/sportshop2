import { IonContent, IonList, IonLoading, IonItem, IonLabel, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './compte.css';

import React, { useState } from 'react';

type User = {
  login: string;
  name: string;
  surname: string;
  address: string;
  zip: string;
  city: string;
};

const Compte: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Replace this mock user with real user data from your auth/context/store
  const [user, setUser] = useState<User | null>({
    login: 'flbf',
    name: 'Leboeuf',
    surname: 'FRANCK',
    address: '123 Rue Exemple',
    zip: '34000',
    city: 'Montpellier',
  });

  const handleModifyField = (field: string) => {
    console.log(`Modifier ${field}`);
    // TODO: Implement navigation to edit page or open modal
  };

  const handleDeleteAccount = (): void => {
    console.log('Suppression du compte');
    // TODO: Implement account deletion
  };

  const handleDisconnect = (): void => {
    console.log('Déconnexion');
    // TODO: Implement disconnection logic
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="compte-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Compte</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Compte page" />
        <IonLoading isOpen={isLoading} message="Chargement..." />

        {user && (
          <IonList>
            <IonItem>
              <IonLabel>
                <h3>Pseudo</h3>
                <p>{user.login}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Nom</h3>
                <p>{user.name}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Prénom</h3>
                <p>{user.surname}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Adresse</h3>
                <p>{user.address}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Code postal</h3>
                <p>{user.zip}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Ville</h3>
                <p>{user.city}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Mot de passe</h3>
                <p>••••••••</p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}

        <IonGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center ion-text-center">
            <IonCol size="12" size-sm="3">
              <IonButton
                onClick={() => handleModifyField('login')}
                className="ion-margin"
              >
                Modifier mes informations
              </IonButton>
            </IonCol>
            <IonCol size="12" size-sm="3">
              <IonButton
                color="secondary"
                id='deco-alert'
                className="ion-margin"
              >
                Me déconnecter
              </IonButton>
            </IonCol>
            <IonCol size="12" size-sm="3">
              <IonButton
                color="danger"
                fill="outline"
                id='suppr-alert'
                className="ion-margin"
              >
                Supprimer mon compte
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          header="Suppression de compte"
          subHeader="Êtes-vous sûr de vouloir supprimer votre compte ?"
          message="Cette action est irréversible et supprimera toutes vos données."
          trigger="suppr-alert"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                console.log('suppr canceled');
              },
            },
            {
              text: 'Supprimer',
              role: 'confirm',
              handler: () => {
                console.log('suppression confirmed');
                handleDeleteAccount()
              },
            },
          ]}
          onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>

        <IonAlert
          header="Deconnexion"
          subHeader="Êtes-vous sûr de vouloir vous déconnecter ?"
          trigger="deco-alert"
          buttons={[
            {
              text: 'Anuler',
              role: 'cancel',
              handler: () => {
                console.log('déconnexion canceled');
              },
            },
            {
              text: 'me déconnecter',
              role: 'confirm',
              handler: () => {
                console.log('déconnexion confirmed');
                handleDisconnect();
              },
            },
          ]}
          onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
      </IonContent>
    </IonPage >
  );
};

export default Compte;