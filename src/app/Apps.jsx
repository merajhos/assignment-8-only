import React, { useState, useMemo, useEffect } from 'react';
import { Form, useLoaderData } from 'react-router';
import AppCard from './AppCard';
import LoadingSpinner from '../components/loadingSpinner';
import AppNotFound from '../components/AppNotFound';
const Apps = () => {
  const appData = useLoaderData();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); 
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    if (searchTerm || sortOrder !== 'none') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300); 
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [searchTerm, sortOrder]);
  const filteredAndSortedApps = useMemo(() => {
    let currentApps = [...appData];

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      currentApps = currentApps.filter(app => 
        app.title.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    if (sortOrder === 'high-low') {
      currentApps.sort((a, b) => b.downloads - a.downloads);
    } else if (sortOrder === 'low-high') {
      currentApps.sort((a, b) => a.downloads - b.downloads);
    }
    
    return currentApps;
  }, [searchTerm, sortOrder, appData]);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  
  const totalAppsFound = filteredAndSortedApps.length;

  return (
    <div className="container mx-auto p-4 md:p-8">
      
      <div className="text-center mb-10 pt-4">
        <h1 className="text-4xl font-extrabold ">Our All Applications</h1>
        <p className="text-lg text-gray-500 mt-2">
          Explore All Apps on the Market developed by us. We code for Millions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        
        <div className="text-xl font-semibold text-gray-700">
          ({totalAppsFound}) Apps Found
        </div>

        <Form onSubmit={(e) => e.preventDefault()}className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
 <select 
            onChange={handleSortChange} 
            value={sortOrder}
            className="border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="none">Sort By</option>
            <option value="high-low">Downloads (High-Low)</option>
            <option value="low-high">Downloads (Low-High)</option>
          </select>
                    <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search Apps..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 pl-10 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </Form>        
      </div>
      

      {isLoading ? (
        <LoadingSpinner message="Searching & Sorting Apps..." />
      ) : totalAppsFound > 0 ? (
        <div className="grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
          {filteredAndSortedApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
       <div>
         <AppNotFound></AppNotFound>
       </div>
        
      )}
    </div>
    );
};

export default Apps;
