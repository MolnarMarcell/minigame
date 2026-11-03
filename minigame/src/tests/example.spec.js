import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.locator(".square").first().click();
    await page.locator("div:nth-child(2) > div:nth-child(2) > .square").click({
        button: "right",
    });
    await page.locator("div:nth-child(3) > div:nth-child(3) > .square").click();
    await page.locator("div:nth-child(3) > div:nth-child(2) > .square").click({
        button: "right",
    });
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).first().click({
        button: "right",
    });
    await page.getByText("Vége a játéknak! O nyert 🎉").click();
    await page.getByRole("button", { name: "Visszaállítás" }).click();
});
