import React from 'react';
import { withRouter } from 'react-router-dom';

import { ApolloConsumer } from 'react-apollo';

const onClick = (history,client) => {         // Çıkış yapınca
  localStorage.setItem('token','');          // Token Sıfırla
  history.push('/');                        // Anasayfaya yönlendir
  client.resetStore();                      // Client'i Resetle
};

const Logout = ( { history } ) => (
  <ApolloConsumer>
      {
          (client) => {
              console.log(client);
              return <button onClick={() => onClick(history, client ) }>Logout</button>
          }
      }
  </ApolloConsumer>
);

export default withRouter(Logout);