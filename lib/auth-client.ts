import { createAuthClient } from "better-auth/react"
import { baseUrl } from "./base-url"
import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins"
import { auth } from "./auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: baseUrl()
    ,
    plugins:[anonymousClient(),inferAdditionalFields<typeof auth>()]
})