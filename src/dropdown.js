import styled from "styled-components";


export const Dropdown = (props) => {
    
    return (
        <SortWrap>
            <input placeholder="search" onChange={(event) => props.setSearch(event.target.value)}/>
            <label>
                <SortText>Sort By</SortText>  
                <DropdownStyle className="dropdown" onChange={(event) => props.setSort(event.target.value)}>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="populationAscending">Population (Ascending)</option>
                    <option value="populationDescending">Population (Descending)</option>
                    <option value="sizeAscending">Size (Ascending)</option>
                    <option value="sizeDescending">Size (Descending)</option>
                </DropdownStyle>
            </label>
        </SortWrap>
    )
}

const SortWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: .2vh 2vw;

    input {
        border-radius: 10px;
        border: 2px solid rgb(190, 190, 190);
    }
`
const SortText = styled.p`
    display: inline;
    margin-right: 0.5vw;
    font-family: 'Cabin', sans-serif;
`

const DropdownStyle = styled.select`
    border-radius: 10px;
    border: 2px solid rgb(190, 190, 190);
    padding: 0.1vh 0;
    font-family: 'Cabin', sans-serif;
`