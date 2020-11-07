/**
 * Created by Jacob Xie on 10/26/2020.
 */

import {Module} from "@nestjs/common"

import {CollectionService} from "./collection.service"
import {FileController} from "./file.controller"
import {HomeController} from "./home.controller"
import {MiscController} from "./misc.controller"


@Module({
  providers: [
    CollectionService
  ],
  controllers: [
    FileController,
    HomeController,
    MiscController,
  ]
})
export class CollectionModule {}
