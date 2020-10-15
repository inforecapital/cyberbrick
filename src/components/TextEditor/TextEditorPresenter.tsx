/**
 * Created by Jacob Xie on 8/17/2020.
 */

import React, { useEffect, useState } from "react"
import ReactQuill from "react-quill"

import 'react-quill/dist/quill.bubble.css'

export interface DisplayPresenterProps {
  content: string
  styling?: string
}

/**
 * ReactQuill is an uncontrolled component, should force render by using `useEffect` when props.content changed
 */
export const TextEditorPresenter = (props: DisplayPresenterProps) => {
  const style = props.styling ? props.styling : undefined

  const [value, setValue] = useState<string>(props.content)

  useEffect(() => setValue(props.content), [props.content])

  return <ReactQuill
    className={ style }
    theme="bubble"
    value={ value }
    onChange={e => setValue(e)}
    readOnly
  />
}
