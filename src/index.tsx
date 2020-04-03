function component() {
    const element = document.createElement('div');

    element.innerHTML = 'yeah!';

    return element;
}

document.body.appendChild(component());
