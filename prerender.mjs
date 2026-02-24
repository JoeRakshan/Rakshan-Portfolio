import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import Critters from "critters";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = ["/"];

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  const critters = new Critters({
    path: path.resolve(__dirname, "dist"),
    preload: "media",
    inlineFonts: false,
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const template = fs.readFileSync(
      path.resolve(__dirname, "dist/index.html"),
      "utf-8"
    );

    for (const route of ROUTES) {
      const appHtml = render(route);
      let html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Inline critical CSS and defer the rest
      html = await critters.process(html);

      const filePath =
        route === "/"
          ? path.resolve(__dirname, "dist/index.html")
          : path.resolve(__dirname, `dist${route}/index.html`);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html);
      console.log(`Prerendered: ${route}`);
    }
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
