'use client';

import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom'
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertySchema } from './schema';
import Textarea from '@/components/ui/textarea/index.jsx';
import Checkbox from '@/components/ui/checkbox';
import { Controller } from "react-hook-form"
import Select from '@/components/ui/select';
import { POST_PROPERTY } from '@/app/api/properties/add/route';
import InputFile from '@/components/ui/inputFile';

const amenities = [
  {
    id: 'amenity_wifi',
    value: 'Wifi'
  },
  {
    id: 'amenity_kitchen',
    value: 'Full Kitchen'
  },
  {
    id: 'amenity_washer_dryer',
    value: 'Washer/Dryer'
  },
  {
    id: 'amenity_free_parking',
    value: 'Free Parking'
  },
  {
    id: 'amenity_pool',
    value: 'SwimmingPool'
  },
  {
    id: 'amenity_hot_tub',
    value: 'Hot Tub'	
  },
  {
    id: 'amenity_24_7_security',
    value: '24/7 Security'
  },
  {
    id: 'amenity_wheelchair_accessible',
    value: 'Wheelchair Accessible'
  },
  {
    id:'amenity_elevator_access',
    value: 'Elevator Access' 
  },
  {
    id: 'amenity_dishwasher',
    value: 'Dishwasher'	
  },
  {
    id: 'amenity_gym_fitness_center',
    value: 'Fitness center'	
  },
  {
    id: 'amenity_air_conditioning',
    value: 'Air Conditioning'
  },
  {
    id: 'amenity_balcony_patio',
    value: 'Balcony/Patio'
  },
  {
    id: 'amenity_smart_tv',
    value: 'Smart TV'	
  },
  {
    id: 'amenity_coffee_maker',
    value: 'Coffee Maker'
  }
]

const propertyTypes = [
  {
    value: 'Apartment',
    label: 'Apartment'
  },
  {
    value: 'Condo',
    label: 'Condo'
  },
  {
    value: 'House',
    label: 'House'
  },
  {
    value: 'Cabin or Cottage',
    label: 'Cabin or Cottage'
  },
  {
    value: 'Room',
    label: 'Room'
  },
  {
    value: 'Studio',
    label: 'Studio'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]

const PropertyAddForm = () => {
  const { pending } = useFormStatus()

  const { control } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: zodResolver(PropertySchema),
  });

  return (
    <form action={POST_PROPERTY}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Add Property
      </h2>

      <Select
        label="Property Type"
        name="type"
        control={control}
        options={propertyTypes}
      />

      <Input
        label="Listing Name"
        name="name"
        placeholder="eg. Beautiful Apartment In Miami"
        control={control}
      />

      <Textarea
        label="Description"
        name="description"
        placeholder="Add an optional description of your property"
        control={control}
      />

      <div className="mb-4 bg-blue-50 p-4">
        <Input
          label="Location"
          name="location.street"
          placeholder="Street"
          control={control}
        />

        <Input
          name="location.city"
          placeholder="City"
          control={control}
        />

        <Input
          name="location.state"
          placeholder="State"
          control={control}
        />

        <Input
          name="location.zipcode"
          placeholder="Zip code"
          control={control}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <Input
            label="Beds"
            name="beds"
            placeholder="Number of beds"
            control={control}
            type="number"
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <Input
            label="Baths"
            name="baths"
            placeholder="Number of baths"
            control={control}
            type="number"
          />
        </div>

        <div className="w-full sm:w-1/3 pl-2">
          <Input
            label="Square Feet"
            name="square_feet"
            placeholder="Enter the square feet"
            control={control}
            type="number"
          />
        </div>
      </div>

      <div className='mb-4'>
        <p className="text-base mb-3 font-bold">Amenities</p>
        <Controller
          name="amenities"
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            return (
              <div className="grid grid-cols-2 md:grid-cols-3">
                {
                  amenities.map((amenity) => (
                    <Checkbox
                      key={amenity.id}
                      id={amenity.id}
                      name={field.name}
                      value={amenity.value}
                      label={amenity.value}
                      control={control}
                      field={field}
                    />
                  ))
                }
              </div>
          )}} />
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2"
          >Rates (Leave blank if not applicable)</label
        >
        <div
          className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <div className="flex items-center">
            <Input
              name="rates.weekly"
              placeholder="Weekly Rate"
              control={control}
              type="number"
            />
          </div>
          <div className="flex items-center">
            <Input
              name="rates.monthly"
              placeholder="Monthly Rate"
              control={control}
              type="number"
            />
          </div>
          <div className="flex items-center">
            <Input
              name="rates.nightly"
              placeholder="Nightly Rate"
              control={control}
              type="number"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <Input
          label="Seller Name"
          name="seller_info.name"
          placeholder="Seller Name"
          control={control}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Seller Email"
          name="seller_info.email"
          placeholder="Seller Email"
          type="email"
          control={control}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Seller Phone"
          name="seller_info.phone"
          placeholder="Seller Phone"
          type="tel"
          control={control}
        />
      </div>

      <div className="mb-4">
        <InputFile name="images" control={control} multiple accept="image/png, image/jpeg, image/jpg"  />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        disabled={pending}
        type="submit"
      >
        Add Property
      </button>
    </form>
  )
}

export default PropertyAddForm