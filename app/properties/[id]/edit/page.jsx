'use client'

import LoadingPage from '@/app/loading';
import PropertyEditForm from '@/components/Properties/EditForm'
import { getPropertyById } from '@/services/requests';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const PropertyEditPage = () => {
  const { id } = useParams();
  const {data, isLoading, isError} = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id)
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return <p>Error</p>
  }

  let defaultRates;

  if (data?.rates) {
    defaultRates = {
      ...data.rates,
    };

    for (const rate in defaultRates) {
      if (defaultRates[rate] === null) {
        defaultRates[rate] = '';
      }
    }
  } else {
    defaultRates = {};
  }

  data.rates = defaultRates;

  return (
    <section className="bg-blue-50">
    <div className="container m-auto max-w-2xl py-24">
      <div
        className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <PropertyEditForm data={data} />
      </div>
    </div>
  </section>
  )
}

export default PropertyEditPage