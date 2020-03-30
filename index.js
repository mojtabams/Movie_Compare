const fetchData = async (search) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c4568ff9',
            s: search,
        },
    });
    console.log(response.data);
};

const input = document.querySelector('input');
const debounce = (func, timeOut = 1000) => {

    let timeoutID;
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            func.apply(null, args);
        }, timeOut)

    };
};

const onInput = (event) => {
        fetchData(event.target.value)
    };

input.addEventListener('input', debounce(onInput,500));