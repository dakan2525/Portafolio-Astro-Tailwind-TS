const checkSupported = () => {
    return !!document.startViewTransition; // Retorna true si document.startViewTransition es una función, y false si es null, undefined, o cualquier otro valor falsy.
}

export default function Navigate () {

if (!checkSupported()) return

    
    window.navigation.addEventListener('navigate', (event) => {
        const toUrl = new URL(event.destination.url);

    if (location.origin !== toUrl.origin) return;
    // es una página externa? si es así, lo ignoramos
        
    // si es una navegación en el mismo dominio (origen)
    event.intercept({
        async handler () {
            // vamos a cargar la página de destino
            // utilizando un fetch para obtener el HTML
            const response = await fetch(toUrl.pathname); // /clean-code
            const text = await response.text();
            // quedarnos sólo con el contenido del html dentro de la etiqueta body
            // usamos un regex para extraerlo
            const data = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
    
            // utilizar la api de View Transition API
            document.startViewTransition(() => {
                // el scroll hacia arriba del todo
                document.body.innerHTML = data;
                document.documentElement.scrollTop = 1;
            })
        }
    })
})
}
