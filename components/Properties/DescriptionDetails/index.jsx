import {
  FaBed,
  FaBath,
  FaRulerCombined,
} from 'react-icons/fa';

const DescriptionDetails = ({property}) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
      <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
      <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
        <p>
          <FaBed className='inline-block mr-2' /> {property.beds}{' '}
          <span className='hidden sm:inline'>Beds</span>
        </p>
        <p>
          <FaBath className='inline-block mr-2' /> {property.baths}{' '}
          <span className='hidden sm:inline'>Baths</span>
        </p>
        <p>
          <i className='fa-solid fa-ruler-combined'></i>
          <FaRulerCombined className='inline-block mr-2' />
          {property.square_feet}{' '}
          <span className='hidden sm:inline'>sqft</span>
        </p>
      </div>
      <p className='text-gray-500 mb-4 text-center'>{property.description}</p>
    </div>
  )
}

export default DescriptionDetails