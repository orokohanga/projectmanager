import React from 'react';

export default function SingleProject(props) {
    const getOwnerName = (ownerId) => {
        return "John Doe";
    };
    return (
        <div className="bg-slate-800 shadow-md rounded-lg p-3 text-white flex flex-col">
            <h1 className="text-xl font-bold mb-2">{props.name}</h1>
            <h2 className="text-gray-500">{props.owner}</h2>
        </div>
    );
}
