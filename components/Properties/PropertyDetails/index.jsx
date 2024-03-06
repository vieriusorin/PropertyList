import Amenities from '../Amenities';
import LocationRates from '../LocationRates';
import DescriptionDetails from '../DescriptionDetails';
import Images from '../Images';
import PropertyMap from '@/components/PropertyMap';

const PropertyDetails = ({property}) => {
  return (
    <main>
      <LocationRates property={property}/>
      <DescriptionDetails property={property}/>
      <Amenities property={property} />
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <PropertyMap property={property} />
      </div>
      <Images images={property.images} />
    </main>
  )
}

export default PropertyDetails