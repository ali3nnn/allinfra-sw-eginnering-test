import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import axios from 'axios';

export default function UpdateAsset(props) {

    const { REACT_APP_BASE_URL } = process.env

    const {
        updatePopUpId,
        setUpdatePopUp,
        setData
    } = props;

    const [asset, setAsset] = useState({
        "id": updatePopUpId,
        "type": "",
        "serial": "",
        "color": "",
        "metadata": ""
    })

    const onChange = (e) => {
        switch (e.target.name) {
            case "metakey":
                setAsset({
                    ...asset,
                    metadata: {
                        ...asset.meta,
                        [e.target.value]: e.target.nextSibling.value
                    }
                })
                console.log(asset)
                break;
            case "metadata":
                setAsset({
                    ...asset,
                    metadata: {
                        ...asset.meta,
                        [e.target.previousSibling.value]: e.target.value
                    }
                })
                console.log(asset)
                break;
            default:
                setAsset({
                    ...asset,
                    [e.target.name]: e.target.value
                })
                console.log(asset)
                break;
        }
    }

    const removeEmptyFields = (data) => {
        Object.keys(data).forEach((k) => (!data[k] && data[k] !== undefined) && delete
            data[k]);
        return data;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { id, ...newAsset } = asset
        removeEmptyFields(newAsset)
        console.log(asset, newAsset)
        const response = await axios.patch(`${REACT_APP_BASE_URL}/assets/${id}`, newAsset)
        console.log(response.data)
        if (response.status === 201) {
            const allAssets = await axios.get(`${REACT_APP_BASE_URL}/assets`)
            console.log(allAssets)
            setData(allAssets.data.result)
        }
        setUpdatePopUp(false)
    }

    return (
        <div className="assetModal">
            <h1>Update the asset</h1>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label>id</Label>
                    <Input type="text" name="id" value={updatePopUpId && updatePopUpId} onChange={onChange} placeholder="Enter id" required></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Type</Label>
                    <Input type="text" name="type" onChange={onChange} placeholder="Enter type"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Serial</Label>
                    <Input type="text" name="serial" onChange={onChange} placeholder="Enter serial"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Color</Label>
                    <Input type="text" name="color" onChange={onChange} placeholder="Enter color"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Metadata</Label>
                    <FormGroup className="metadata" onChange={onChange}>
                        <Input type="text" name="metakey" placeholder="Key"></Input>
                        <Input type="text" name="metadata" placeholder="Value"></Input>
                    </FormGroup>
                    {/* <div>Add meta</div> */}
                </FormGroup>
                <Button type="submit">Update asset</Button>
                <div className="btn btn-danger ml-2" onClick={() => setUpdatePopUp(false)}>Close</div>
            </Form>
        </div>
    )
}
