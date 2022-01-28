export class Result {
  total_rows: number = 0;

  offset: number = 0;

  rows: Array<Row> = [];
}

export class Row {
  id: string = '';

  key: string = '';

  value:
    | {
        rev: string;
      }
    | undefined;

  doc:
    | {
        libraryPath: string;
        libraryName: string;
        libraryDesc: string;
        treeCount: number;
        libraryTree: string;
        createdAt: string;
        _id: string;
        _rev: string;
      }
    | undefined;
}
