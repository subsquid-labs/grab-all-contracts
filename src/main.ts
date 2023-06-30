import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {CreatedContract} from './model'
import {lookupArchive} from '@subsquid/archive-registry'

const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
    })
    .setFields({
        trace: {
            createResultAddress: true,
        },
    })
    .addTrace({
        type: ['create'],
        transaction: true,
    })

processor.run(new TypeormDatabase({supportHotBlocks: false}), async (ctx) => {
    const contracts: Map<string, CreatedContract> = new Map()
    const addresses: Set<string> = new Set()
    for (let c of ctx.blocks) {
        for (let trc of c.traces) {
            if (trc.type === 'create' && trc.result?.address != null && trc.transaction?.hash !== undefined) {
                contracts.set(trc.result.address, new CreatedContract({id: trc.result.address}))
            }
        }
    }
    await ctx.store.upsert([...contracts.values()])
})
