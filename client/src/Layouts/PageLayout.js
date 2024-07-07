import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PageLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
export default PageLayout;
