import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonLoading, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../back/API';

const RegisterPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const history = useHistory();

  const handleRegister = async () => {
    if (!login || !password || !name || !surname || !address || !zip || !city) {
      setShowError(true);
      return;
    }
    setIsLoading(true);
    try {
      await createUser(name, surname, address, zip, city, password, login);
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => history.replace('/login'), 1500);
    } catch (e) {
      setIsLoading(false);
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Créer un compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Login</IonLabel>
          <IonInput value={login} onIonChange={e => setLogin(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mot de passe</IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nom</IonLabel>
          <IonInput value={name} onIonChange={e => setName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Prénom</IonLabel>
          <IonInput value={surname} onIonChange={e => setSurname(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Adresse</IonLabel>
          <IonInput value={address} onIonChange={e => setAddress(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Code postal</IonLabel>
          <IonInput value={zip} onIonChange={e => setZip(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Ville</IonLabel>
          <IonInput value={city} onIonChange={e => setCity(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleRegister} className="ion-margin-top">
          S'inscrire
        </IonButton>
        <IonLoading isOpen={isLoading} message="Création du compte..." />
        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message="Erreur lors de la création du compte"
          duration={2000}
          color="danger"
        />
        <IonToast
          isOpen={showSuccess}
          onDidDismiss={() => setShowSuccess(false)}
          message="Compte créé avec succès !"
          duration={1500}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;