import React from 'react'
import InfoBox from './components/infoBox'

const data = [
  {
    title: 'For renters',
    description: 'Find your dream rental property. Bookmark properties and contact owners.',
    buttonInfo: {
      label: 'Browse Properties',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-900',
      link: '/properties',
    }
  },
  {
    title: 'For Property Owners',
    description:"List your properties and reach potential tenants. Rent as an airbnb or long term.",
    label:"Add Property",
   
    buttonInfo: {
      label: 'Add Property',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-900',
      link: "/properties/add",
    }
  }
]

 const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {
            data.map((item, index) => {
              return (
                <InfoBox 
                  key={index} 
                  title={item.title} 
                  description={item.description} 
                  buttonInfo={item.buttonInfo} 
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes