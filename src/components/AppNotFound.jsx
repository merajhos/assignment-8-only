import React from 'react';

const AppNotFound = () => {
    return (
        <div>
            <div className="text-center py-20  p-10 mt-10 rounded-lg ">
              <img src="/public/assets/App-Error.png" alt="" className='items-center flex mx-auto w-60'/>
          <p className="text-3xl text-red-600 font-bold">No App Found!</p>
          <p className="text-lg text-gray-500 mt-4">
            We couldn't find any app matching . Please try a different name.
          </p>
        </div>
        </div>
    );
};

export default AppNotFound;