//import  { serve } from "@hono/node-server"
import { handle } from "hono/vercel" 
import app from "./route";

export const runtime = 'edge'

export default handle(app);