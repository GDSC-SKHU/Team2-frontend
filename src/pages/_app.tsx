import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '../styles/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
