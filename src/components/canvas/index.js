// Importing NPM Dependencies
import React from "react";

// Importing Helper Methods
import {
    getDataFromLocalStorage,
    removeElement,
    setDataToLocalStorage,
} from "../../utilities/helperMethods";

// Importing Styles
import "../../styles/canvas.scss";

const Canvas = (props) => {
    const {
        elements = [],
        setElements,
        setElemValues,
        activeElement,
        setActiveElement,
        setOpen,
        setFormValues,
        selectedElements,
        setSelectedElements,
    } = props;

    /**
     * HandleDragOver
     *
     * @description - Method for handling drag over event of element on canvas
     */
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    /**
     * HandleDrop
     *
     * @description - Method for handling drop event of element on canvas
     */
    const handleDrop = (e) => {
        e.preventDefault();
        const x = e.clientX;
        const y = e.clientY;

        setElemValues({ x, y, ...activeElement });

        // Logic for handling drop event for elements dragged from sidebar to canvas
        if (activeElement) {
            setElements((prevElements) => [
                { ...prevElements },
                { ...activeElement, x, y },
            ]);

            // Open popup for entering details of new element
            setOpen(true);

            // Once element is dropped active element should be null
            setActiveElement(null);

            // For a new element form values should not be there
            setFormValues({});
        }
    };

    /**
     * HandleDrag
     *
     * @description - Method for handling drag event of elements on canvas
     */
    const handleDrag = (e, index, elem) => {
        // Logic to find details of the target element
        const storedData = getDataFromLocalStorage("elementsData");
        const elemObj = storedData.find((obj) => obj.elemId === elem.elemId);

        // If target element details found update coordinates
        if (elemObj) {
            elemObj.x = Number(e.clientX);
            elemObj.y = Number(e.clientY);
        }

        // Update data in local storage
        setDataToLocalStorage("elementsData", storedData);

        // Update form values for the target element
        setFormValues(elem);

        // Update elements
        const newElements = [...elements];
        newElements[index].x = e.clientX;
        newElements[index].y = e.clientY;
        setElements(newElements);
    };

    /**
     * HandleElementClick
     *
     * @description - Method for highlighting element on click
     */
    const handleElementClick = (index) => {
        // Toggle the selected state for the clicked element
        setSelectedElements((prevSelected) => {
            const newSelected = [...prevSelected];
            newSelected[index] = !newSelected[index];
            return newSelected;
        });
    };

    /**
     * HandleKeyPress
     *
     * @description - Method for updating / deleting selected element
     */
    const handleKeyPress = (e, elem) => {
        // If Enter key is pressed
        if (e.key === "Enter") {
            // Open a popup and fill details in a form for the clicked element
            setOpen(true);
            setFormValues(elem);

            // After filling the form, remove the element from the state and remove highlight
            setSelectedElements((prevSelected) => {
                const newSelected = [...prevSelected];
                newSelected[elem?.elemId] = false; // Remove highlight
                return newSelected;
            });
        }
        // If Delete key is pressed
        else if (e.key === "Delete") {
            // Delete the clicked element and update
            removeElement(elem.elemId);
            setElements(getDataFromLocalStorage("elementsData"));
        }
    };

    /**
     * CanvasElement
     *
     * @description - Method for showing Button/Label/Input on canvas
     */
    const canvasElement = (elem, index) => {
        const { type, fieldText: text, size, weight } = elem;

        if (type === "button") {
            return (
                <button
                    type='button'
                    className={selectedElements[index] ? "highlight" : ""}
                    style={{
                        fontSize: `${size}px`,
                        fontWeight: `${weight}`,
                    }}
                >
                    {text}
                </button>
            );
        } else if (type === "input") {
            return (
                <input
                    className={selectedElements[index] ? "highlight" : ""}
                    type='text'
                    value={text}
                    style={{
                        fontSize: `${size}px`,
                        fontWeight: `${weight}`,
                    }}
                />
            );
        } else if (type === "label") {
            return (
                <div
                    className={selectedElements[index] ? "highlight" : ""}
                    style={{
                        fontSize: `${size}px`,
                        fontWeight: `${weight}`,
                    }}
                >
                    {text}
                </div>
            );
        }
    };

    return (
        <section
            className='canvas'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {elements?.map((element, index) => (
                <div
                    key={index}
                    className={`element ${element.type}`}
                    style={{
                        position: "absolute",
                        top: element.y,
                        left: element.x,
                    }}
                    draggable
                    onDrag={(e) => handleDrag(e, index, element)}
                    onClick={() => handleElementClick(element?.elemId)}
                    tabIndex='0'
                    onKeyDown={(e) => handleKeyPress(e, element)}
                >
                    {canvasElement(element, element?.elemId)}
                </div>
            ))}
        </section>
    );
};

export default Canvas;
