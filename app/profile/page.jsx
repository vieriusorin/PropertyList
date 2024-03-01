'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import LoadingPage from "../loading"
import profileDefault from '@/assets/images/profile.png';
import { getUserPropertiesList, removePropertyById } from "@/services/requests"
import { toast } from 'react-toastify';


const Profile = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  const userId = session?.user?.id;

  const removeProperty = useMutation({
    queryKey: ["removePropertyById"],
    mutationFn:  (id) => removePropertyById(id),
  })

  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ["userProperties"],
    queryFn: async () => await getUserPropertiesList(userId)
  })

  const handleDeleteProperty = (propertyId) => {
    removeProperty.mutate(propertyId, {
      onSuccess: () => {
        queryClient.invalidateQueries("userProperties");
        toast.success("Property deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  }

  if (isLoading) return <LoadingPage loading={isLoading} />

  if (isError) return <p>Error getting data</p>

  if (properties.length === 0) {
    return <p>You have no property listing</p>
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt='User'
                />
              </div>
              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {profileName}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {profileEmail}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {
                properties.map((property) => (
                  <div key={property._id} className='mb-10'>
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className='h-32 w-full rounded-md object-cover'
                        src={property.images[0]}
                        alt=''
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className='mt-2'>
                      <p className='text-lg font-semibold'>{property.name}</p>
                      <p className='text-gray-600'>
                        Address: {property.location.street}{' '}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className='mt-2'>
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                        type='button'
                      >
                        {
                          removeProperty.status === 'pending'
                         ? 'Deleting...'
                            : removeProperty.status ==='success'
                           ? 'Deleted'
                              : 'Delete'
                        }
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile