/**
 * Created by Jacob Xie on 12/2/2020
 */

import React, {useEffect, useState} from 'react'
import {ProFormSelect} from "@ant-design/pro-form"
import {Button, Form, Radio, Select, Space, Tooltip} from "antd"
import {DeleteTwoTone, InfoCircleTwoTone, PlusOutlined} from "@ant-design/icons"
import _ from "lodash"


export interface AxisSelectorFormProps {
  mixin: boolean
  columns?: string[]
  getYAxis: (columns: string[]) => void
}

export const AxisSelectorForm = (props: AxisSelectorFormProps) => {

  const [yAxis, setYAxis] = useState<string[] | undefined>(props.columns)
  const [yAxisRecord, setYAxisRecord] = useState<string[][]>([])

  const xAxisOnChange = (col: string) =>
    setYAxis(_.differenceWith(props.columns, [col]))

  const yAxisOnChange = (idx: number) => (cols: string[]) => {
    if (yAxisRecord[idx]) {
      const ud = yAxisRecord.map((r, i) =>
        idx === i ? cols : r
      )
      setYAxisRecord(ud)
    } else
      setYAxisRecord([...yAxisRecord, cols])
  }

  const yAxisOnRelease = (idx: number) => {
    if (yAxisRecord[idx]) {
      const ud = yAxisRecord.filter((r, i) =>
        idx !== i
      )
      setYAxisRecord(ud)
    }
  }

  const getYAxisRest = () => _.differenceWith(yAxis, _.flatten(yAxisRecord))

  useEffect(() => props.getYAxis(getYAxisRest()), [yAxis, yAxisRecord])

  return props.columns ? (
    <>
      {
        props.mixin ?
          <ProFormSelect
            name="bar"
            label="Display as Bar chart"
            fieldProps={{mode: "multiple"}}
            options={props.columns.map(c => ({label: c, value: c}))}
          /> : <></>
      }

      <Form.Item style={{marginBottom: 0}}>
        <Form.Item
          name={["x", "column"]}
          label="X-Axis"
          rules={[{required: true, message: "Please select a column for xAxis!"}]}
          style={{display: 'inline-block', width: 'calc(50% - 10px)'}}
        >
          <Select
            placeholder="Please select a column to be xAxis!"
            onChange={xAxisOnChange}
          >
            {props.columns.map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)}
          </Select>
        </Form.Item>

        <span
          style={{display: 'inline-block', width: '20px', lineHeight: '32px', textAlign: 'center'}}
        />

        <Form.Item
          name={["x", "type"]}
          label="Type"
          rules={[{required: true, message: "Please select a type for xAxis!"}]}
          style={{display: 'inline-block', width: 'calc(50% - 10px)'}}
        >
          <Radio.Group>
            <Radio value="value">Value</Radio>
            <Radio value="category">Category</Radio>
            <Radio value="time">Time</Radio>
            <Radio value="log">Log</Radio>
          </Radio.Group>
        </Form.Item>
      </Form.Item>

      <Space style={{marginBottom: 8}}>
        Y-Axis Extra
        <Tooltip title="Optional: only config for extra y-axis">
          <InfoCircleTwoTone/>
        </Tooltip>
      </Space>
      <Form.List name="y">
        {(fields, {add, remove}) => (
          <>
            {fields.map((field, idx) => (
              <Space key={field.key} style={{display: 'flex'}}>
                <Form.Item
                  {...field}
                  name={[field.name, 'columns']}
                  fieldKey={[field.fieldKey, 'columns']}
                  label='Columns'
                  rules={[{required: true, message: 'Missing columns', type: 'array'}]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Field"
                    style={{width: 200}}
                    onChange={yAxisOnChange(idx)}
                  >
                    {
                      getYAxisRest().map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'position']}
                  fieldKey={[field.fieldKey, 'position']}
                  label='Position'
                  rules={[{required: true, message: 'Missing position'}]}
                  initialValue="right"
                >
                  <Radio.Group>
                    <Radio value="left">Left</Radio>
                    <Radio value="right">Right</Radio>
                  </Radio.Group>
                </Form.Item>

                <DeleteTwoTone
                  twoToneColor="red"
                  onClick={() => {
                    remove(field.name)
                    yAxisOnRelease(idx)
                  }}
                  style={{fontSize: 20, marginTop: 7}}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                block
                icon={<PlusOutlined/>}
                onClick={() => add()}
              >
                Add Y-Axis option
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  ) : <></>
}
