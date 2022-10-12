function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes)
      .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

function componentsLoaded() {
    // To be overwritten
}

function _componentsLoaded() {
    // Incase any internal has to be added
    componentsLoaded()
}

window.addEventListener('load', () => {
    const components = document.getElementsByTagName('Component')
    let returnx = false
    for (const component of components) {
        if (!component.hasAttribute('src')) {
            console.error('Component does not specify source!')
            returnx = true
            continue
        }
        const fs = new Fs1()
        fs.promises.readFile(component.getAttribute('src')).then((data, err) => {
            if (err) {
                return console.error(err)
            }
            setInnerHTML(component, data)
        })
        if (!component.hasAttribute('onLoad')) {
            continue
        }
        eval(component.getAttribute('onLoad'))
    }
    if (returnx) {
        return
    }
    _componentsLoaded()
})