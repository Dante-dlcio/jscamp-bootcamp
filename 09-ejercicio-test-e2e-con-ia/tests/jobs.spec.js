/* Aquí irá el código de tu test */

// @ts-check
import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173";

test("la pagina principal muestra el input de busqueda", async ({ page }) => {
  await page.goto(URL);
  const searchbox = page.getByRole("searchbox");
  await expect(searchbox).toBeVisible();
});

test("permite buscar empleos por tecnología", async ({ page }) => {
  await page.goto(URL);
  const searchbox = page.getByRole("searchbox");
  await searchbox.fill("React");
  const searchButton = page.getByRole("button", { name: "Buscar" });
  await searchButton.click();
  const resultsHeading = page.getByRole("heading", {
    name: "Resultados de búsqueda",
  });
  await expect(resultsHeading).toBeVisible();
  const results = page.getByRole("article");
  await expect(results.first()).toBeVisible();
});

test("permite aplicar a un empleo", async ({ page }) => {
  await page.goto(URL);
  const searchbox = page.getByRole("searchbox");
  await searchbox.fill("JavaScript");

  const searchButton = page.getByRole("button", { name: "Buscar" });
  await searchButton.click();
  const firstResult = page.getByRole("article").first();
  await expect(firstResult).toBeVisible();
  const firstJobLink = firstResult.getByRole("link").first();

  await firstJobLink.click();
  await expect(
    page.getByRole("heading", { name: "Descripción del puesto" }),
  ).toBeVisible();
  const loginButton = page.getByRole("button", {
    name: /iniciar sesión/i,
  });

  await loginButton.click();
  const applyButton = page.getByRole("button", {
    name: "Aplicar",
    exact: true,
  });

  await expect(applyButton).toBeVisible();

  await applyButton.click();
  await expect(
    page.getByRole("button", {
      name: "Aplicado",
      exact: true,
    }),
  ).toBeVisible();
});

test("filtra los empleos por ubicación remota", async ({ page }) => {
  await page.goto(`${URL}/search`);
  const locationFilter = page.locator("#filter-location");
  await locationFilter.selectOption("remoto");
  const remoteResults = page.locator('article[data-modalidad="remoto"]');
  const nonRemoteResults = page.locator(
    'article:not([data-modalidad="remoto"])',
  );
  await expect(remoteResults.first()).toBeVisible();
  await expect(nonRemoteResults).toHaveCount(0);
});

test("filtra los empleos por nivel senior", async ({ page }) => {
  await page.goto(`${URL}/search`);
  const levelFilter = page.locator("#filter-experience-level");
  const seniorResponse = page.waitForResponse((response) =>
    response.url().includes("level=senior"),
  );
  await levelFilter.selectOption("senior");
  await seniorResponse;
  await expect(page).toHaveURL(/level=senior/);
  const results = page.getByRole("article");
  const nonSeniorResults = page.locator('article:not([data-nivel="senior"])');
  await expect(results.first()).toBeVisible();
  await expect(nonSeniorResults).toHaveCount(0, {
    timeout: 10000,
  });
});

test("permite navegar a la siguiente página de resultados", async ({
  page,
}) => {
  const initialResponse = page.waitForResponse((response) =>
    response.url().includes("/api/jobs"),
  );
  await page.goto(`${URL}/search`);
  await initialResponse;
  const firstJob = page.getByRole("article").first();
  await expect(firstJob).toBeVisible();
  const firstJobHeading = firstJob.getByRole("heading");
  const firstTitle = await firstJobHeading.innerText();
  const nextPageLink = page.getByRole("link", {
    name: "Siguiente",
  });
  await expect(nextPageLink).toBeVisible();
  const nextPageResponse = page.waitForResponse((response) =>
    response.url().includes("offset=4"),
  );
  await nextPageLink.click();
  await nextPageResponse;
  await expect(page).toHaveURL(/page=2/);
  await expect(firstJobHeading).not.toHaveText(firstTitle);
});

test("muestra el detalle de un empleo y permite aplicar", async ({ page }) => {
  await page.goto(`${URL}/search`);
  const firstJob = page.getByRole("article").first();
  await expect(firstJob).toBeVisible();
  const firstJobLink = firstJob.getByRole("link").first();
  await firstJobLink.click();
  const detailHeading = page.getByRole("heading", {
    name: "Descripción del puesto",
  });
  await expect(detailHeading).toBeVisible();
  const loginButton = page.getByRole("button", {
    name: /iniciar sesión/i,
  });
  await loginButton.click();
  const applyButton = page.getByRole("button", {
    name: "Aplicar",
    exact: true,
  });
  await expect(applyButton).toBeVisible();
  await applyButton.click();
  await expect(
    page.getByRole("button", {
      name: "Aplicado",
      exact: true,
    }),
  ).toBeVisible();
});
