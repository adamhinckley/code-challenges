/**
 * CODE CHALLENGE: Microservice Data Aggregation
 *
 * You have three microservices that provide different pieces of product information:
 * 1. Product Service - Basic product info (id, name, description)
 * 2. Pricing Service - Price information (productId, price, currency)
 * 3. Inventory Service - Stock information (productId, inStock, quantity)
 *
 * Your task: Create a function that fetches data from all three services
 * and combines them into a unified product dataset for the UI.
 *
 * Requirements:
 * - Handle missing data gracefully (some products might not have pricing/inventory)
 * - All API calls should happen in parallel for performance
 * - Return a normalized structure that's easy to consume in the UI
 * - Handle errors from individual services without failing the entire operation
 */

// ===== MOCK API RESPONSES (Don't modify these) =====

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface ProductPrice {
  productId: string;
  price: number;
  currency: string;
  discountPercent?: number;
}

interface ProductInventory {
  productId: string;
  inStock: boolean;
  quantity: number;
  warehouse: string;
}

// Mock API calls (simulating microservices)
const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    {
      id: "1",
      name: "Laptop",
      description: "High-performance laptop",
      category: "Electronics",
    },
    {
      id: "2",
      name: "Mouse",
      description: "Wireless mouse",
      category: "Electronics",
    },
    {
      id: "3",
      name: "Keyboard",
      description: "Mechanical keyboard",
      category: "Electronics",
    },
    {
      id: "4",
      name: "Monitor",
      description: "4K Monitor",
      category: "Electronics",
    },
  ];
};

const fetchPricing = async (): Promise<ProductPrice[]> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return [
    { productId: "1", price: 1299.99, currency: "USD", discountPercent: 10 },
    { productId: "2", price: 29.99, currency: "USD" },
    { productId: "3", price: 89.99, currency: "USD", discountPercent: 15 },
    // Note: Monitor (id: 4) is missing pricing data
  ];
};

const fetchInventory = async (): Promise<ProductInventory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return [
    { productId: "1", inStock: true, quantity: 45, warehouse: "West" },
    { productId: "2", inStock: true, quantity: 200, warehouse: "East" },
    // Note: Keyboard (id: 3) is missing inventory data
    { productId: "4", inStock: false, quantity: 0, warehouse: "Central" },
  ];
};

// ===== YOUR CODE HERE =====

interface EnrichedProduct {
  // Define the shape of your combined data structure
  // TODO: Add properties that combine all three data sources
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: ProductPrice;
  inventory: ProductInventory;
}

async function aggregateProductData(): Promise<EnrichedProduct[]> {
  // TODO: Implement the solution
  // 1. Fetch data from all three services in parallel
  // 2. Combine the data by matching productId
  // 3. Handle missing data appropriately
  // 4. Return enriched product array
  const [products, pricing, inventory] = await Promise.all([
    fetchProducts(),
    fetchPricing(),
    fetchInventory(),
  ]);

  // convert pricing and inventory into objects that can be accessed with bracket notation
  const pricingById = pricing.reduce(
    (acc, item) => {
      acc[item.productId] = item;
      return acc;
    },
    {} as Record<string, (typeof pricing)[0]>,
  );

  const inventoryById = inventory.reduce(
    (acc, item) => {
      acc[item.productId] = item;
      return acc;
    },
    {} as Record<string, (typeof inventory)[0]>,
  );

  // create a new array from the pridcuts array that includes the pricing and inventory daty
  return products.map((product) => ({
    ...product,
    pricing: pricingById[product.id] || null,
    inventory: inventoryById[product.id] || null,
  }));
}

// ===== TEST YOUR SOLUTION =====

async function testSolution() {
  try {
    const enrichedProducts = await aggregateProductData();
    console.log(
      "Enriched Products:",
      JSON.stringify(enrichedProducts, null, 2),
    );

    // Verify results
    console.assert(enrichedProducts.length === 4, "Should have 4 products");
    console.assert(
      enrichedProducts.every((p) => p.id && p.name),
      "All products should have id and name",
    );
    console.log("✅ All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Uncomment to run:
testSolution();
