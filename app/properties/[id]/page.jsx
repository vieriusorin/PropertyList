'use client'
import Link from 'next/link';
import LoadingPage from '@/app/loading';
import PropertyHeaderImage from '@/components/Properties/HeaderImage';
import { getPropertyById } from '@/services/requests';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyDetails from '@/components/Properties/PropertyDetails';
import BookmarkButton from '@/components/Properties/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/Properties/ContactForm';


const SingleProperty = () => {
  const { id } = useParams();

  const { data: property, error, isLoading } = useQuery({
		queryKey: ["property", id],
		queryFn: () => getPropertyById(id)
	});

  if (isLoading) return <LoadingPage />;

  if (error) return <p>Error</p>;

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={property} />

            <aside className='space-y-4'>
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleProperty