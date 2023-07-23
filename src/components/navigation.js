//Intercepta las transiciones de navegación
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
                        document.body.innerHTML = mainContent;
                        // el scroll hacia arriba del todo
                        // document.documentElement.scrollTop = 1;
                    });
                } catch (error) {
                    console.error('Error al cargar la página:', error);
                }
            },
        });
    });
}

















// if (document.startViewTransition) {
//     window.navigation.addEventListener('navigate', async (event) => {
//         const toUrl = new URL(event.destination.url);

//         // es una página externa? si es así, lo ignoramos
//         if (location.origin !== toUrl.origin) return;

//         // si es una navegación en el mismo dominio (origen)
//         event.intercept({
//             async handler() {
//                 try {
//                     // vamos a cargar la página de destino
//                     // utilizando un fetch para obtener el HTML
//                     const response = await fetch(toUrl.pathname);
//                     const text = await response.text();

//                     // Crear un nuevo elemento div y establecer el HTML cargado en él
//                     const tempDiv = document.createElement('div');
//                     tempDiv.innerHTML = text;

//                     // Obtener el contenido dentro de la etiqueta <main>
//                     const mainContent = tempDiv.querySelector('main').innerHTML;

//                     // utilizar la API de View Transition
//                     document.startViewTransition(() => {
//                         document.body.innerHTML = mainContent;
//                         // el scroll hacia arriba del todo
//                         document.documentElement.scrollTop = 1;
//                     });
//                 } catch (error) {
//                     console.error('Error al cargar la página:', error);
//                 }
//             },
//         });
//     });
// }