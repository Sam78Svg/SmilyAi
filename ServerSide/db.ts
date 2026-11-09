
// @ts-expect-error The installed `pg` package does not include TypeScript declarations.
import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    connectionString:process.env.DB_URL,
    ssl:{
        rejectUnauthorized:false
    },
    max:10,
    idealTimeoutMillies:30000,
    connectionTimeoutMillies:10000
});

pool.query("select NOW()")
    .then((result:any) => {
        console.log("DB connection successful:", result.row[0]);
    })
    .catch((err: any) => {
         console.error('[db] PostgreSQL test FAILED');
        console.error('name:', err.name);
        console.error('message:', err.message);
        console.error('code:', err.code);
        console.error('detail:', err.detail);
        console.error('stack:', err.stack);
    })

export default pool;