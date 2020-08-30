/**
 * Created by Jacob Xie on 8/27/2020.
 */

import express from "express"
import { ConnectionOptions } from "typeorm"

import { literatureConnect } from "./orm"
import * as homeController from "./controllers/home"
import { connProdLiterature, connProdGallery } from "../resources/databaseProd"
import { connDevLiterature, connDevGallery } from "../resources/databaseDev"

// Create Express server
const app = express()

// Express configuration
app.set("port", process.env.PORT || 7999)
app.set("env", process.env.NODE_ENV === 'production' ? "prod" : "dev")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.get("/api/homeLogo", homeController.getHomeLogo)
app.post("/api/login/account", homeController.loginAccount)
app.get("/api/currentUserAvatar", homeController.getCurrentUserAvatar)
app.get("/api/currentUser", homeController.getCurrentUser)

// API (Database) routes, wrapped in async function
async function connectionsAwaitLiterature() {
  const literatureConnOptions: ConnectionOptions =
    app.get("env") === "prod" ? connProdLiterature : connDevLiterature

  await literatureConnect(app, literatureConnOptions)

  const connInfo = JSON.stringify(literatureConnOptions, null, 2)
  console.log(`Connected to ${ connInfo }`)
}

async function connectionsAwaitGallery() {
  const galleryConnOptions: ConnectionOptions =
    app.get("ene") === "prod" ? connProdGallery : connDevGallery

  // await galleryConnect(app, galleryConnOptions)

  const connInfo = JSON.stringify(galleryConnOptions, null, 2)
  console.log(`Connected to ${ connInfo }`)
}

export { app, connectionsAwaitLiterature, connectionsAwaitGallery }
