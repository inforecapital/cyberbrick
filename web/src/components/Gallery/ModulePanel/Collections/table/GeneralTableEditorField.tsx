/**
 * Created by Jacob Xie on 12/30/2020
 */

import React, {useState} from 'react'
import {Button, message, Modal} from "antd"
import {ProFormCheckbox, ProFormRadio, StepsForm} from "@ant-design/pro-form"

import _ from "lodash"

import * as DataType from "../../../GalleryDataType"
import {ModuleEditorField} from "../../Generator/data"
import {DataSelectedType, DataSourceSelectorForm} from "./DataSourceSelectorForm"


const viewStyleOptions = [
  {
    label: "Default",
    value: "default"
  },
  {
    label: "Xlsx",
    value: "xlsx"
  }
]

const viewOptionOptions = [
  {
    label: "Hide header",
    value: "header"
  },
  {
    label: "Hide border",
    value: "border"
  }
]


export const GeneralTableEditorField = (props: ModuleEditorField) => {

  const [visible, setVisible] = useState(false)
  const [dataType, setDataType] = useState<DataSelectedType>()
  const [content, setContent] = useState<DataType.Content | undefined>(props.content)
  const [dataColumns, setDataColumns] = useState<string[]>([])

  const saveContent = async (config: Record<string, any>) => {
    if (content) {
      const ctt = {
        ...content,
        date: content.date || DataType.today(),
        config: {type: dataType, ...config}
      }
      props.updateContent(ctt)
      message.success("Updating succeeded!")
    } else
      message.warn("Updating failed! Please ")
    setVisible(false)
  }

  const dataSelectOnFinish = async () => {
    if (content?.data.length === 0) {
      message.warn("Please choose your data!")
      return false
    }
    if (dataType === "file") {
      setDataColumns(_.values(content!.data[0][0]))
      return true
    }
    if (dataType === "dataset") {
      setDataColumns(content!.data.selects)
      return true
    }
    message.warn("Please check data format!")
    return false
  }

  return (
    <div className={props.styling}>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
      >
        Modify
      </Button>

      <StepsForm
        onFinish={saveContent}
        stepsFormRender={(dom, submitter) =>
          <Modal
            title="Setup process"
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={submitter}
            destroyOnClose
          >
            {dom}
          </Modal>
        }
      >
        <StepsForm.StepForm
          name="data"
          title="Data"
          onFinish={dataSelectOnFinish}
        >
          <DataSourceSelectorForm
            content={content}
            saveContent={setContent}
            fetchStorages={props.fetchStorages!}
            fetchTableList={props.fetchTableList!}
            fetchTableColumns={props.fetchTableColumns!}
            dataType={dataType}
            dataSelected={setDataType}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="option"
          title="Option"
          initialValues={{"style": "default"}}
        >
          <ProFormRadio.Group
            name="style"
            label="View style"
            options={viewStyleOptions}
          />
          <ProFormCheckbox.Group
            name="view"
            label="View option"
            options={viewOptionOptions}
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="display"
          title="Display"
        >
          {
            // todo: editable column type display
          }
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  )
}

