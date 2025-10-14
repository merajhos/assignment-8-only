import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SuccessToast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-5 right-5 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl transition-opacity duration-300 ease-out animate-in fade-in slide-in-from-right-10">
            <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{message}</span>
            </div>
        </div>
    );
};

const ReviewChart = ({ data }) => {
    return (
        <div className="w-full h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">




                <BarChart
                    data={data}
                    layout="vertical" 
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#e5e7eb" />
                    <XAxis 
                        type="number" 
                        dataKey="count" 
                        stroke="#4b5563" 
                        tick={{ fill: '#6b7280' }}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 35000]} 
                        ticks={[0, 5000, 15000, 25000, 35000]} 
                        tickFormatter={(tick) => `${tick / 1000}K`} 
                    />
                    <YAxis
                        dataKey="stars"
                        type="category"
                        stroke="#4b5563"
                        tick={{ fill: '#4b5563', fontSize: 14 }}
                        tickLine={false}
                        axisLine={false}
                        width={70}
                    />
                    <Tooltip 
                        formatter={(value) => [`${value} reviews`, 'Count']}
                        contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#f9fafb' }}
                        labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                    />
                    <Bar dataKey="count" fill="#ff9900" radius={[0, 4, 4, 0]} barSize={25} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


const AppDetails = () => {
    const { id } = useParams();
    const appId = parseInt(id);
    const appData = useLoaderData(); 

    const singleApps = appData.find(app => app.id === appId);


    const app = singleApps || {
        id: appId,
        title: "App Not Found",
        developer: "N/A",
        iconPlaceholderText: '❌', 
        rating: 0,
        reviewsCount: '0',
        downloads: '0',
        size: '0 MB',
        description: `No details found for App ID: ${id}. Please check your data source.`,
    };
    const mockReviewData = [
        { stars: '1 star', count: 1800 },
        { stars: '2 star', count: 3200 },
        { stars: '3 star', count: 6000 },
        { stars: '4 star', count: 19000 },
        { stars: '5 star', count: 32000 },
        
    ];
    const chartData = [...mockReviewData].reverse();

const isAppInstalled = (appId) => {
    const installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    return installedApps.some(app => app.id === appId);
};

const installApp = (app) => {
    let installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    if (!isAppInstalled(app.id)) {
        installedApps.push(app);
        localStorage.setItem('installedApps', JSON.stringify(installedApps));
        return true; 
    }
    return false;
};

 useEffect(() => {

 setIsInstalled(isAppInstalled(app.id));
}, [app.id]);

    const [isInstalled, setIsInstalled] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);

    const handleInstallClick = () => {
        if (!isInstalled){
            const success = installApp(app);

            if (success) {
              setIsInstalled(true);
               setToastVisible(true);
 }
        }
        if (!isInstalled) {
            setIsInstalled(true);
            setToastVisible(true);
        }
    };

 
    const installButtonText = isInstalled ? 'Installed' : `Install (${app.size})`;

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                
                <SuccessToast 
                    message={`${app.title} installed successfully!`}
                    isVisible={toastVisible}
                    onClose={() => setToastVisible(false)}
                />
                
                <div className="p-8 border-b border-gray-200">
                    <div className="flex items-center space-x-6">
                        
                        <div className="flex-shrink-0 w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center text-5xl font-extrabold">
                            <img className='w-full h-full rounded-2xl'
                                 src={app.image}>
                                    </img>
                        </div>

                        <div className="flex-grow">
                            <h1 className="text-3xl font-extrabold text-gray-900">{app.title}</h1>
                            <p className="text-md text-gray-600 font-medium mt-1">
                                Developed by <span className="text-blue-600">{app.developer || "N/A"}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                        <div className="flex space-x-8 text-center mb-4 sm:mb-0">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-extrabold text-gray-900 flex flex-col items-center"><i class="fa-solid fa-download text-green-600 py-2"></i>{app.downloads / 1000000 + "M"}</span>
                                <span className="text-sm text-gray-500 mt-1">Downloads</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-extrabold text-gray-900  flex flex-col items-center"><i class="fa-solid fa-star text-yellow-500  py-2"></i>{app.ratingAvg.toFixed(1)}</span>
                                <span className="text-sm text-gray-500 mt-1">Average Ratings</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-extrabold text-gray-900  flex flex-col items-center"><i class="fa-solid fa-thumbs-up text-[#632EE3] py-2"></i>{app.reviews / 1000 + 'K'}</span>
                                <span className="text-sm text-gray-500 mt-1">Total Reviews</span>
                            </div>
                        </div>

                        <button
                            onClick={handleInstallClick}
                            disabled={isInstalled}
                            className={`
                                px-8 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg w-full sm:w-auto
                                ${isInstalled 
                                    ? 'bg-green-500 text-white cursor-not-allowed shadow-inner' 
                                    : 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                                }
                            `}
                        >
                            {installButtonText}
                        </button>
                    </div>
                </div>

                <div className="p-8 mt-4 border-b border-gray-200">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Ratings</h2>
                    <ReviewChart data={chartData} />
                </div>

                <div className="p-8 mt-4">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Description</h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                        {app.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppDetails;