import AppRouter from './router';
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from 'common/base-ui/toast/toast-container';
import AppLayout from 'common/app-layout';

function App() {
  return (
    <AppLayout>
      <AppRouter />
      <CustomToastContainer />
    </AppLayout>
  );
}

export default App;
