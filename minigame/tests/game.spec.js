// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("the board has 9 squares", async ({ page }) => {
    const squares = page.locator(".square");
    await expect(squares).toHaveCount(9);
});

async function playMoves(page, moves) {
    const squares = page.locator(".square");
    for (const [index, player] of moves) {
        await squares.nth(index).click(player === "O" ? { button: "right" } : {});
    }
}

test("players take turns", async ({ page }) => {
    const squares = page.locator(".square");

    await squares.nth(0).click();
    await expect(squares.nth(0)).toHaveText("X");

    await squares.nth(1).click();
    await expect(squares.nth(1)).toHaveText("");

    await squares.nth(1).click({ button: "right" });
    await expect(squares.nth(1)).toHaveText("O");
});

test("an occupied square cannot be changed or consume a turn", async ({ page }) => {
    const squares = page.locator(".square");

    await squares.nth(0).click();
    await squares.nth(1).click({ button: "right" });
    await squares.nth(0).click();

    await expect(squares.nth(0)).toHaveText("X");
    await squares.nth(2).click();
    await expect(squares.nth(2)).toHaveText("X");
});

test("the last played square is highlighted", async ({ page }) => {
    const squares = page.locator(".square");

    await squares.nth(4).click();
    await expect(squares.nth(4)).toHaveClass(/lastcell/);

    await squares.nth(0).click({ button: "right" });
    await expect(squares.nth(4)).not.toHaveClass(/lastcell/);
    await expect(squares.nth(0)).toHaveClass(/lastcell/);
});

test("a winning line shows the winner and prevents further moves", async ({ page }) => {
    const squares = page.locator(".square");

    await playMoves(page, [
        [0, "X"],
        [3, "O"],
        [1, "X"],
        [4, "O"],
        [2, "X"],
    ]);

    await expect(page.locator(".result")).toHaveText(/X nyert/);
    await squares.nth(5).click({ button: "right" });
    await expect(squares.nth(5)).toHaveText("");
});

test("a full board without a winning line shows a draw", async ({ page }) => {
    await playMoves(page, [
        [0, "X"],
        [1, "O"],
        [2, "X"],
        [4, "O"],
        [3, "X"],
        [5, "O"],
        [7, "X"],
        [6, "O"],
        [8, "X"],
    ]);

    await expect(page.locator(".result")).toHaveText("Döntetlen, nincs nyertes!");
});

test("reset clears the board, result, and last-square highlight", async ({ page }) => {
    const squares = page.locator(".square");
    await playMoves(page, [
        [0, "X"],
        [3, "O"],
        [1, "X"],
        [4, "O"],
        [2, "X"],
    ]);

    await page.getByRole("button", { name: "Visszaállítás" }).click();

    await expect(squares).toHaveCount(9);
    for (const square of await squares.all()) {
        await expect(square).toHaveText("");
        await expect(square).not.toHaveClass(/lastcell/);
    }
    await expect(page.locator(".result")).toHaveCount(0);

    await squares.nth(0).click();
    await expect(squares.nth(0)).toHaveText("X");
});
