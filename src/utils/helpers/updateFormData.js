export const updateForm = (e, state, updateFunc, dataType) => {
    let copy = { ...state };
    if (dataType === "str") {
        updateFunc({ ...copy, [e.target.name]: e.target.value });
    } else if (dataType === "int") {
        updateFunc({ ...copy, [e.target.name]: parseInt(e.target.value) });
    } else if (dataType === "float") {
        if (e.target.value !== "") {
            updateFunc({ ...copy, [e.target.name]: parseFloat(e.target.value) });
        } else { // Change value to blank when all info in input is backspaced
            updateFunc({ ...copy, [e.target.name]: "" });
        }
    }
}