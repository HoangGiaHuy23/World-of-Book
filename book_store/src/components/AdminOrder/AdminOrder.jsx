import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { InputAdminFormComponent } from "../InputFormComponent/InputFormComponent";
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { isCancel } from 'axios'


const AdminOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);

  const getAllOrders = async () => {
    const res = await OrderService.getAllOrder()
    return res
  }

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrders, retry: 3, retryDelay: 1000 })
  const { isLoading: isLoadingOrder, data: orders } = queryOrder
  const renderAction = () => {
    return (
      <div>
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} />
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputAdminFormComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      ...getColumnSearchProps('_id'),
      width: '15%',
    },
    {
      title: 'Thời gian đặt hàng',
      dataIndex: 'createdAt',
      ...getColumnSearchProps('createdAt'),
      width: '15%',
    },
    {
      title: 'Tiền hàng',
      dataIndex: 'itemsPrice',
      sorter: (a, b) => a.itemsPrice - b.itemsPrice,
      width: '10%',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      filters: [
        {
          text: '<= 300.000 đ',
          value: '<=',
        },
        {
          text: '>= 300.000 đ',
          value: '>=',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 300000
        }
        return record.price <= 300000
      },
      width: '15%',
    },
    {
      title: 'Đã thanh toán',
      dataIndex: 'isPaid',
      filters: [
        {
          text: 'Đã thanh toán',
          value: true,
        },
        {
          text: 'Chưa thanh toán',
          value: false,
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        console.log('value', value)
        console.log('record', record)
        if (value) {
          return record.isPaid === 'Đã thanh toán'
        }
        return record.isPaid === 'Chưa thanh toán'
      },
      width: '15%',
    },
    {
      title: 'Đã hủy',
      dataIndex: 'isCancel',
      filters: [
        {
          text: 'Đã hủy',
          value: true,
        },
        {
          text: 'Không',
          value: false,
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        if (value) {
          return record.isCancel === 'Đã hủy'
        }
        return record.isCancel === 'Không'
      },
      width: '10%',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'isDelivered',
      filters: [
        {
          text: 'Đã giao',
          value: true,
        },
        {
          text: 'Chưa giao',
          value: false,
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        if (value) {
          return record.isDelivered === 'Đã giao'
        }
        return record.isDelivered === 'Chưa giao'
      },
      width: '10%',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: renderAction,
      width: '10%',
    },
  ];

  const dateTimeFormat = (dateString) => {
    const date = new Date(dateString);
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (date.getDate() < 10) {
      day = '0' + day
    }
    if (date.getMonth() < 10) {
      month = '0' + month
    }
    return day + '-' + month + '-' + year + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return {
      ...order, key: order._id, _id: order._id.toUpperCase(),
      createdAt: dateTimeFormat(order.createdAt), isPaid: order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
      isCancel: order.isCancel ? 'Đã hủy' : 'Không', isDelivered: order.isDelivered ? 'Đã giao' : 'Chưa giao'
    }
  })
  const [form] = Form.useForm();
  dateTimeFormat();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      </div >
      <div style={{ marginTop: 20 }}>
        <TableComponent columns={columns} data={dataTable} isLoading={isLoadingOrder} disableDeleteManyProduct={true}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id)
              }
            };
          }} />
      </div>
    </div >
  )
}

export default AdminOrder
