import { IonContent, IonList, IonLoading, IonItem, IonLabel, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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

  const handleDeleteAccount = (event: React.MouseEvent<HTMLIonButtonElement>): void => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');
    if (confirmDelete) {
      console.log('Suppression du compte');
      // TODO: Implement account deletion
    }
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

        <div style={{ padding: '20px', textAlign: 'center' }}>
          <IonButton 
                onClick={() => handleModifyField('login')}
              >
                Modifier mes informations
          </IonButton>
                  </div>
                  <div style={{textAlign: 'center' }}>
          <IonButton 
            color="danger"
            fill="outline"
            size="small"
            onClick={handleDeleteAccount}
          >
            Supprimer mon compte
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Compte;