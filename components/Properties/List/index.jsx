import React from 'react'
import Property from '../Item'

const PropertiesList = ({properties}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {
        properties.map((property) => (
          <Property key={property._id} property={property} />
        ))
      }
    </div>
  )
}

export default PropertiesList