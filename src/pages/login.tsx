import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonLoading, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Login } from '../back/API';

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (!login || !password) {
      setShowError(true);
      return;
    }
    setIsLoading(true);
    const success = await Login(login, password);
    setIsLoading(false);
    if (success) {
      history.replace('/compte');
    } else {
      setShowError(true);
    }
  };

  const handleGoToRegister = () => {
    history.push('/register');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
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
        <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">
          Se connecter
        </IonButton>
        <IonButton expand="block" fill="outline" color="secondary" onClick={handleGoToRegister} className="ion-margin-top">
          Créer un compte
        </IonButton>
        <IonLoading isOpen={isLoading} message="Connexion..." />
        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message="Login ou mot de passe incorrect"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;