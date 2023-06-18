module.exports = class Data1687112517603 {
    name = 'Data1687112517603'

    async up(db) {
        await db.query(`CREATE TABLE "created_contract" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "address" text NOT NULL, "tx_hash" text, CONSTRAINT "PK_4d320d21625a693262c8857f9d4" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_241b6ba7a0feacce4b9be6f0a0" ON "created_contract" ("block") `)
        await db.query(`CREATE INDEX "IDX_478a6d6c07bd1f235ff2186b19" ON "created_contract" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_b5a1b4735665b5f8e30fce753d" ON "created_contract" ("address") `)
        await db.query(`CREATE INDEX "IDX_4b4db4a89ba90c454b36ffe618" ON "created_contract" ("tx_hash") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "created_contract"`)
        await db.query(`DROP INDEX "public"."IDX_241b6ba7a0feacce4b9be6f0a0"`)
        await db.query(`DROP INDEX "public"."IDX_478a6d6c07bd1f235ff2186b19"`)
        await db.query(`DROP INDEX "public"."IDX_b5a1b4735665b5f8e30fce753d"`)
        await db.query(`DROP INDEX "public"."IDX_4b4db4a89ba90c454b36ffe618"`)
    }
}
