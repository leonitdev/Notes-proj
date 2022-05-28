export class BaseResponse {
  success: boolean;
  status: number;

  /**
   *
   */
  constructor(success: boolean, status: number) {
    this.success = success;
    this.status = status;
  }
}

export class CreateResponseObject<T> extends BaseResponse {
  link?: string;
  item: T;

  /**
   *
   */
  constructor(success: boolean, status: number, link: string, item: T) {
    super(success, status);
    this.link = link;
    this.item = item;
  }
}

export class ResponseObject<T> extends BaseResponse {
  item: T;

  /**
   *
   */
  constructor(success: boolean, status: number, item: T) {
    super(success, status);
    this.item = item;
  }
}

export class ResponseArray<T> extends BaseResponse {
  items: T[];
  totalCount?: number;

  /**
   *
   */
  constructor(
    success: boolean,
    status: number,
    items: T[],
    totalCount?: number,
  ) {
    super(success, status);
    this.items = items;
    this.totalCount = totalCount;
  }
}
