import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import CustomModal from '../Modal/Modal';

function Table(props) {
    const { data, columns, sub,show,handleCloseModal,handleConfirmDelete } = props
    const [search, setSearch] = useState("");
    const [datas, setTempData] = useState(data)
    useEffect(() => {

        if (search === "") {
            setTempData(data);
        } else {
            const result = datas.filter((product) => {
                const values = Object.values(product).join().toLowerCase();
                return values.includes(search.toLowerCase());
            });
            setTempData(result);
        }
    }, [search]);
    return (
        <>
            {
                sub ? <DataTable
                    columns={columns}
                    data={datas}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    progressComponent
                    selectableRows
                    selectableRowsHighlight
                    subHeader
                    subHeaderComponent={
                        <input
                            type="text"
                            placeholder="Search here"
                            className="w-25 form-control"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    }
                >
                  
                </DataTable> : <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    progressComponent
                    selectableRows
                    selectableRowsHighlight
                />
            }

        </>
    )
}

export default Table