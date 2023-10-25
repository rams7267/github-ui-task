import { Provider } from "react-redux";
import { store } from "@/Utils/Redux/store";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
