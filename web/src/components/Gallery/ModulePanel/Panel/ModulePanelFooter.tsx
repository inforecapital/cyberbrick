/**
 * Created by Jacob Xie on 9/22/2020.
 */

import {useState} from "react"
import {message, Space} from "antd"
import {CopyOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import {CopyToClipboard} from "react-copy-to-clipboard"
import {useIntl} from "umi"

import * as DataType from "@/components/Gallery/GalleryDataType"

import {Editor} from "@/components/Editor"
import styles from "./Common.less"


const IdViewer = (props: {onClick: (value: boolean) => void}) =>
  <Editor
    icons={{open: <PlusOutlined />, close: <MinusOutlined />}}
    onChange={props.onClick}
  />

export interface ModulePanelFooterProps {
  type: DataType.ElementType
  parentInfo?: string[] | undefined
  id?: string
  date?: string
}

export const ModulePanelFooter = (props: ModulePanelFooterProps) => {
  const intl = useIntl()
  const [viewId, setViewId] = useState<boolean>(false)

  const onCopyClick = () => {
    if (props.parentInfo)
      message.success(intl.formatMessage({id: "gallery.component.module-panel.panel.module-panel-footer1"}))
    else
      message.warn(intl.formatMessage({id: "gallery.component.module-panel.panel.module-panel-footer2"}))
  }

  const showIdAndType = () =>
    <Space size={15}>
      <IdViewer onClick={setViewId} />
      {
        viewId ?
          <Space size={10}>
            <CopyToClipboard
              text={props.parentInfo ? JSON.stringify(props.parentInfo) : ""}
              onCopy={onCopyClick}
            >
              <CopyOutlined style={{color: "#1890ff"}} />
            </CopyToClipboard>

            <Space>
              <span>Type: {props.type}</span>
              <span>ID: {props.id}</span>
            </Space>
          </Space> : <></>
      }
    </Space>

  return (
    <div className={styles.modulePanelFooter}>
      {props.id ? showIdAndType() : <></>}
      {props.date ? <span>Date: {DataType.timeToString(props.date)}</span> : <></>}
    </div>
  )
}

