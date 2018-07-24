
const devMap = {

};

const prodMap = {

};

export default process.env.NODE_ENV === 'production' ? prodMap : devMap;