
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routers from './routers/Router';
import { ConfigProvider, message } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';

console.log(process.env.APP_ID);

message.config({
  top: 30,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {},
          components: {},
        }}>
        <Provider store={store}>
          <Routers />
        </Provider>
      </ConfigProvider>
      <ToastContainer />
    </>
  );
}

export default App;
