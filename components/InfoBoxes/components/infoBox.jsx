import React from 'react'
import Link from 'next/link'

const InfoBox = ({
  title,
  backgroundColor='bg-gray-100',
  textColor='text-gray-800',
  description,
  buttonInfo
}) => {

  return (
    <div className={`${backgroundColor} ${textColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">
        {description}
      </p>
      <Link
        href={buttonInfo.link}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {buttonInfo.label}
      </Link>
    </div>
  )
}

export default InfoBox