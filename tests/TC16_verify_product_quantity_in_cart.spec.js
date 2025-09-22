import { test, expect } from "@playwright/test";

test.describe("Verify product quantity in Cart", () => {
  test("should add product with specific quantity and verify in cart", async ({ page }) => {
    await page.goto("http://automationexercise.com");
    await expect(page.locator("body")).toBeVisible();
    const firstProduct = page.locator(".features_items .product-image-wrapper").first();
    await firstProduct.locator("a[href*='product_details']").click();
    await expect(page.locator(".product-information")).toBeVisible();
    const quantityInput = page.locator("input#quantity");
    await quantityInput.fill("4");
    await page.locator("button:has-text('Add to cart')").click();
    const viewCartButton = page.locator("u:has-text('View Cart')");
    await expect(viewCartButton).toBeVisible();
    await viewCartButton.click();
    const cartRow = page.locator("tr:has-text('Blue Top'), tr.cart_item").first();
    const cartQuantity = cartRow.locator("td button, td input");
    await expect(cartQuantity).toHaveText("4").catch(async () => {
      await expect(cartQuantity).toHaveValue("4");
    });
  });
});
