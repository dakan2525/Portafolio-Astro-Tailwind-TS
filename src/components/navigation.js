if (document.startViewTransition) {
    window.navigation.addEventListener('navigate', (event) => {
        const toUrl = new URL(event.destination.url);

        // es una página externa? si es así, lo ignoramos
        if (location.origin !== toUrl.origin) return;

        // si es una navegación en el mismo dominio (origen)
        event.intercept({
            async handler() {
                // vamos a cargar la página de destino
                // utilizando un fetch para obtener el HTML
                const response = await fetch(toUrl.pathname);
                const text = await response.text();
                // quedarnos sólo con el contenido del html dentro de la etiqueta body
                // usamos un regex para extraerlo
                const data = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

                // utilizar la api de View Transition API
                document.startViewTransition(() => {
                    // el scroll hacia arriba del todo
                    document.body.innerHTML = data;
                    document.documentElement.scrollTop = 1;
                });
            },
        });
    });
}
