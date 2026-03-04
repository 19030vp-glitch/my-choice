import { Popconfirm } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';

const TableDeleteAction = ({ _id, handleDeleteClick }) => (
    <Popconfirm
        title="Do you want to delete this item?"
        onConfirm={() => handleDeleteClick(_id)}
        onCancel={() => { }}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ type: "default" }}
    >
        <DeleteIcon />
    </Popconfirm>
);

export default TableDeleteAction