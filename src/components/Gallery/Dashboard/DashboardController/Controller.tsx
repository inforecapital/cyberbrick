/**
 * Created by Jacob Xie on 9/24/2020.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { Button, message, Modal, Select, Space } from 'antd'
import { ExclamationCircleOutlined } from "@ant-design/icons"

import * as DataType from "../../GalleryDataType"
import { AddModuleModal } from "./AddModuleModal"

export interface ModuleControllerProps {
  markAvailable?: boolean
  canEdit: boolean
  dashboardNames: string[]
  dashboardOnSelect: (dashboardName: string) => Promise<DataType.Mark[] | undefined>
  markOnSelect: (value: string) => void
  onAddModule: (name: string, timeSeries: boolean, value: DataType.ElementType) => void
  onEditTemplate: (value: boolean) => void
  onSaveTemplate: () => Promise<void>
}

export const Controller = (props: ModuleControllerProps) => {

  const [edit, setEdit] = useState<boolean>(false)
  const [addModuleModalVisible, setAddModuleModalVisible] = useState<boolean>(false)
  const [marks, setMarks] = useState<DataType.Mark[]>([])

  useEffect(() => props.onEditTemplate(edit), [edit])

  const dashboardOnSelect = (value: string) =>
    props.dashboardOnSelect(value).then(res => {
      if (res) setMarks(res)
    })

  const quitAddModule = () => setAddModuleModalVisible(false)

  const saveTemplate = () => Modal.confirm({
    title: "Save current layout?",
    icon: <ExclamationCircleOutlined/>,
    onOk: () => props.onSaveTemplate()
      .then(() => {
        message.success("Template & contents saving successfully!")
        setEdit(false)
      })
      .catch(err => {
        message.error(`Error: ${ err }`)
        setEdit(false)
      })
    ,
    onCancel: () => setEdit(false),
    okText: "Confirm",
    cancelText: "Discard"
  })

  const editMode = useMemo(() => (
    <>
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={ () => setAddModuleModalVisible(true) }
        >
          New module
        </Button>
        <Button
          size="small"
          danger
          onClick={ saveTemplate }
        >
          Exit
        </Button>

      </Space>
      <AddModuleModal
        onAddModule={ props.onAddModule }
        visible={ addModuleModalVisible }
        onQuit={ quitAddModule }
      />
    </>
  ), [addModuleModalVisible])

  const idleMode = useMemo(() => (
    <Button
      type="primary"
      size="small"
      onClick={ () => setEdit(true) }
      disabled={ !props.canEdit }
    >
      Edit
    </Button>
  ), [props.canEdit])

  return (
    <div style={ { display: 'flex', justifyContent: 'space-between' } }>
      <Space>
        <Select
          style={ { width: 120 } }
          onSelect={ dashboardOnSelect }
          size="small"
          placeholder="Dashboard"
        >
          {
            props.dashboardNames.map(n =>
              <Select.Option key={ n } value={ n }>{ n }</Select.Option>
            )
          }
        </Select>
        {
          props.markAvailable ?
            <Select
              style={ { width: 120 } }
              onSelect={ props.markOnSelect }
              disabled={ marks.length === 0 }
              size="small"
              placeholder="Mark"
            >
              {
                marks.map(m =>
                  <Select.Option key={ m.id } value={ m.name }>{ m.name }</Select.Option>
                )
              }
            </Select> :
            <></>
        }
      </Space>
      <div>
        { edit ? editMode : idleMode }
      </div>
    </div>
  )
}

Controller.defaultProps = {
  markAvailable: false
} as Partial<ModuleControllerProps>

