import { setDatabaseEnumerator, databaseEnumerator } from './../../helpers/database-enumerator';

export interface IDexieDependencies{
    indexedDB?: IDBFactory,
    IDBKeyRange?: IDBKeyRange
}

export class DexieDependencies implements IDexieDependencies{
    public constructor(args?: IDexieDependencies){
        if (args !== void 0){
            this.IDBKeyRange = args.IDBKeyRange;
            this.indexedDB = args.indexedDB;
            this.pIDBError = (args as any).iDBError;
        }
    }
    private pIndexedDB?: IDBFactory;
    private pIDBError?: Error;
    public IDBKeyRange?: IDBKeyRange;
    public get indexedDB(){
        if (this.pIDBError) { throw this.pIDBError}
        return this.pIndexedDB;
    }
    public set indexedDB(value: IDBFactory | undefined)
    {
        if (value !== this.pIndexedDB) {
            this.pIndexedDB = value;
            this.pIDBError = void 0;
            setDatabaseEnumerator(value);
        }
    }
}
