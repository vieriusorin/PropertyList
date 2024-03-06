"use client";

import { useState } from "react";
import LoadingPage from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import Property from "../Item";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

const PropertiesList = () => {
	const searchParams = useSearchParams();

	const [page, setPage] = useState(1);

	const currentPage = parseInt(searchParams.get("page") || page);
	const perPage = parseInt(searchParams.get("perPage") || 9);
	const location = searchParams.get("location");
	const propertyType = searchParams.get("propertyType");

	const {
		data: properties,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["properties", page, perPage, location, propertyType],
		queryFn: async () => {
			const res = await fetch(
				`/api/properties?page=${currentPage}&perPage=${perPage}${
					!!location ? `&location=${location}` : ""
				}${!!propertyType ? `&propertyType=${propertyType}` : ""}`
			);
			return res.json();
		},
	});

	if (isLoading) return <LoadingPage />;

	if (error) return <p>Error: {error.message}</p>;

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	return (
		<section className='py-4'>
			{properties.properties.length > 0 ? (
				<>
					<div className='container m-auto py-24 max-w-6xl'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{properties.properties.map((property) => (
								<Property key={property._id} property={property} />
							))}
						</div>
					</div>

					<div className='container m-auto  max-w-6xl'>
						<Pagination
							page={page}
							pageSize={perPage}
							totalItems={properties.total}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			) : (
				<div className='container m-auto py-24 max-w-6xl'>
					<p className='text-center text-gray-500'>
						No properties found for <strong>{propertyType}</strong> in{" "}
						<strong> {location}</strong>
					</p>
				</div>
			)}
		</section>
	);
};

export default PropertiesList;
