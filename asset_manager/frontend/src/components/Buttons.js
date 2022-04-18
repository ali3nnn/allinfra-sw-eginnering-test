import React from 'react'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const { REACT_APP_BASE_URL } = process.env
const removeAssetFromDb = async (id) => await axios.delete(`${REACT_APP_BASE_URL}/assets/${id}`)

export default function Buttons({ setUpdatePopUp, updatePopUp, setUpdatePopUpId, setData, data, assetid }) {

    const updateHandler = async (e) => {
        e.preventDefault();
        const id = e.target.attributes.assetid.value
        setUpdatePopUpId(id)
        setUpdatePopUp(!updatePopUp)
    }

    const removeHandler = async (e) => {
        e.preventDefault();
        const id = e.target.attributes.assetid.value
        const result = await removeAssetFromDb(id);
        if (result.status === 200) {
            hideCard(e)
        } else {
            setData(["removeError"])
        }
    }

    const hideCard = (e) => {
        const idToRemove = e.target.attributes.assetid.value
        const dataWithIdRemoved = data.filter(asset => asset._id !== idToRemove)
        const isCreateAssetResult = data[0].createAssetResult || false
        if (isCreateAssetResult) {
            setData(["createdItemRemoved"])
        } else {
            setData(dataWithIdRemoved)
        }
    }

    return (
        <>
            <span className="updateButton noselect" assetid={assetid} onClick={updateHandler}><EditIcon /></span>
            <span className="removeButton noselect" assetid={assetid} onClick={removeHandler}><DeleteIcon /></span>
        </>
    )
}
