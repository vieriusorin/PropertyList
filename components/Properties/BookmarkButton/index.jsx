'use client';
import { useState, useEffect} from 'react'
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FaBookmark, FaSpinner } from "react-icons/fa6"
import { toast } from 'react-toastify';

const BookmarkButton = ({property}) => {

  const {data: session} = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUserBookmarks = useMutation({
    queryKey: ["checkBookmarks", property.id],
    mutationFn: (data) => fetch("/api/bookmarks/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }) 

  const mutation = useMutation({
    queryKey: ["bookmarkProperty", property.id],
    mutationFn: (data) => fetch("/api/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  })

  const handleBookmark = () => {
    if (!userId) {
      toast.error('You need to be logged in to bookmark');
      return;
    }

    mutation.mutate({
      propertyId: property._id,
    }, {
      onSuccess: async (data) => {
        if (data.status === 200) {
          const res = await data.json();
          setIsBookmarked(res.isBookmarked);
          toast.success(res.message);
        }
        
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  }

  useEffect(() => {
    if (!userId) return;
    
    setIsLoading(true);
    getUserBookmarks.mutate({
      propertyId: property._id,
    }, {
      onSuccess: async (data) => {
        if (data.status === 200) {
          const res = await data.json();
          setIsBookmarked(res.isBookmarked);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSettled: () => setIsLoading(false)
    })
  }, [])


  if (isLoading) return <div className='flex justify-center'><FaSpinner className="w-6 h-6 animate-spin  text-blue-500" /></div>

  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Bookmark Property
    </button>
  );
}

export default BookmarkButton