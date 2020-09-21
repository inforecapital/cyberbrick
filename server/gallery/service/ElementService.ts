/**
 * Created by Jacob Xie on 9/16/2020.
 */

import { getConnection } from "typeorm"

import * as common from "../common"
import * as utils from "../../utils"
import { Element } from "../entity/Element"
import { Content } from "../entity/Content"
// import { Mark } from "../entity/Mark"


const elementRepo = () => getConnection(common.db).getRepository(Element)

const templateAndContentRelations = {
  relations: [
    common.template,
    common.contents
  ]
}

export async function getAllElements() {
  return elementRepo().find(templateAndContentRelations)
}

export async function getElementsByIds(ids: string[]) {
  return elementRepo().find({
    ...templateAndContentRelations,
    ...utils.whereIdsIn(ids)
  })
}

export async function saveElement(element: Element) {
  const er = elementRepo()
  const newEle = er.create(element)
  await er.save(newEle)

  return utils.HTMLStatus.SUCCESS_MODIFY
}

export async function deleteElement(id: string) {
  await elementRepo().delete(id)

  return utils.HTMLStatus.SUCCESS_DELETE
}

// =====================================================================================================================


export async function getElementLatestContent(id: string, markName?: string) {
  const ans = await elementRepo()
    .createQueryBuilder(common.element)
    .select(common.elementId)
    .leftJoin(qb => {
        let raw = qb.from(Content, common.content)
        if (markName)
          raw = qb
            .leftJoinAndSelect(common.contentMark, common.mark)
            .where(`${ common.markName } = :markName`, { markName })
        return raw
          .select(`MAX(${ common.date })`, "date")
          .addSelect(`"elementId"`, "eid")
          .groupBy("eid")
      },
      "last_date",
      "last_date.eid = element.id"
    )
    .leftJoinAndSelect(
      common.elementContents,
      common.content,
      `${ common.contentDate } = last_date.date`
    )
    .where(`${ common.elementId } = :id`, { id })
    .getOne()

  if (ans) return ans
  return {}
}
