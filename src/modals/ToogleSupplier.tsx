import { Avatar, Button, Form, Modal, Typography } from "antd";
import { User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import handleAPI from "../apis/handleAPI";
import { colors } from "../constants/colors";
import { SupplierModel } from "../models/SupplierModel";
import { replaceName } from "../utils/replaceName";
import { uploadFile } from "../utils/uploadFile";
// import { demodata } from "../data/demodata";
import { FormModel } from "../models/FormModel";
import FormItem from "../components/FormItem";

const { Paragraph } = Typography

interface Props {
    visible: boolean;
    onClose: () => void;
    onAddNew: (val: any) => void;
    supplier?: SupplierModel;
}

const ToogleSupplier = (props: Props) => {
    const { visible, onAddNew, onClose, supplier } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isGetting, setIsGetting] = useState(false);
    const [isTaking, setIsTaking] = useState<boolean>();
    const [formData, setFormData] = useState<FormModel>();
    const [file, setFile] = useState<any>();

    const [form] = Form.useForm();
    const inpRef = useRef<any>(null);

    useEffect(() => {
        getFormData();
    }, []);

    useEffect(() => {
        if (supplier) {
            form.setFieldsValue(supplier);
            setIsTaking(supplier.isTaking === 1)
        }
    }, [supplier]);

    const addNewSupplier = async (values: any) => {

        setIsLoading(true);
        const data: any = {};
        const api = `/supplier/${supplier ? `update?id=${supplier._id}` : 'add-new'}`;

        for (const i in values) {
            data[i] = values[i] ?? '';
        }

        data.price = values.price ? parseInt(values.price) : 0;
        data.isTaking = isTaking ? 1 : 0;

        if (file) {
            data.photoUrl = await uploadFile(file);
        }

        data.slug = replaceName(values.name);

        try {
            const res: any = await handleAPI(api, data, supplier ? 'put' : 'post');
            toast(res.message);
            !supplier && onAddNew(res.data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFormData = async () => {

        const api = `supplier/get-form`;
        setIsGetting(true);
        try {
            const res = await handleAPI(api);
            res.data && setFormData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGetting(false);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    }

    return (
        <Modal
            loading={isGetting}
            closable={!isLoading}
            open={visible}
            onClose={handleClose}
            onCancel={handleClose}
            onOk={() => form.submit()}
            okButtonProps={{
                loading: isLoading,
            }}
            title={supplier ? 'Update Supplier' : 'Add Supplier'}
            okText={supplier ? 'Update' : 'Add Supplier'}
            cancelText='Discard'>
            <label htmlFor="inpFile" className="p-2 mb-3 row">
                {file ? (
                    <Avatar size={100} src={URL.createObjectURL(file)} />
                ) : supplier ? (
                    <Avatar size={100} src={supplier.photoUrl} />
                ) : (
                    <Avatar
                        size={100}
                        style={{
                            backgroundColor: 'white',
                            border: '1px dashed #e0e0e0'
                        }}>
                        <User size={80} color={colors.gray600} />
                    </Avatar>
                )}
                <div className="ml-3">
                    <Paragraph className="text-muted m-0">Drag image here</Paragraph>
                    <Paragraph className="text-muted mb-2">Or</Paragraph>
                    <Button onClick={() => inpRef.current.click()} type="link">
                        Browse image
                    </Button>
                </div>
            </label>
            {formData && (
                <Form
                    disabled={isLoading}
                    onFinish={addNewSupplier}
                    layout={formData.layout}
                    labelCol={{ span: formData.labelCol }}
                    wrapperCol={{ span: formData.wrapperCol }}
                    size='middle'
                    form={form}>
                    {formData.formItems.map(item => (
                       <FormItem item={item}/>
                    ))}
                </Form>
            )}

            <div className="d-none">
                <input
                    ref={inpRef}
                    accept="image/*"
                    type='file'
                    name=''
                    id=''
                    onChange={(val: any) => setFile(val.target.files[0])} />
            </div>
        </Modal>
    );
};

export default ToogleSupplier;