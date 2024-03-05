import React from 'react';


export default function SingleProject(props) {

    return (
        <div className="bg-slate-800 shadow-md rounded-lg p-3 text-white flex flex-col">
            <h1 className="text-xl font-bold mb-2">{props.name}</h1>
            <h2 className="text-gray-500">Owner : {props.owner}</h2>
            <h2 className="text-gray-500">Contributors : {
                props.contributors && props.contributors.length > 0 ? (
                    props.contributors.map((contributor) => {
                        return contributor.user.name;
                    }).join(", ")
                ) : (
                    "No contributors"
                )
            }</h2>
        </div>
    );
}
