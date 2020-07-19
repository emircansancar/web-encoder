import React, { useState, useEffect } from "react"
import { Upload, Tag } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const InputFile = ({ onChange }) => {
  const [fileList, setFileList] = useState([])

  const uploadDraggerProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload: file => {
      setFileList([file]);
      return false;
    },
    fileList
  };

  const fileListEmpty = () => {
    setFileList([]);
  }

  useEffect(() => {
    const file = fileList.length > 0 ? fileList[0] : null
    onChange(file)
  }, [fileList])

  return (
    <Dragger {...uploadDraggerProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      {
        fileList.length > 0 &&
        <Tag closable color="blue" onClose={fileListEmpty} onClick={(e) => e.stopPropagation()}>
          {fileList[0].name}
        </Tag>
      }
    </Dragger>
  )
}

export default InputFile
