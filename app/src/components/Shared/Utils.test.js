const { verifyName, printDate, queryBuilder } = require("./Utils.js")

describe("verifyName", () => {
  it("When person's first name and last name is non-sense", () => {
    expect(verifyName("1232141 123123")).toBe("");
  });

  it("When person's first name and last name is good", () => {
    expect(verifyName("John Doe")).toBe("John Doe");
  });
});

test("printDate", () => {
  expect(printDate(new Date(2010,1,1))).toBe("2/1/2010")
});

test("queryBuilder", () => {
  expect(queryBuilder('test.com?').param('a').val('b').getUrl()).toBe("test.com?a=b");
  expect(queryBuilder('test.com?').param('a').val('b').param('c').val('d').getUrl()).toBe("test.com?a=b&c=d");
});

