import React, { useState, useEffect } from "react"
import { Input, Tooltip } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { green, red } from '@ant-design/colors';

const successfulSuffix = (
  <Tooltip title="Verification Successful">
    <CheckCircleTwoTone twoToneColor={green.primary} />
  </Tooltip>
)
const failedSuffix = (
  <Tooltip title="Verification Failed">
    <CloseCircleTwoTone twoToneColor={red.primary} />
  </Tooltip>
)

const HashVerification = ({ hash }) => {
  const [isVerified, setIsVerified] = useState(false)
  const [inputValue, setInputValue] = useState(null)

  const handleInputOnChange = e => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setIsVerified(inputValue === hash)
  }, [inputValue])

  return (
    <div>
      <Input
        placeholder="Enter your hash"
        size="large"
        suffix={inputValue ? (isVerified ? successfulSuffix : failedSuffix) : null}
        onChange={handleInputOnChange}
      />
    </div>
  )
}

export default HashVerification
