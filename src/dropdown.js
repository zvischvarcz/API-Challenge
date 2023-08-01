import { useState } from "react";


export const Dropdown = (props) => {
    
    const setSort = (event) => {
        props.setSort(event.target.value);
    }

    return (
        <div>
            <label>
                Sort By
                <select  onChange={setSort}>
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                    <option value="populationAscending">Population (Ascending)</option>
                    <option value="populationDescending">Population (Descending)</option>
                    <option value="sizeAscending">Size (Ascending)</option>
                    <option value="sizeDescending">Size (Descending)</option>
                </select>
            </label>
        </div>
    )
}


