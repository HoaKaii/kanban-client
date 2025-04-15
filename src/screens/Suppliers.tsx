import { Button, Space, Table, Tooltip, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Edit2, Sort, UserRemove } from 'iconsax-react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import handleAPI from "../apis/handleAPI";
import { colors } from '../constants//colors';
import { ToogleSupplier } from "../modals";
import { SupplierModel } from "../models/SupplierModel";
import { current } from "@reduxjs/toolkit";

const { Title, Text } = Typography;

const Suppliers = () => {
    const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false);
    const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnProps<SupplierModel>[] = [
        {
            key: 'index',
            dataIndex: 'index',
            title: 'ID',
            align: 'center'
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Supplier Name',
        },
        {
            key: 'product',
            dataIndex: 'product',
            title: 'Product',
        },
        {
            key: 'contact',
            dataIndex: 'contact',
            title: 'Contact Number',
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
        },
        {
            key: 'type',
            dataIndex: 'isTaking',
            title: 'Type',
            render: (isTaking: boolean) => (
                <Text type={isTaking ? 'success' : 'danger'}>
                    {isTaking ? 'Taking Return' : 'Not Taking Return'}
                </Text>
            ),
        },
        {
            key: 'on',
            dataIndex: 'active',
            title: 'On the way',
            render: (num) => num ?? '-',
        },
        {
            key: 'buttonContainer',
            dataIndex: '',
            title: 'Actions',
            render: (item: SupplierModel) => (
                <Space>
                    <Tooltip title='Edit'>
                        <Button
                            type='text'
                            onClick={() => {
                                setSupplierSelected(item);
                                setIsVisibleModalAddNew(true);
                            }}
                            icon={<Edit2 size={18} color='#0dcaf0' />}
                        />
                    </Tooltip>
                    <Tooltip title='Remove'>
                        <Button
                            onClick={() => Swal.fire({
                                title: 'Confirm',
                                text: 'Are you sure want to remove this?',
                                icon: 'warning',
                                showCancelButton: true,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    removeSupplier(item._id);
                                }
                            })}
                            type='text'
                            icon={<UserRemove size={18} color='#dc3545' />}
                        />
                    </Tooltip>
                </Space>
            ),
            fixed: 'right',
            align: 'right',
        },
    ];

    useEffect(() => {
        getSuppliers();
    }, [page, pageSize]);

    const getSuppliers = async () => {
        const api = `/supplier?page=${page}&pageSize=${pageSize}`;
        setIsLoading(true);
        try {
            const res = await handleAPI(api);
            res.data && setSuppliers(res.data.items);

            const items: SupplierModel[] = [];
            res.data.items.forEach((item: any, index: number) => items.push({
                index: (page - 1) * pageSize + (index + 1),
                ...item
            }))

            setSuppliers(items);
            setTotal(res.data.total);
        } catch (error: any) {
            toast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const removeSupplier = async (id: string) => {
        try {
            // soft delete
            // await handleAPI(`/supplier/update?id=${id}`, { isDeleted: true }, 'put');
            // delete
            await handleAPI(`/supplier/remove?id=${id}`, undefined, 'delete');
            getSuppliers();
        } catch (error) {
            console.log(error);
        }
    };

    // const handleAddDemoData = () => {
    //     demodata.forEach(async (item) => {
    //         const data = {
    //             name: item.title,
    //             product: "Candy",
    //             email: "hoaktyk0412@gmail.com",
    //             active: "123",
    //             categories: "",
    //             price: Math.floor(Math.random() * 100),
    //             contact: "0123456789",
    //             isTaking: 0,
    //             slug: replaceName(item.title),
    //         };
    //         const api = `/supplier/add-new`;
    //         try {
    //             await handleAPI(api, data, 'post');
    //             console.log('Add done');
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // };

    return (
        <div>
            {/* <Button onClick={handleAddDemoData}>Add demo data</Button> */}
            <Table
                pagination={{
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => {
                        setPageSize(size);
                    },
                    total,
                    onChange(page, pageSize) {
                        setPage(page);
                    }
                }}
                scroll={{
                    y: 'calc(100vh - 270px)'
                }}
                loading={isLoading}
                dataSource={suppliers}
                columns={columns}
                title={() => (
                    <div className="row">
                        <div className="col">
                            <Title level={5}>Suppliers</Title>
                        </div>
                        <div className="col text-right">
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => setIsVisibleModalAddNew(true)}>
                                    Add Suppliers
                                </Button>
                                <Button icon={<Sort size={20} color={colors.gray600} />}>
                                    Filters
                                </Button>
                                <Button>Download all</Button>
                            </Space>
                        </div>
                    </div>
                )}
            />
            <ToogleSupplier
                visible={isVisibleModalAddNew}
                onClose={() => {
                    supplierSelected && getSuppliers();
                    setSupplierSelected(undefined)
                    setIsVisibleModalAddNew(false)
                }}
                onAddNew={(val) => setSuppliers([...suppliers, val])}
                supplier={supplierSelected}
            />
        </div>
    );
};

export default Suppliers;