const request = require("supertest");
const app = require("../index");
const { donationRepository } = require("../repository/donationRepository");
jest.mock("../repository/donationRepository");
describe("GET /api/donations", () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });
  it("should return all users", async () => {
    const mockDonations = [
      {
        _id: "65bbabfe6b59d73d91719e67",
        id: 1,
        donor: {
          name: "Donor 1",
          email: "donor1@example.com",
        },
        amount: 60,
        date: "2022-01-31T12:30:00.000Z",
        status: "Received",
      },
      {
        _id: "65bbabfe6b59d73d91719e68",
        id: 2,
        donor: {
          name: "Donor 2",
          email: "donor2@example.com",
        },
        amount: 50,
        date: "2022-02-01T15:45:00Z",
        status: "Pending",
      },
    ];
    donationRepository.getDonations.mockResolvedValue(mockDonations);
    const res = await request(app).get("/api/donations");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(mockDonations);
  });
  it("should return 404 when no donations found", async () => {
    donationRepository.getDonations.mockResolvedValue([]);
    const res = await request(app).get("/api/donations");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Donations not found" });
  });
  it("should return 500 when error occurs", async () => {
    donationRepository.getDonations.mockRejectedValue(
      new Error("Internal server error")
    );
    const res = await request(app).get("/api/donations");
    expect(res.status).toEqual(500);
  });
});
describe("GET /api/donations/:id", () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });
  it("should return a donation by id", async () => {
    const mockDonation = [
      {
        _id: "65bbabfe6b59d73d91719e67",
        id: 1,
        donor: {
          name: "Donor 1",
          email: "donor1@example.com",
        },
        amount: 60,
        date: "2022-01-31T12:30:00.000Z",
        status: "Received",
      },
    ];
    donationRepository.getDonationbyId.mockResolvedValue(mockDonation);
    const res = await request(app).get("/api/donations/1");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(mockDonation);
  });
  it("should return 404 when no donations dound", async () => {
    const mockDonation = [];
    donationRepository.getDonationbyId.mockResolvedValue(mockDonation);
    const res = await request(app).get("/api/donations/6");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Donation not found" });
  });
  it("should return 400 when id not provided", async () => {
    const res = await request(app).get("/api/donations/id");
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: "Invalid id" });
  });
  it("should return 500 when error occurs", async () => {
    donationRepository.getDonationbyId.mockRejectedValue(
      new Error("Internal server error")
    );
    const res = await request(app).get("/api/donations/1");
    expect(res.status).toEqual(500);
  });
});
describe("POST /api/donations", () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });
  it("should create a new donation", async () => {
    const mockDonation = [
      {
        id: 5,
        donor: {
          name: "Donor 1",
          email: "donor1@example.com",
        },
        amount: 60,
        date: "2022-01-31T12:30:00.000Z",
        status: "Received",
      },
    ];
    const res = await request(app).post("/api/donations").send(mockDonation[0]);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Donation created successfully" });
  });
  it("should return 400 when missing attributes", async () => {
    const mockDonation = [
      {
        id: 5,
        donor: {
          name: "Donor 1",
          email: "donor1@example.com",
        },
        amount: 60,
        date: "2022-01-31T12:30:00.000Z",
      },
    ];
    const res = await request(app).post("/api/donations").send(mockDonation[0]);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      {
        message: '"status" is required',
        path: ["status"],
        type: "any.required",
        context: {
          label: "status",
          key: "status",
        },
      },
    ]);
  });
  it("should return 400 when empty request", async () => {
    const mockDonation = [];
    const res = await request(app).post("/api/donations").send(mockDonation[0]);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      {
        message: '"id" is required',
        path: ["id"],
        type: "any.required",
        context: {
          label: "id",
          key: "id",
        },
      },
    ]);
  });
  it("should return 500 when error occurs", async () => {
    const mockDonation = [
      {
        id: 5,
        donor: {
          name: "Donor 1",
          email: "donor1@example.com",
        },
        amount: 60,
        date: "2022-01-31T12:30:00.000Z",
        status: "Received",
      },
    ];
    donationRepository.createDonation.mockRejectedValue(
      new Error("Internal server error")
    );
    const res = await request(app).post("/api/donations").send(mockDonation[0]);
    expect(res.status).toEqual(500);
  });
});
describe("PUT /api/donations/:id", () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });
  it("should update a donation", async () => {
    const mockDonation = [
      {
        _id: "65bbabfe6b59d73d91719e67",
        id: 1,
        donor: {
          name: "Donor 1",
          email: "donor1@example.com",
        },
        amount: 50,
        date: "2022-01-31T12:30:00.000Z",
        status: "Received",
      },
    ];
    const mockUpdate = [
      {
        amount: 50,
      },
    ];
    donationRepository.updateDonation.mockResolvedValue(mockDonation);
    const res = await request(app).put("/api/donations/1").send(mockUpdate[0]);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Donation updated successfully" });
  });
  it("should return 400 when field not exist", async () => {
    const mockUpdate = [
      {
        img: "string",
      },
    ];

    const res = await request(app).put("/api/donations/1").send(mockUpdate[0]);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      {
        message: '"img" is not allowed',
        path: ["img"],
        type: "object.unknown",
        context: {
          child: "img",
          label: "img",
          value: "string",
          key: "img",
        },
      },
    ]);
  });
  it("should return 404 when donation not found", async () => {
    const mockUpdate = [];

    donationRepository.updateDonation.mockResolvedValue(mockUpdate);
    const res = await request(app).put("/api/donations/1");

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Donation not found" });
  });
  it("should return 400 when id not provided", async () => {
    const res = await request(app).put("/api/donations/id");

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: "Invalid id" });
  });
  it("should return 500 when error occurs", async () => {
    donationRepository.updateDonation.mockRejectedValue(
      new Error("Internal server error")
    );
    const res = await request(app).put("/api/donations/1");
    expect(res.status).toEqual(500);
  });
});
describe("DELETE /api/donations/:id", () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });
  it("should delete a donation", async () => {
    const mockDonation = [
      {
        _id: "65bbabfe6b59d73d91719e69",
        id: 3,
        donor: {
          name: "Donor 3",
          email: "donor3@example.com",
        },
        amount: 200,
        date: "2022-02-02T09:00:00Z",
        status: "Received",
      },
    ];
    donationRepository.deleteDonaotion.mockResolvedValue(mockDonation);
    const res = await request(app).delete("/api/donations/3");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Donation deleted successfully" });
  });
  it("should return 404 when donation not found", async () => {
    const mockDonation = [];
    donationRepository.deleteDonaotion.mockResolvedValue(mockDonation);
    const res = await request(app).delete("/api/donations/4");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ message: "Donation not found" });
  });
  it("should return 400 when id not provided", async () => {
    const res = await request(app).delete("/api/donations/id");
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: "Invalid id" });
  });
  it("should return 500 when error occurs", async () => {
    donationRepository.deleteDonaotion.mockRejectedValue(
      new Error("Internal server error")
    );
    const res = await request(app).delete("/api/donations/1");
    expect(res.status).toEqual(500);
  });
});
