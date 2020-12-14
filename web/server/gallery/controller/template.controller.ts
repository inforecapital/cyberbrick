/**
 * Created by Jacob Xie on 8/29/2020.
 */

import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query} from '@nestjs/common'

import * as templateService from "../provider/template.service"
import {Template} from "../entity"
import {TemplateCopyElementsDto} from "../dto"
import {TemplateCopyElementsPipe} from "../pipe"


@Controller()
export class TemplateController {
  constructor(private readonly service: templateService.TemplateService) {}

  @Get("templates")
  getAllTemplates() {
    try {
      return this.service.getAllTemplates()
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("template")
  getTemplateById(@Query("id") id: string) {
    try {
      return this.service.getTemplateById(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("template")
  saveTemplate(@Body() template: Template) {
    try {
      return this.service.saveTemplate(template)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete("template")
  deleteTemplate(@Query("id") id: string) {
    try {
      return this.service.deleteTemplate(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // ===================================================================================================================

  @Get("getTemplateElementsContents")
  getTemplateElementsContents(@Query("id") id: string) {
    try {
      return this.service.getTemplateElementsContents(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("getTemplateElements")
  getTemplateElements(@Query("id") id: string) {
    try {
      return this.service.getTemplateElements(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("saveTemplateInDashboard")
  saveTemplateInDashboard(@Query("id") id: string,
                          @Body() template: Template) {
    try {
      return this.service.saveTemplateInDashboard(id, template)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("modifyTemplate")
  modifyTemplate(@Query("id") id: string,
                 @Body() template: Template) {
    try {
      return this.service.modifyTemplate(id, template)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("copyTemplateElements")
  copyTemplateElements(@Body(TemplateCopyElementsPipe) cpy: TemplateCopyElementsDto) {
    try {
      return this.service
        .copyTemplateElements(
          cpy.originTemplateId,
          cpy.targetTemplateId,
        )
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("updateTemplateElements")
  updateTemplateElements(@Body() template: Template) {
    try {
      return this.service.updateTemplateElements(template)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

