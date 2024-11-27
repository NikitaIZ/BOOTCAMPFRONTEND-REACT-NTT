import { categoriesResponseMock } from "@/app/proxy/__mocks__/categories";
import { categoriesRequest } from "../categories-request";

const mockFetch = (data: unknown, status = 200, ok = true): jest.Mock => {
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

describe("Categories Request", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("should get categories", async () => {
    mockFetch(categoriesResponseMock);
    const response = await categoriesRequest.getCategories();
    expect(response).toEqual(categoriesResponseMock);
  });

  it("should handle network error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    try {
      await categoriesRequest.getCategories();
    } catch (error) {
      expect(error).toEqual(new Error("Network error"));
    }
  });

  it("should handle non-ok response status", async () => {
    mockFetch(null, 404, false);

    try {
      await categoriesRequest.getCategories();
    } catch (error) {
      expect(error).toEqual(new Error("Could not get list of categories"));
    }
  });

  it("should handle unknown error type", async () => {
    const nonErrorObject = { message: "Unexpected error" };
    global.fetch = jest.fn().mockRejectedValueOnce(nonErrorObject);

    try {
      await categoriesRequest.getCategories();
    } catch (error) {
      expect(error).toEqual(new Error("Categories network error"));
    }
  });
});
