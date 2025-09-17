import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigator from './navigation/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
