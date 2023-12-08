// Importing NPM Dependencies
import React, { useEffect, useState } from "react";

// Importing Component
import Popup from "../popup";
import Sidebar from "../sidebar";
import Canvas from "../canvas";

// Importing Helper Methods
import { getDataFromLocalStorage } from "../../utilities/helperMethods";

// Importing Styling
import "../../styles/home.scss";

const Home = () => {
    const [open, setOpen] = useState(false);
    const [elemValues, setElemValues] = useState({});
    const [elements, setElements] = useState();
    const [activeElement, setActiveElement] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [selectedElements, setSelectedElements] = useState([]);

    /**
     * HandleDragStart
     *
     * @description - Method for handling drag start event of element form sidebar
     */
    const handleDragStart = (e, element) => {
        e.dataTransfer.setData("text/plain", "");
        setActiveElement(element);
    };

    // Fetch elements data from local storage and display on mount
    useEffect(() => {
        const storedData = getDataFromLocalStorage("elementsData");
        setElements(storedData);
    }, []);

    return (
        <div className='main'>
            {/* Canvas for dropping elements */}
            <Canvas
                {...{
                    elements,
                    setElements,
                    setElemValues,
                    activeElement,
                    setActiveElement,
                    setOpen,
                    setFormValues,
                    selectedElements,
                    setSelectedElements,
                }}
            />
            {/* Sidebar with blocks */}
            <Sidebar handleDragStart={handleDragStart} />
            {/* Popup/Modal */}
            {open && (
                <div className='popup-wrapper'>
                    <Popup
                        {...{
                            setOpen,
                            elemValues,
                            setElemValues,
                            formValues,
                            setElements,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
