/* Using Build Pattern */
export class ApiBuilderService {

    public _url: string;
    public _token: string;
    public _type: string;
    public _data: string;

    constructor(url: string) {
        this._url = url;
    }

    setToken(token: string) {
        this._token = token;
        return this;
    }

    setType(type: string) {
        this._type = type;
        return this;
    }

    setData(data: any) {
        this._data = data;
        return this;
    }

    get isToken() {
        return this._token;
    }

    get isType() {
        return this._type;
    }

    get isData() {
        return this._data;
    }

    build() {
        return this;
    }
}
