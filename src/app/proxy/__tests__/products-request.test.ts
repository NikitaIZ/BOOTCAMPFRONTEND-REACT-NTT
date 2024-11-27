import { productsResponseMock } from "@/app/proxy/__mocks__/products";
import { productsRequest } from "../products-request";

const mockFetch = (data: any, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });

  global.fetch = fn;
  return fn;
};

describe("Products Request", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("should get products without filters", async () => {
    mockFetch(productsResponseMock);
    const response = await productsRequest.getProducts();
    expect(response.products).toHaveLength(productsResponseMock.products.length);
    expect(response.totalPages).toBe(1);
  });

  it("should get products filtered by search", async () => {
    mockFetch(productsResponseMock);
    const search = "Essence";
    const response = await productsRequest.getProducts(search);
    expect(response.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: expect.stringContaining(search) }),
      ])
    );
  });

  it("should get products filtered by category", async () => {
    const category = "beauty";
    mockFetch(productsResponseMock);
    const response = await productsRequest.getProducts("", 1, category);
    expect(response.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category }),
      ])
    );
  });

  it("should paginate products correctly", async () => {
    mockFetch(productsResponseMock);
    const page = 1;
    const response = await productsRequest.getProducts("", page);
    const productsPerPage = 9;
    expect(response.products).toHaveLength(
      Math.min(productsPerPage, productsResponseMock.products.length)
    );
  });

  it("should handle non-ok response status", async () => {
    mockFetch(null, 404, false);

    try {
      await productsRequest.getProducts();
    } catch (error) {
      expect(error).toEqual(new Error("Could not get list of products"));
    }
  });

  it("should handle network error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));
  
    try {
      await productsRequest.getProducts();
    } catch (error) {
      expect(error).toEqual(new Error("Products network error"));
    }
  });  
});
