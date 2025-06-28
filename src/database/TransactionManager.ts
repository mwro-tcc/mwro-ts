import { PgTransaction } from "drizzle-orm/pg-core"
import { IUserAdapter } from "../infra/database/user/interface"
import { NodePgDatabase, NodePgQueryResultHKT } from "drizzle-orm/node-postgres"
import { ExtractTablesWithRelations } from "drizzle-orm"

export interface IUnitOfWork {
    // Transaction Methods
    Commit(): Promise<void>
    Rollback(): Promise<void>

    // Factory methods
    MakeUserAdapter(): IUserAdapter
}

export type DrizzlePgTransaction = PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>

export class DrizzleUnitOfWork implements IUnitOfWork {
    tx: DrizzlePgTransaction

    constructor(
        tx: DrizzlePgTransaction
    ) { this.tx = tx }

    async Commit(): Promise<void> {
        return
    }
    async Rollback(): Promise<void> {
        return
    }

    MakeUserAdapter(): IUserAdapter {

    }
}

export interface ITransactionManager {
    WithTx(f: (unitOfWork: IUnitOfWork) => Promise<void>): Promise<void>
}

export class DrizzleTransactionManager implements ITransactionManager {
    conn: NodePgDatabase

    constructor(
        conn: NodePgDatabase
    ) {
        this.conn = conn
    }

    async WithTx(f: (unitOfWork: IUnitOfWork) => Promise<void>): Promise<void> {
        await this.conn.transaction(async tx => {
            const unitOfWork = new DrizzleUnitOfWork(tx)
            f(unitOfWork)
        })
    }
}

