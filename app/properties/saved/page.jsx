'use client';
import LoadingPage from '@/app/loading';
import Property from '@/components/Properties/Item';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {

  const { isLoading, data: properties, error } = useQuery({
    queryKey: ["savedProperties"],
    queryFn: async () => {
      const res = await fetch("/api/bookmarks");
      return res.json();
    },
  });
  if (isLoading) return <LoadingPage />;

  if (error) return <p>Error</p>;

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {properties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <Property key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SavedPropertiesPage