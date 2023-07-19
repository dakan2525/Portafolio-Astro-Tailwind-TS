if (document.startViewTransition) {
    window.navigation.addEventListener('navigate', async (event) => {
        const toUrl = new URL(event.destination.url);

        // es una página externa? si es así, lo ignoramos
        if (location.origin !== toUrl.origin) return;

        // si es una navegación en el mismo dominio (origen)
        event.intercept({
            async handler() {
                try {
                    // vamos a cargar la página de destino
                    // utilizando un fetch para obtener el HTML
                    const response = await fetch(toUrl.pathname);
                    const text = await response.text();

                    // Crear un nuevo elemento div y establecer el HTML cargado en él
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = text;

                    // Obtener el contenido dentro de la etiqueta <main>
                    const mainContent = tempDiv.querySelector('main').innerHTML;

                    // utilizar la API de View Transition
                    document.startViewTransition(() => {
                        // el scroll hacia arriba del todo
                        document.body.innerHTML = mainContent;
                        document.documentElement.scrollTop = 1;
                    });
                } catch (error) {
                    console.error('Error al cargar la página:', error);
                }
            },
        });
    });
}























// if (document.startViewTransition) {
//     window.navigation.addEventListener('navigate', (event) => {
//         const toUrl = new URL(event.destination.url);

//         // es una página externa? si es así, lo ignoramos
//         if (location.origin !== toUrl.origin) return;

//         // si es una navegación en el mismo dominio (origen)
//         event.intercept({
//             async handler() {
//                 // vamos a cargar la página de destino
//                 // utilizando un fetch para obtener el HTML
//                 const response = await fetch(toUrl.pathname);
//                 const text = await response.text();
//                 // quedarnos sólo con el contenido del html dentro de la etiqueta body
//                 // usamos un regex para extraerlo
//                 // const data = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

//                 const bodyMatch = text.match(/<main[^>]*>([\s\S]*)<\/main>/i);
//                 const data = bodyMatch ? bodyMatch[1] : '';

//                 // utilizar la api de View Transition API
//                 document.startViewTransition(() => {
//                     // el scroll hacia arriba del todo
//                     document.body.innerHTML = data;
//                     document.documentElement.scrollTop = 1;
//                 });
//             },
//         });
//     });
// }
