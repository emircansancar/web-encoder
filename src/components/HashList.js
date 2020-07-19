import React from "react"
import { Tag, List, Button, Tooltip, Popover, Row, Col, Spin, Progress } from "antd";
import { CopyOutlined, SwapOutlined } from '@ant-design/icons';
import HashVerification from "./HashVerification";

const { CheckableTag } = Tag;


const listInHashWrapperStyles = {
  flex: 1,
  overflow: 'hidden',
}
const listInHashTextStyles = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
}
const spinInProgressStyles = {
  position: 'unset',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 0,
  padding: '0 7.5%',
}


const HashList = ({ hashTypes, activeTabKey, activeHashes, calculateHashes, hashListLoading }) => {
  const handleClipboardToCopy = value => {
    navigator.clipboard.writeText(value)
  }

  const handleTagChange = (hashType, checked) => {
    const nextActiveHashes = checked ?
      [...activeHashes, { hashType, valuesByType: { text: null, file: null } }] :
      activeHashes.filter(x => x.hashType !== hashType)
    calculateHashes(nextActiveHashes)
  }

  return (
    <Spin spinning={hashListLoading.loading} indicator={
      <div style={spinInProgressStyles}>
        <Progress percent={hashListLoading.percent} status={hashListLoading.status}/>
      </div>
    }>
      <List
        header={<div className="hash-types-list-header">
          {hashTypes.map(hashType => (
            <CheckableTag
              key={hashType}
              checked={activeHashes.some(x => x.hashType === hashType)}
              onChange={checked => handleTagChange(hashType, checked)}
            >{hashType}</CheckableTag>))}
        </div>}
        size="small"
        bordered
        dataSource={activeHashes}
        renderItem={item => <List.Item>
          <Row className="w-100">
            <Col flex="min-content">
              {item.hashType}
            </Col>

            <Col className="mx-2" style={listInHashWrapperStyles}>
              <div className="mx-auto" style={listInHashTextStyles}>
                {item.valuesByType[activeTabKey]}
              </div>
            </Col>

            <Col flex="min-content">
              {(() => {
                const btn = <Button shape="circle" icon={<SwapOutlined />} disabled={!item.valuesByType[activeTabKey]} />
                if (btn.props.disabled) {
                  return btn
                }
                return <Popover title="Hash Verification" content={<HashVerification hash={item.valuesByType[activeTabKey]} />}>
                  {btn}
                </Popover>
              })()}
              <Tooltip title="Copied" trigger="click">
                <Button
                  shape="circle"
                  icon={<CopyOutlined />}
                  className="ml-2"
                  disabled={!item.valuesByType[activeTabKey]}
                  onClick={() => handleClipboardToCopy(item.valuesByType[activeTabKey])} />
              </Tooltip>
            </Col>
          </Row>
        </List.Item>}

      />
    </Spin>
  )
}

export default HashList
