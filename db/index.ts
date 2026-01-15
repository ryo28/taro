import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as authSchemas from "./schemas/auth"
import * as petSchemas from "./schemas/pet"
//auth.tsからスキーマをまとめてインポートしている
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle({ 
    client,
    schema:{
        //この中にスキーマを追加していく
        ...authSchemas,
        ...petSchemas,
    }
} );