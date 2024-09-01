export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const userAgent = request.headers.get("User-Agent") || "";
      const isBrowser = /Mozilla|Chrome|Safari|Firefox|Edge|Opera/i.test(
        userAgent
      );

      if (isBrowser) {
        const redirectUrl = new URL("https://github.com/cnamedev/cli");
        redirectUrl.search = url.search;
        redirectUrl.hash = url.hash;

        // Redirect browser requests
        return Response.redirect(redirectUrl.toString(), 302);
      } else {
        try {
          // Fetch install.sh from the project assets
          const installSh = await env.ASSETS.fetch(
            new URL("/install.sh", request.url)
          );
          if (installSh.ok) {
            return new Response(await installSh.text(), {
              headers: { "Content-Type": "text/plain" },
            });
          } else {
            return new Response("File not found", { status: 404 });
          }
        } catch (error) {
          return new Response("Error fetching file", { status: 500 });
        }
      }
    } else {
      // For non-root paths, pass the request through to the static assets or other handlers
      return env.ASSETS.fetch(request);
    }
  },
};
