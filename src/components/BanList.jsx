import React from 'react';

const BanList = ({ banList, onRemove }) => { // Destructure banList from props
    return (
        <div className="BanList">
            <h2>Select an attribute in your listing to ban it!</h2>
            {banList.length > 0 ? (
                <ul>
                    {banList.map((item, index) => (
                        <li key={index}> {/* Change button to li for list items */}
                            <button onClick={() => onRemove(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in the ban list.</p>
            )}
        </div>
    );
};

export default BanList;