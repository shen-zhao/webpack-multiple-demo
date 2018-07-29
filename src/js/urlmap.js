
const devMap = {
    detail: '../mock/json/detail.json',
    list: '../mock/json/list.json'
};

const prodMap = {
    detail: 'app/detail',
    list: 'app/list'
};

export default process.env.NODE_ENV === 'production' ? prodMap : devMap;