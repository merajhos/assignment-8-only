import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const uninstallApp = (appId) => {
    let installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    
    const updatedApps = installedApps.filter(app => app.id !== appId);
    
    localStorage.setItem('installedApps', JSON.stringify(updatedApps));
    return updatedApps;
};
const UninstallToast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-5 right-5 z-50 p-4 bg-red-600 text-white rounded-lg shadow-xl transition-opacity duration-300 ease-out animate-in fade-in slide-in-from-right-10">
            <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{message}</span>
            </div>
        </div>
    );
};

const Installation = () => {
    const [installedApps, setInstalledApps] = useState([]);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    useEffect(() => {
        const storedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
        setInstalledApps(storedApps);
    }, []);

    const handleUninstall = (appId, appTitle) => {
        const updatedApps = uninstallApp(appId);
        setInstalledApps(updatedApps);
        
        setToastMessage(`${appTitle} successfully uninstalled.`);
        setToastVisible(true);
    };

    const closeToast = () => setToastVisible(false);
    
    const AppListItem = ({ app }) => (
        <div className="flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-lg border border-gray-100">
            
            <Link to={`/appDetails/${app.id}`} className="flex items-center flex-grow space-x-4 cursor-pointer hover:bg-gray-50 -m-4 p-4 rounded-lg transition-colors duration-150">
                
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xl text-gray-700 font-extrabold overflow-hidden">
                    {app.image ? (
                        <img src={app.image} alt={`${app.title} Icon`} className="w-full h-full object-cover" />
                    ) : (
                        app.iconPlaceholderText || '⭐'
                    )}
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-3"> {app.downloads / 1000000 + "M"}</span>
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span>{app.ratingAvg.toFixed(1)}</span>
                        <span className="ml-3 text-sm text-gray-400">{app.size  / 100 + "k"}</span>
                    </div>
                </div>
            </Link>
            <button
                onClick={() => handleUninstall(app.id, app.title)}
                className="ml-4 px-4 py-2 bg-red-500 text-white font-bold rounded-full text-sm hover:bg-red-600 transition-colors duration-200 shadow-md flex-shrink-0"
            >
                Uninstall
            </button>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <UninstallToast 
                    message={toastMessage} 
                    isVisible={toastVisible} 
                    onClose={closeToast} 
                />

                <div className="text-center mb-10 pt-4">
                    <h1 className="text-4xl font-extrabold text-gray-900">Your Installed Apps</h1>
                    <p className="text-md text-gray-500 mt-2">
                        Manage and uninstall the applications on your device.
                    </p>
                </div>

                {installedApps.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow-xl">
                        <p className="text-2xl text-gray-600">You haven't installed any apps yet. 😔</p>
                        <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                            Go to App Store
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4 text-gray-600">
                            <span className="font-semibold">{installedApps.length} Apps Found</span>
                            <span className="text-sm">Sort By: Size ▾</span>
                        </div>
                        <div className="space-y-4">
                            {installedApps.map(app => (
                                <AppListItem key={app.id} app={app} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Installation;