import { expect, test } from "@playwright/test";

test("home page smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Data Science Kansas City/i);
  await expect(
    page.getByText("Connecting, Learning, and Growing Together in the Heart of America")
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Announcements" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Announcements" })).toBeVisible();
  await expect(page.getByRole("link", { name: /See all events on Meetup/i })).toBeVisible();
  await expect(page.locator('iframe[src*="youtube.com"]')).toBeAttached();
});

test("mobile nav opens, shows links, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByTestId("mobile-menu-button");
  const menuWrapper = page.getByTestId("mobile-menu-wrapper");

  await expect(menuWrapper).toHaveCSS("visibility", "hidden");
  await menuButton.click();

  await expect(menuWrapper).toHaveCSS("visibility", "visible");
  await expect(menuWrapper.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(menuWrapper.getByRole("link", { name: "Announcements" })).toBeVisible();

  await page.getByTestId("mobile-menu-close-button").click();
  await expect(menuWrapper).toHaveCSS("visibility", "hidden");
});

test("announcements index page loads", async ({ page }) => {
  await page.goto("/posts/");
  await expect(page).toHaveTitle(/Announcements/i);
  await expect(page.locator("main header h1")).toHaveText(/Announcements/i);
  await expect(
    page.getByRole("link", { name: /Call for Speakers: Startup Showcase \(May 14, 2026\)/i })
  ).toBeVisible();
});

test("home nav link from posts returns to home page", async ({ page }) => {
  await page.goto("/posts/");
  await page.getByRole("link", { name: "Home" }).first().click();
  await expect(page).toHaveURL("/");
});

test("2026-2027 event schedule post loads", async ({ page }) => {
  await page.goto("/posts/2026-08-21-save-the-dates-2026-2027/");
  await expect(page).toHaveTitle(/Save the Dates: Data Science KC's 2026-2027 Season/i);
  await expect(page.getByRole("heading", { name: "2026-2027 Tentative Schedule" })).toBeVisible();
  await expect(page.getByRole("link", { name: /RSVP for the September event/i })).toBeVisible();
});

test("call for speakers post loads", async ({ page }) => {
  await page.goto("/posts/2026-02-22-startup-showcase/");
  await expect(page).toHaveTitle(/Call for Speakers: Startup Showcase \(May 14, 2026\)/i);
  await expect(page.locator("main article header h1")).toContainText("Startup Showcase");
});

test("university showcase post loads", async ({ page }) => {
  await page.goto("/posts/2025-10-22-university-showcase/");
  await expect(page).toHaveTitle(/Call for Speakers: University Showcase \(Nov\. 13, 2025\)/i);
  await expect(page.getByRole("heading", { name: /About the University Showcase/i })).toBeVisible();
});
