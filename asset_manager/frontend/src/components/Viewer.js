import React from 'react';
import Buttons from './Buttons';

export default function Viewer(props) {

    const renderInfo = (data) => {

        if (data.length === 0) {
            return "No items"
        }

        switch (data[0]) {
            case "loading":
                return "Loading..."
            case "getError":
                return "Error when retrieving data"
            case "removeError":
                return "Error removing the item"
            default:
                return
        }
    }

    const listItems = (data) => {

        return data.map((asset, index) => <div key={index}>
            <p className="assetId">ID: {asset._id}
                <Buttons assetid={asset._id} {...props} />
            </p>
            {asset.type && <p>Type: {asset.type}</p>}
            {asset.serial && <p>Serial: {asset.serial}</p>}
            {asset.color && <p>Color: {asset.color}</p>}
            {asset.metadata && <p>Metadata: {JSON.stringify(asset.metadata)}<br /> </p>}
        </div>)
    }

    return (
        <div className="viewContainer" items={props.data.length}>
            {renderInfo(props.data) ? <h3 className="info">{renderInfo(props.data)}</h3> : listItems(props.data)}
        </div>
    )
}
