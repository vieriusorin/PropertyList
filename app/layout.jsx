import '@/assets/styles/globals.css'
import Navbar  from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/';

export const metadata = {
	title: 'Property Pulse',
  description: 'Find your dream property',
	keywords: 'rental, properties, ownership, property',
}

const MainLayout = ({ children }) => {
	return (
		<html lang='en'>
			<head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='keywords' content={metadata.keywords} />
			</head>
			<body className=''>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
};

export default MainLayout;
