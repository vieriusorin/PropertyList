'use client'

import LoadingPage from "@/app/loading";
import Property from "@/components/Properties/Item";
import PropertySearchForm from "@/components/PropertySearchForm";
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const PageSearchResults = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  
  const { isLoading, data: properties, error } = useQuery({
    queryKey: ["searchedProperties", location, propertyType],
    queryFn: async () => {
      const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`);
      return res.json();
    },
  })

  

  if (isLoading) return <LoadingPage />

  if (error) return <p>Error</p>
  
  return (
    <>
     <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            <Link
              href='/properties'
              className='flex items-center text-blue-500 hover:underline mb-3'
            >
              <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
    
            </Link>
            <h1 className='text-2xl mb-4'>Search Results</h1>
            {properties.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {properties.map((property) => (
                  <Property key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
    </>
  )
}

export default PageSearchResults