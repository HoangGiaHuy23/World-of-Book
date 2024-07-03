import { Table } from 'antd';
import React, { useMemo, useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], columns = [], isLoading = false, handleDeleteManyProduct, disableDeleteManyProduct = false } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
    };
    const handleDeleteAll = () => {
        handleDeleteManyProduct(rowSelectedKeys)
        setRowSelectedKeys([])
    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("table")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
    return (
        <Loading isLoading={isLoading}>
            {(rowSelectedKeys.length > 1 && !disableDeleteManyProduct) && (
                <div style={{
                    background: 'rgb(147 195 255)',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.3em',
                    padding: '10px',
                    cursor: 'pointer'
                }}
                    onClick={handleDeleteAll}
                >Xóa tất cả
                </div>
            )}
            <button onClick={exportExcel} style={{padding: 3, marginBottom: 5}}>Export XLS</button>
            <Table
                id='table-xls'
                rowSelection={{
                    hideSelectAll: disableDeleteManyProduct,
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent
