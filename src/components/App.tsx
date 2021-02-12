import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import { LoggedInRouter } from '../routers/logged-in-router';
import { LoggedOutRouter } from '../routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar); // hooks(useReactiveVar)를 사용해서 gql 쿼리를 직접 작성하지 않고 state를 확인
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
