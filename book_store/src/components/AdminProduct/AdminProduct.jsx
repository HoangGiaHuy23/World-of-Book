import React, { useEffect, useRef, useState } from 'react'
import { WrapperFormItem, WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { InputAdminFormComponent } from "../InputFormComponent/InputFormComponent";
import { getBase64 } from '../../untils';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'


const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    price: '',
    discount: '',
    provider: '',
    author: '',
    publisher: '',
    publisherYear: '',
    weight: '',
    packagingSize: '',
    pages: '',
    form: '',
    description: '',
    countInStock: '',
    image: '',
    rating: '0',
  });
  const [stateDetailsProduct, setStateDetailsProduct] = useState({
    name: '',
    type: '',
    price: '',
    discount: '',
    provider: '',
    author: '',
    publisher: '',
    publisherYear: '',
    weight: '',
    packagingSize: '',
    pages: '',
    form: '',
    description: '',
    countInStock: '',
    image: '',
    rating: '0',
  });
  const mutation = useMutationHooks(
    (data) => {
      const { name, type, price,
        discount, provider, author,
        publisher, publisherYear, weight,
        packagingSize, pages, form, description,
        countInStock, image, rating } = data
      const res = ProductService.createProduct({
        name, type, price,
        discount, provider, author,
        publisher, publisherYear, weight,
        packagingSize, pages, form, description,
        countInStock, image, rating
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data
      const res = ProductService.updateProduct(id, token, rests)
      return res
    }
  )
  const mutationDelete = useMutationHooks(
    (data) => {
      const { id, token } = data
      const res = ProductService.deleteProduct(id, token)
      return res
    }
  )
  const mutationDeleteMany = useMutationHooks(
    (data) => {
      const { token, ...ids } = data
      const res = ProductService.deleteManyProduct(ids, token)
      return res
    }
  )
  const { data, isPending, isSuccess, isError } = mutation
  const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
  const { data: dataDeletedMany, isPending: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
  const getAllProducts = async () => {
    const res = await ProductService.getTotalProduct()
    return res
  }
  const fetchGetDetailsProduct = async () => {
    console.log('rowSelected', rowSelected)
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateDetailsProduct({
        name: res?.data.name,
        type: res?.data.type,
        price: res?.data.price,
        discount: res?.data.discount,
        provider: res?.data.provider,
        author: res?.data.author,
        publisher: res?.data.publisher,
        publisherYear: res?.data.publisherYear,
        weight: res?.data.weight,
        packagingSize: res?.data.packagingSize,
        pages: res?.data.pages,
        form: res?.data.form,
        description: res?.data.description,
        countInStock: res?.data.countInStock,
        image: res?.data.image,
        rating: res?.data.rating,
      })
    }
    console.log('res?.data', res?.data)
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct()
    }
  }, [rowSelected])
  const handleUpdateProduct = () => {
    setIsOpenDrawer(true)
  }
  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts, retry: 3, retryDelay: 1000 })
  const { isLoading: isLoadingProducts, data: products } = queryProduct
  const renderAction = () => {
    return (
      <div>
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleUpdateProduct} />
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
      title: 'Tên sách',
      dataIndex: 'name',
      width: '400px',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
      width: '30%',
    },
    {
      title: 'Loại sách',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
      ...getColumnSearchProps('type'),
      width: '20%',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '<= 100.000 đ',
          value: '<=',
        },
        {
          text: '>= 100.000 đ',
          value: '>=',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 100000
        }
        return record.price <= 100000
      },
      width: '15%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'countInStock',
      sorter: (a, b) => a.countInStock - b.countInStock,
      filters: [
        {
          text: '<= 100',
          value: '<=',
        },
        {
          text: '>= 100',
          value: '>=',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.countInStock >= 100
        }
        return record.countInStock <= 100
      },
      width: '10%',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '<= 4',
          value: '<=',
        },
        {
          text: '>= 4',
          value: '>=',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.rating >= 4
        }
        return record.rating <= 4
      },
      width: '10%',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateDetailsProduct)
  }, [form, stateDetailsProduct])

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])
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
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      type: '',
      price: '',
      discount: '',
      provider: '',
      author: '',
      publisher: '',
      publisherYear: '',
      weight: '',
      packagingSize: '',
      pages: '',
      form: '',
      description: '',
      countInStock: '',
      image: '',
      rating: '0',
    })
    form.resetFields()
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateDetailsProduct({
      name: '',
      type: '',
      price: '',
      discount: '',
      provider: '',
      author: '',
      publisher: '',
      publisherYear: '',
      weight: '',
      packagingSize: '',
      pages: '',
      form: '',
      description: '',
      countInStock: '',
      image: '',
      rating: '0',
    })
    form.resetFields()
  };
  const onFinish = () => {
    mutation.mutate({ ...stateProduct }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateDetailsProduct }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  };
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  };
  const handleDetailsOnchange = (e) => {
    setStateDetailsProduct({
      ...stateDetailsProduct,
      [e.target.name]: e.target.value
    })
  };
  const handleOnchangeImage = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct, image: file.preview
    })
  };
  const handleDetailsOnchangeImage = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateDetailsProduct({
      ...stateDetailsProduct, image: file.preview
    })
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <WrapperHeader>Quản lý sách</WrapperHeader>
        <Button style={{ height: '50px', width: '50px', borderRadius: '6px', borderStyle: 'dashed', background: 'rgb(243, 251, 255)' }} onClick={() => { form.resetFields(); setIsModalOpen(true) }}><PlusOutlined style={{ fontSize: '20px' }} /></Button>
      </div >
      <div style={{ marginTop: 20 }}>
        <Loading isLoading={isLoadingDeletedMany}>
          <TableComponent handleDeleteManyProduct={handleDeleteManyProduct} columns={columns} data={dataTable} isLoading={isLoadingProducts}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id)
                }
              };
            }} />
        </Loading>
      </div>
      <ModalComponent title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} width="800px">
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 800,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên sách"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại sách"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Nhập loại sách',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
            </Form.Item>

            <Form.Item
              label="Giá sách"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Nhập giá sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
            </Form.Item>

            <Form.Item
              label="Tỉ lệ giảm giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Nhập tỉ lệ giảm giá sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
            </Form.Item>

            <Form.Item
              label="Nhà cung cấp"
              name="provider"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên nhà cung cấp!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.provider} onChange={handleOnchange} name="provider" />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên tác giả',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.author} onChange={handleOnchange} name="author" />
            </Form.Item>

            <Form.Item
              label="Nhà xuất bản"
              name="publisher"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên nhà xuất bản!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.publisher} onChange={handleOnchange} name="publisher" />
            </Form.Item>

            <Form.Item
              label="Năm xuất bản"
              name="publisherYear"
              rules={[
                {
                  required: true,
                  message: 'Nhập năm xuất bản!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.publisherYear} onChange={handleOnchange} name="publisherYear" />
            </Form.Item>

            <Form.Item
              label="Trọng lượng sách"
              name="weight"
              rules={[
                {
                  required: true,
                  message: 'Nhập trọng lượng sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.weight} onChange={handleOnchange} name="weight" />
            </Form.Item>

            <Form.Item
              label="Kích thước bao bì"
              name="packagingSize"
              rules={[
                {
                  required: true,
                  message: 'Nhập kích thước bao bì sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.packagingSize} onChange={handleOnchange} name="packagingSize" />
            </Form.Item>

            <Form.Item
              label="Số trang"
              name="pages"
              rules={[
                {
                  required: true,
                  message: 'Nhập số trang!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.pages} onChange={handleOnchange} name="pages" />
            </Form.Item>

            <Form.Item
              label="Hình thức bìa"
              name="form"
              rules={[
                {
                  required: true,
                  message: 'Nhập hình thức bìa sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.form} onChange={handleOnchange} name="form" />
            </Form.Item>

            <Form.Item
              label="Mô tả sách"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Nhập mô tả sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
            </Form.Item>

            <Form.Item
              label="Số lượng tồn kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Nhập số lượng tồn kho!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Ảnh của sách"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Đăng tải ảnh của sách!',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeImage}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '60px',
                    width: '60px',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="image" />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <WrapperFormItem
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </WrapperFormItem>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết sản phẩm' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
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
            onFinish={onUpdateProduct}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên sách"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.name} onChange={handleDetailsOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại sách"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Nhập loại sách',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.type} onChange={handleDetailsOnchange} name="type" />
            </Form.Item>

            <Form.Item
              label="Giá sách"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Nhập giá sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.price} onChange={handleDetailsOnchange} name="price" />
            </Form.Item>

            <Form.Item
              label="Tỉ lệ giảm giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Nhập tỉ lệ giảm giá sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.discount} onChange={handleDetailsOnchange} name="discount" />
            </Form.Item>

            <Form.Item
              label="Nhà cung cấp"
              name="provider"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên nhà cung cấp!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.provider} onChange={handleDetailsOnchange} name="provider" />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên tác giả',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.author} onChange={handleDetailsOnchange} name="author" />
            </Form.Item>

            <Form.Item
              label="Nhà xuất bản"
              name="publisher"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên nhà xuất bản!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.publisher} onChange={handleDetailsOnchange} name="publisher" />
            </Form.Item>

            <Form.Item
              label="Năm xuất bản"
              name="publisherYear"
              rules={[
                {
                  required: true,
                  message: 'Nhập năm xuất bản!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.publisherYear} onChange={handleDetailsOnchange} name="publisherYear" />
            </Form.Item>

            <Form.Item
              label="Trọng lượng sách"
              name="weight"
              rules={[
                {
                  required: true,
                  message: 'Nhập trọng lượng sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.weight} onChange={handleDetailsOnchange} name="weight" />
            </Form.Item>

            <Form.Item
              label="Kích thước bao bì"
              name="packagingSize"
              rules={[
                {
                  required: true,
                  message: 'Nhập kích thước bao bì sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.packagingSize} onChange={handleDetailsOnchange} name="packagingSize" />
            </Form.Item>

            <Form.Item
              label="Số trang"
              name="pages"
              rules={[
                {
                  required: true,
                  message: 'Nhập số trang!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.pages} onChange={handleDetailsOnchange} name="pages" />
            </Form.Item>

            <Form.Item
              label="Hình thức bìa"
              name="form"
              rules={[
                {
                  required: true,
                  message: 'Nhập hình thức bìa sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.form} onChange={handleDetailsOnchange} name="form" />
            </Form.Item>

            <Form.Item
              label="Mô tả sách"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Nhập mô tả sách!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.description} onChange={handleDetailsOnchange} name="description" />
            </Form.Item>

            <Form.Item
              label="Số lượng tồn kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Nhập số lượng tồn kho!',
                },
              ]}
            >
              <InputAdminFormComponent value={stateDetailsProduct.countInStock} onChange={handleDetailsOnchange} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Ảnh của sách"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Đăng tải ảnh của sách!',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleDetailsOnchangeImage}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                {stateDetailsProduct?.image && (
                  <img src={stateDetailsProduct?.image} style={{
                    height: '60px',
                    width: '60px',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="image" />
                )}
              </WrapperUploadFile>
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
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} width="420px" height="130px">
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div >
  )
}

export default AdminProduct
