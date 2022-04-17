import React from 'react'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Buttons(props) {

    // console.log(props)

    const { REACT_APP_BASE_URL } = process.env
    const {
        setUpdatePopUp,
        updatePopUp,
        setUpdatePopUpId,
        setData,
        data
    } = props

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
        const cardEl = e.target.parentElement.parentElement
        const idToRemove = e.target.attributes.assetid.value
        const dataWithIdRemoved = data.filter(asset => asset._id !== idToRemove)
        setData(dataWithIdRemoved)
    }

    const removeAssetFromDb = async (id) => await axios.delete(`${REACT_APP_BASE_URL}/assets/${id}`)

    return (
        <>
            <span className="updateButton" assetid={props.assetid} onClick={updateHandler}><EditIcon /></span>
            <span className="removeButton" assetid={props.assetid} onClick={removeHandler}><DeleteIcon /></span>
        </>
    )
}
