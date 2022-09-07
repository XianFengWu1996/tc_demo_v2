import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure({
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

export default function NProgressSetUp() {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
}
