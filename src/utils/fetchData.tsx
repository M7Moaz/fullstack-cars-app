export const fetchBrands = async (categ: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/${categ}?timestamp=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  const brandData = data;

  return brandData;
};

export const fetchFilteredCars = async (
  query: string,
  { page, limit }: { page?: string; limit?: string }
) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/cars/filter?page=${page}&limit=${limit}&${query}&_=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();

  return data;
};

export const fetchCars = async () => {
  const timestamp = new Date().getTime();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/cars?timestamp=${timestamp}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();

  return data;
};

export const fetchNewCars = async () => {
  const timestamp = new Date().getTime();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/cars/new?timestamp=${timestamp}`
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  const carsData = data;

  return carsData;
};

export const carsPagination = async ({
  page = "1",
  limit = "9",
}: {
  page: string;
  limit: string;
}) => {
  const timestamp = new Date().getTime();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/cars?timestamp=${timestamp}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();

  return data;
};

export const fetchCarById = async ({ id }: { id: string }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/cars/${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  const carData = data;

  return carData;
};

export const deleteCar = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const deleted = await res.json();

  return deleted;
};

export const deleteBrand = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/deleteBrand/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const deleted = await res.json();

  return deleted;
};

export const updateCar = async (id: string, updatedData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const updated = await res.json();

  return updated;
};

export const updateBrand = async (id: string, updatedData: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/updateBrand/${id}`,
    {
      method: "PATCH",
      body: updatedData,
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const updated = await res.json();

  return updated;
};

export const addBrand = async (brandData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addBrand`, {
    method: "POST",
    body: brandData,
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const brand = await res.json();

  return brand;
};

export const validateLogin = async (user: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validateLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  const validate = await res.json();

  return validate;
};

export const addCar = async (carData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addCar`, {
    method: "POST",
    body: carData,
  });

  const added = await res.json();

  return added;
};

export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const logged = await res.json();

  return logged;
};
