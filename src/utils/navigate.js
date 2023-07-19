const checkSupported = () => {
    return Boolean(document.startViewTransition)
}

const navigate = (event) => {
    const toUrl = new URL(event.destination.url);

    if (location.origin !== toUrl.origin) return;

    event.intercept({
        async handler() {
            const response = await fetch(toUrl.pathname);
            const text = await response.text();
            const data = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

            document.startViewTransition(() => {
                document.body.innerHTML = data;
                document.documentElement.scrollTop = 1;
            });
        },
    });
};

const initializeNavigation = () => {
    if (!checkSupported()) return;

    window.navigation.addEventListener('navigate', navigate);
};

export default initializeNavigation;
