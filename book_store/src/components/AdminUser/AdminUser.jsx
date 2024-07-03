import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Radio, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading'
import { InputAdminFormComponent } from '../InputFormComponent/InputFormComponent'
import { WrapperFormItem } from '../AdminProduct/style'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import * as message from '../../components/Message/Message'
import { getBase64 } from '../../untils'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import * as UserService from '../../services/UserService';

function AdminUser() {
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const [stateDetailsUser, setStateDetailsUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    });
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, ...rests } = data
            const res = UserService.updateUser(id, rests)
            return res
        }
    )
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token } = data
            const res = UserService.deleteUser(id, token)
            return res
        }
    )
    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const { token, ...ids } = data
            const res = UserService.deleteManyUser(ids, token)
            return res
        }
    )
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isPending: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
    const getAllUsers = async () => {
        const res = await UserService.getAllUser()
        return res
    }
    const fetchGetDetailsUser = async () => {
        const res = await UserService.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateDetailsUser({
                name: res?.data.name,
                email: res?.data.email,
                phone: res?.data.phone,
                isAdmin: res?.data.isAdmin,
            })
        }
        setIsLoadingUpdate(false)
    }
    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsUser()
        }
    }, [rowSelected])
    const handleUpdateUser = () => {
        if (rowSelected) {
            setIsLoadingUpdate(true)
            fetchGetDetailsUser()
        }
        setIsOpenDrawer(true)
    }
    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers, retry: 3, retryDelay: 1000 })
    const { isLoading: isLoadingUsers, data: Users } = queryUser
    const renderAction = () => {
        return (
            <div>
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleUpdateUser} />
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
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
            title: 'Họ và tên',
            dataIndex: 'name',
            width: '400px',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'Admin',
                    value: true,
                },
                {
                    text: 'Not admin',
                    value: false,
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => {
                if (value) {
                    return record.isAdmin === 'True'
                }
                return record.isAdmin === 'False'
            },
        },
        {
            title: 'Số địện thoại',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = Users?.data?.length && Users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'False' }
    })
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(stateDetailsUser)
    }, [form, stateDetailsUser])
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted])
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDeletedMany])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateDetailsUser({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    };
    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateDetailsUser }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    };
    const handleDetailsOnchange = (e) => {
        setStateDetailsUser({
            ...stateDetailsUser,
            [e.target.name]: e.target.value
        })
    };
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <WrapperHeader>Quản lý người dùng</WrapperHeader>
            </div >
            <div style={{ marginTop: 20 }}>
                <Loading isLoading={isLoadingDeletedMany}>
                    <TableComponent columns={columns} data={dataTable} isLoading={isLoadingUsers}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setRowSelected(record._id)
                                }
                            };
                        }} />
                </Loading>
            </div>
            <DrawerComponent title='Thông tin người dùng' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onUpdateUser}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                        >
                            <InputAdminFormComponent value={stateDetailsUser.name} onChange={handleDetailsOnchange} name="name" disabled='true' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <InputAdminFormComponent value={stateDetailsUser.email} onChange={handleDetailsOnchange} name="email" disabled='true' />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                        >
                            <InputAdminFormComponent value={stateDetailsUser.phone} onChange={handleDetailsOnchange} name="phone" disabled='true' />
                        </Form.Item>
                        <Form.Item
                            label="Vai trò"
                            name="isAdmin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn vai trò của tài khoản!',
                                },
                            ]}
                        >
                            <div style={{ width: '100%' }}>
                                <Radio.Group onChange={handleDetailsOnchange} value={stateDetailsUser.isAdmin} name='isAdmin'>
                                    <Radio value={true}>Admin</Radio>
                                    <Radio value={false}>User</Radio>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                        <WrapperFormItem
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </WrapperFormItem>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} width="420px" height="130px">
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa người dùng này không?</div>
                </Loading>
            </ModalComponent>
        </div >
    )
}

export default AdminUser
