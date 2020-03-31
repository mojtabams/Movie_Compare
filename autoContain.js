const createContain = ({
                           container,
                           renderOption,
                           onAListSelect,
                           inputValue,
                           fetchData
                       }) => {

    container.innerHTML = `
    <label><b>Search</b></label>
    <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                </div>
            </div>
        </div>
    
`;
    const input = container.querySelector("input");
    const dropdown = container.querySelector(".dropdown");
    const content = container.querySelector(".dropdown-content");

    const onInput = async event => {
        const items = await fetchData(event.target.value);

        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        content.innerHTML = ``;
        dropdown.classList.add('is-active');
        for (let item of items) {
            const aList = document.createElement('a');

            aList.classList.add('dropdown-item');
            aList.innerHTML = renderOption(item);

            aList.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onAListSelect(item);
            });

            content.appendChild(aList);
        }

    };

    input.addEventListener('input', debounce(onInput, 1000));
    document.addEventListener('click', event => {
        if (!container.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
    input.addEventListener('click', event => {
        if (input.value.length > 0) {
            dropdown.classList.add('is-active');
        }
    });
};
