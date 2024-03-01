import 'photoswipe/dist/photoswipe.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css'


import Navbar  from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/';
import TanstackProvider from '@/providers/TanstackProvider';
import AuthProvider from '@/providers/AuthProvider';

import { ToastContainer } from 'react-toastify';

export const metadata = {
	title: 'Property Pulse',
  description: 'Find your dream property',
	keywords: 'rental, properties, ownership, property',
}


const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang='en' suppressHydrationWarning>
				<head>
					<title>{metadata.title}</title>
					<meta name='description' content={metadata.description} />
					<meta name='keywords' content={metadata.keywords} />
				</head>
				<body className=''>
					<TanstackProvider>
						<Navbar />
						{children}
						<Footer />
						<ToastContainer />
					</TanstackProvider>
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
