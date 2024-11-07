import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import CustomModal from '../Modal/Modal';

function Table(props) {
    const { data, columns, sub, show, handleCloseModal, handleConfirmDelete, expandableRowsComponent, expandableRows } = props;
    const [search, setSearch] = useState("");
    const [datas, setTempData] = useState(data);

    useEffect(() => {
        setTempData(data);
    }, [data]);

    useEffect(() => {
        if (search === "") {
            setTempData(data);
        } else {
            const result = data.filter((product) => {
                const values = Object.values(product).join().toLowerCase();
                return values.includes(search.toLowerCase());
            });
            setTempData(result);
        }
    }, [search, data]);

    return (
        <>
            {show && (
                <CustomModal
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this item?"
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}

            <DataTable
                columns={columns}
                data={datas}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRows
                selectableRowsHighlight
                subHeader={sub}
                subHeaderComponent={
                    sub && (
                        <input
                            type="text"
                            placeholder="Search here"
                            className="w-25 form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    )
                }
                {...(expandableRows && { expandableRows, expandableRowsComponent })}
            />
        </>
    );
}

export default Table;
