/**
 * Created by Jacob Xie on 8/29/2020.
 */
import { Equal } from "typeorm"
import { body, query } from "express-validator"
import * as utils from "../utils"

// db name
export const db = "gallery"

// table name
export const category = "category"
export const dashboard = "dashboard"
export const template = "template"
export const element = "element"
export const content = "content"
export const mark = "mark"
export const tag = "tag"
export const author = "author"

// column name
export const id = "id"
export const name = "name"
export const date = "date"
export const text = "text"
export const title = "title"
export const contents = "contents"
export const elements = "elements"
export const templates = "templates"
export const marks = "marks"
export const tags = "tags"

// relations column
export const markCategory = `${ mark }.${ category }`
export const markName = `${ mark }.${ name }`
export const categoryName = `${ category }.${ name }`

// column enum
export enum ElementType {
  EmbedLink = "embedLink",
  Text = "text",
  TargetPrice = "targetPrice",
  Image = "image",
  FileList = "fileList",
  FileManager = "fileManager",
  EditableTable = "editableTable",
  Table = "table",
  Lines = "lines",
  Histogram = "histogram",
  Pie = "pie",
  Scatter = "scatter",
  Heatmap = "heatmap",
  Box = "box",
  Tree = "tree",
  TreeMap = "treeMap",
}

// joint column name
export const elementsContents = `${ elements }.${ contents }`
export const templatesElements = `${ templates }.${ elements }`
export const templatesElementsContents = `${ templates }.${ elements }.${ contents }`

// query filters
export const whereDashboardAndTemplateNameEqual = (dn: string, tn: string) =>
  ({ where: { name: Equal(dn), "templates.name": Equal(tn) } })

export const whereDashboardNameAndTemplateEqual = (dn: string, tn: string) =>
  ({ where: { "dashboard.name": Equal(dn), name: Equal(tn) } })

// express validator
export const queryFieldCheck = (field: string) =>
  query(field, utils.messageRequestQuery(field)).exists()

export const queryIdCheck =
  query(id, utils.messageRequestQuery(id)).exists()

export const queryIdsCheck =
  query("ids", utils.messageRequestQuery("ids")).exists()

export const queryNameCheck =
  query(name, utils.messageRequestQuery(name)).exists()

export const queryNamesCheck =
  query("names", utils.messageRequestQuery("names")).exists()

export const queryDashboardNameCheck =
  query("dashboardName", utils.messageRequestQuery("dashboardName")).exists()

export const queryTemplateNameCheck =
  query("templateName", utils.messageRequestQuery("templateName")).exists()

export const bodyNameCheck =
  body(name, utils.messageRequestBody(name)).isLength({ min: 1 }).exists()

