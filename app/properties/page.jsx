import React from 'react'
import properties from '@/properties.json'
import PropertiesList from '@/components/Properties/List'
const PropertiesPage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <PropertiesList properties={properties} />
      </div>
    </section>
  )
}

export default PropertiesPage