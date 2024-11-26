const { mockRequest, mockResponse } = require('mock-req-res');
const productController = require('../../../controllers/productController');
const Product = require('../../../models/products/Product');
jest.mock('../../../models/products/Product'); // Use the same path as the import

describe('Product Controller Tests', () => {
  // Test for getAllProducts
  it('should get all products', async () => {
    const mockRes = mockResponse();
    mockRes.json = jest.fn(); // Mocking json method

    const mockReq = mockRequest();

    // Mock Product.findAll to return a sample product array
    Product.findAll.mockResolvedValue([{ id: 1, name: 'Test Product' }]);

    // Add mock for status to ensure it's correctly tracked
    mockRes.status = jest.fn().mockReturnValue(mockRes); // Mock status method to return mockRes

    await productController.getAllProducts(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith([{ id: 1, name: 'Test Product' }]);
    expect(mockRes.status).toHaveBeenCalledWith(200); // Expect status to have been called with 200
  });

  // Test for createProduct
  it('should create a new product', async () => {
    const mockRes = mockResponse();
    mockRes.json = jest.fn(); // Mocking json method

    const mockReq = mockRequest({
      body: {
        name: 'New Product',
        description: 'Test description',
        price: 20,
        category: 'Electronics',
        stock_quantity: 10,
        available: true,
        images: ['image1.jpg'],
      },
    });

    // Mock Product.create to simulate creating a product
    Product.create.mockResolvedValue({
      id: 1,
      name: 'New Product',
      description: 'Test description',
      price: 20,
      category: 'Electronics',
      stock_quantity: 10,
      available: true,
      image_url: ['image1.jpg'],
    });

    // Mock status to return mockRes
    mockRes.status = jest.fn().mockReturnValue(mockRes);

    await productController.createProduct(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201); // Expect status to have been called with 201
    expect(mockRes.json).toHaveBeenCalledWith({
      id: 1,
      name: 'New Product',
      description: 'Test description',
      price: 20,
      category: 'Electronics',
      stock_quantity: 10,
      available: true,
      image_url: ['image1.jpg'],
    });
  });

  // Test for deleteProductById
  it('should delete a product and its images', async () => {
    const mockRes = mockResponse();
    mockRes.json = jest.fn(); // Mocking json method

    const mockReq = mockRequest({
      params: { id: 1 },
    });

    // Mock Product.findByPk to return a product
    Product.findByPk.mockResolvedValue({
      id: 1,
      name: 'Test Product',
      image_url: ['image1.jpg', 'image2.jpg'],
    });

    // Mock Product.destroy to simulate deleting the product
    Product.destroy.mockResolvedValue(1);

    // Mock status to return mockRes
    mockRes.status = jest.fn().mockReturnValue(mockRes);

    await productController.deleteProductById(mockReq, mockRes);

    expect(Product.findByPk).toHaveBeenCalledWith(1);
    expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRes.status).toHaveBeenCalledWith(200); // Expect status to have been called with 200
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Product and associated images deleted successfully',
    });
  });

  // Optional: Add cleanup if necessary
  afterAll(() => {
    // Close any database connections or clean up resources
  });
});