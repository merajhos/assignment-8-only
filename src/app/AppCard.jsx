import React from 'react';
import { Link } from 'react-router';

const AppCard = ({ app }) => {

const formatDownloads = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count;
};


  const { id, image, title, downloads, ratingAvg } = app;

  return (
    <Link to={`/appDetails/${id}`} 
      className=" block rounded-xl border border-gray-200 p-4 bg-white shadow-md cursor-pointer"
    >
      <div className="w-full h-32 md:h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <img 
            src={image} 
            alt={`${title} icon`} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/eeeeee/333333?text=App"; }}
        />
      </div>
      
      <h3 className="text-base md:text-lg font-semibold truncate mb-2 text-gray-800" title={title}>
        {title}
      </h3>
      
      <div className="flex justify-between items-center text-sm">
      
        <p className="text-blue-600 font-medium flex items-center">
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24"><path d="M12 21l-7-7h4v-7h6v7h4l-7 7z"></path></svg>
           {formatDownloads(downloads)}
        </p>
        
        <p className="text-yellow-500 font-bold flex items-center">
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
          {ratingAvg.toFixed(1)}
        </p>
      </div>
    </Link>
  );
};

export default AppCard;
