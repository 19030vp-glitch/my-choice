import React, { useState } from 'react';
import { FloatButton, Tooltip, Button, Modal, Popconfirm, } from 'antd';
import { QuestionCircleOutlined, SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';

const FloatButtons = ({ setAutoSaveLoader, autoSaveLoader }) => {

    const info = () => {
        Modal.info({
            title: 'Academic & Administrative Audit',
            width: 1000,
            okButtonProps: { type: "default" },
            content: (
                <div>
                    <p>Instructions : </p>
                    <p>1. Click on the any activity you care to fill.</p>
                    <p>2. Once you have finished filling up the activity, click on the save progress button <SaveOutlined /> . </p>
                    <p>3. There're two save progress buttons, both do same task i.e. saving the information. First, you can see on the top side of your page and second one is at the extreme bottom-right side.</p>
                    <p>4. Always save your progress before leaving the page, otherwise you'll lose your data.</p>
                    <p>5. Refreshing page without saving would lead to losing your filled data.</p>
                </div>
            ),
            onOk() { },
        });
    };




    return <>

        <FloatButton.Group
            shape="square"
            style={{
                right: 24,
            }}
            type="primary"
        >
            <Tooltip placement="left" title="Open Help Prompt">
                <FloatButton icon={<QuestionCircleOutlined />} onClick={info} />
            </Tooltip>

            {
                !autoSaveLoader ?
                    <Tooltip placement="left" title="Save Progress">
                        <FloatButton description="Save" icon={<SaveOutlined className='text-blue-800' />} onClick={() => { setAutoSaveLoader(true) }} />
                    </Tooltip>
                    :
                    <Tooltip placement="left" title="Saving...">
                        <FloatButton description="Saving" icon={<LoadingOutlined style={{ fontSize: 20, }} spin />} />
                    </Tooltip>
            }

            <Tooltip placement="left" title="Back to top">
                <FloatButton.BackTop visibilityHeight={-1} />
            </Tooltip>

        </FloatButton.Group>
    </>
}
export default FloatButtons;
