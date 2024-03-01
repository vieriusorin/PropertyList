import PropertiesList from '@/components/Properties/List'
import { getProperties } from '@/services/requests';

const PropertiesPage = async () => {
  const properties = await getProperties();

  // Sort properties by date created
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <PropertiesList properties={properties} />
      </div>
    </section>
  )
}

export default PropertiesPage