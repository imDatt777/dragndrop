// Importing NPM Dependencies
import React from "react";

// Importing Helper Methods
import {
    getDataFromLocalStorage
} from "../../utilities/helperMethods";

// Importing Assets
import block from "../../assets/grip-vertical.svg";

// Importing Styles
import '../../styles/sidebar.scss';

const Sidebar = (props) => {
    const { handleDragStart } = props;

    const blockItems = [
        { id: 1, text: "Label", type: "label" },
        { id: 2, text: "Input", type: "input" },
        { id: 3, text: "Button", type: "button" },
    ];

    /**
     * HandleExport
     *
     * @description - Method for exporting the element details in a json file
     */
    const handleExport = () => {
        //  Retrieve array of objects from local storage
        const dataFromLocalStorage = getDataFromLocalStorage("elementsData");

        // Convert array to JSON string
        const jsonString = JSON.stringify(dataFromLocalStorage, null, 2);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "exportedData.json";

        // Append the download link to the body and trigger a click event
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the download link from the body
        document.body.removeChild(downloadLink);
    };

    return (
        <section className='sidebar'>
            <h3>Blocks</h3>
            <div className='items'>
                {blockItems.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            id={item?.id}
                            className='item'
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                        >
                            <img
                                className='icon'
                                src={block}
                                alt='Block Icon'
                            />
                            <p>{item?.text}</p>
                        </div>
                    );
                })}
            </div>
            <button className='export-btn' onClick={handleExport}>
                Export JSON
            </button>
        </section>
    );
};

export default Sidebar;
