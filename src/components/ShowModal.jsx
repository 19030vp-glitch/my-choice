import { Modal } from 'antd';
const ShowModal = ({ isModalOpen, setIsModalOpen, title, okText, onOkFunc, children }) => {

    return (
        <>
            <Modal title={title} okText={okText} open={isModalOpen} onOk={() => { onOkFunc(); setIsModalOpen(false); }} onCancel={() => { setIsModalOpen(false); }} okButtonProps={{ className: "bg-blue-800 ", }} >
                {children}
            </Modal>
        </>
    );
};
export default ShowModal;