// Importing NPM Dependencies
import React from "react";
import { Form, Field } from "react-final-form";

// Importing Helper Methods
import {
    getDataFromLocalStorage,
    setDataToLocalStorage,
} from "../../utilities/helperMethods";

// Importing Assets
import cross from "../../assets/cross.svg";

// Importing Styling
import "../../styles/popup.scss";

const Popup = (props) => {
    const { setOpen, elemValues, formValues, setElements } = props;

    /**
     * OnSubmit
     *
     * @description - Method invoked on submitting the form with data
     */
    const onSubmit = (values) => {
        // Get data from local storage
        const storedData = getDataFromLocalStorage("elementsData");

        // If no form values present, create an object and update in local storage
        if (Object.keys(formValues).length === 0) {
            const detailsObj = { ...elemValues, ...values, elemId: Date.now() };
            let existingArray = storedData ? storedData : [];
            existingArray.push(detailsObj);
            setDataToLocalStorage("elementsData", existingArray);
        } else {
            // If form values are present find the element data object in local storage
            const elemObj = storedData.find(
                (obj) => obj.elemId === formValues.elemId
            );

            // Update the element data object with the new values
            if (elemObj) {
                elemObj.fieldText = values.fieldText;
                elemObj.x = Number(values.x);
                elemObj.y = Number(values.y);
                elemObj.size = Number(values.size);
                elemObj.weight = Number(values.weight);
            }

            // Save the updated data in local storage
            setDataToLocalStorage("elementsData", storedData);
        }

        // Update the elements in state
        setElements(storedData);

        // Hide the popup/modal
        setOpen(false);
    };

    /**
     * PopupCloseHandler
     *
     * @description - Method invoked when the user clicks cross button in the popup
     */
    const popupCloseHandler = () => {
        // Get data from local storage
        const storedData = getDataFromLocalStorage("elementsData");

        // Update the elements in state
        setElements(storedData);

        // Hide the popup/modal
        setOpen(false);
    };

    return (
        <section className='popup-content'>
            <div className='top-section'>
                <h3>Edit {elemValues?.text || formValues?.text}</h3>
                <img
                    className='cross'
                    src={cross}
                    alt='Cross Icon'
                    onClick={popupCloseHandler}
                />
            </div>
            <Form
                onSubmit={onSubmit}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                }) => (
                    <form className='form-wrapper' onSubmit={handleSubmit}>
                        <div className='field-wrapper'>
                            <p>Text</p>
                            <Field
                                name='fieldText'
                                component='input'
                                type='text'
                                placeholder={`This is ${elemValues?.text} element`}
                                defaultValue={formValues?.fieldText}
                                required
                            />
                        </div>
                        <div className='field-wrapper'>
                            <p>X</p>
                            <Field
                                name='x'
                                component='input'
                                type='text'
                                placeholder='X'
                                defaultValue={elemValues?.x || formValues?.x}
                                required
                            />
                        </div>
                        <div className='field-wrapper'>
                            <p>Y</p>
                            <Field
                                name='y'
                                component='input'
                                type='text'
                                placeholder='Y'
                                defaultValue={elemValues?.y || formValues?.y}
                                required
                            />
                        </div>
                        <div className='field-wrapper'>
                            <p>Font Size</p>
                            <Field
                                name='size'
                                component='input'
                                type='text'
                                defaultValue={formValues?.size}
                                required
                            />
                        </div>
                        <div className='field-wrapper'>
                            <p>Font Weight</p>
                            <Field
                                name='weight'
                                component='input'
                                type='text'
                                defaultValue={formValues?.weight}
                                required
                            />
                        </div>
                        <div className='buttons'>
                            <button
                                type='submit'
                                disabled={submitting || pristine}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            />
        </section>
    );
};

export default Popup;
