require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Cars = require("./models/Cars");
const Brands = require("./models/Brands");
const Users = require("./models/Users");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://fullstack-cars-app.vercel.app",
    credentials: true,
  })
);
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const time = new Date().getTime();
    const rand = Math.floor(Math.random() * time);
    const filename = `${time}_${rand}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

const carUploadLogic = upload.array("images", 10);

const uploadLogic = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

// app.use("/uploads", express.static(path.join(__dirname, "uploads/")));

// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-store");
//   next();
// });

const url = process.env.DB_URL;
const main = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
main();

const getFilteredCars = async (req, res) => {
  const {
    brand,
    model,
    year,
    price,
    transmission,
    engine,
    location,
    fuelType,
    bodyType,
    page,
    limit,
    hasOffer,
  } = req.query;

  const skip = (page - 1) * limit;
  let query = {};
  let sort = {};

  if (brand) query.brand = brand;
  if (year) query.year = year;
  if (model) query.model = model;
  if (transmission) query.transmission = transmission;
  if (engine) query.engine = engine;
  if (location) query.location = location;
  if (fuelType) query.fuelType = fuelType;
  if (bodyType) query.bodyType = bodyType;
  if (hasOffer) query.hasOffer = hasOffer;

  if (price === "min") {
    sort.price = 1;
  } else if (price === "max") {
    sort.price = -1;
  }

  try {
    const cars = await Cars.find(query, { __v: false })
      .limit(limit)
      .skip(skip)
      .sort(sort);
    res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.get("/cars/filter", getFilteredCars);

const getNewCars = async (req, res) => {
  try {
    const newCars = await Cars.find(
      { year: { $gte: 2023 } },
      { __v: false }
    ).sort({ year: -1 });

    res.status(200).json(newCars);
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
};
app.get("/cars/new", getNewCars);

const deleteCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Cars.findById(id);

    if (car.images) {
      for (let i = 0; i < car.images.length; i++) {
        const imgPath = path.join(
          __dirname,
          "uploads",
          path.basename(car.images[i].url)
        );
        fs.unlink(imgPath, (err) => {
          if (err) {
            console.error("Failed to delete images:", err);
          }
        });
      }
    }

    const deleted = await Cars.deleteOne({ _id: id });

    res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
};
app.delete("/delete/:id", deleteCarById);

const getCars = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const cars = await Cars.find({}, { __v: false })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
};
app.get("/cars", getCars);

const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Cars.findById({ _id: id }, { __v: false });

    res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
};
app.get("/cars/:id", getCarById);

const getBrands = async (req, res) => {
  try {
    const brands = await Brands.find({}, { __v: false });

    res.status(200).json(brands);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.get("/brands", getBrands);

const updateCar = async (req, res) => {
  try {
    const car = await Cars.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: 200, car });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.patch("/update/:id", updateCar);

const addCar = async (req, res) => {
  try {
    const {
      title,
      brand,
      model,
      year,
      colors,
      rate,
      price,
      category,
      mileage,
      engine,
      transmission,
      location,
    } = req.body;

    const carData = {
      title,
      brand,
      model,
      year: Number(year),
      colors: Number(colors),
      rate: Number(rate),
      price: Number(price),
      category,
      mileage: Number(mileage),
      engine,
      transmission,
      location,
    };

    const car = await Cars(carData);

    if (req.files) {
      const images = req.files.map((file) => ({
        url: file.path.replace(/\\/g, "/").replace("", ""),
      }));

      car.images = images;
    }

    await car.save();

    res.status(200).json({ status: 200, car });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.post("/addCar", carUploadLogic, addCar);

const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brands.findById(id);
    if (!brand) {
      return res.status(404).json({ status: 404, message: "Brand not found" });
    }

    if (brand.logo) {
      const logoPath = path.join(
        __dirname,
        "uploads",
        path.basename(brand.logo)
      );
      fs.unlink(logoPath, (err) => {
        if (err) {
          console.error("Failed to delete logo:", err);
        }
      });
    }

    if (brand.image) {
      const imagePath = path.join(
        __dirname,
        "uploads",
        path.basename(brand.image)
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    await Brands.deleteOne({ _id: id });
    res.status(200).json({ status: 200, brand });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};
app.delete("/deleteBrand/:id", deleteBrand);

const updateBrand = async (req, res) => {
  try {
    const brand = await Brands.findById(req.params.id);

    if (req.files["logo"]) {
      if (brand.logo) {
        const logoPath = path.join(
          __dirname,
          "uploads",
          path.basename(brand.logo)
        );
        fs.unlink(logoPath, (err) => {
          if (err) {
            console.error("Failed to delete previous logo:", err);
          }
        });
      }
      brand.logo = req.files["logo"][0].path.replace(/\\/g, "/");
    }
    if (req.files["image"]) {
      if (brand.image) {
        const imagePath = path.join(
          __dirname,
          "uploads",
          path.basename(brand.image)
        );
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Failed to delete previous image:", err);
          }
        });
      }
      brand.image = req.files["image"][0].path.replace(/\\/g, "/");
    }
    if (req.body.title) {
      brand.title = req.body.title;
    }

    await brand.save();

    res.status(200).json({ status: 200, brand });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

app.patch("/updateBrand/:id", uploadLogic, updateBrand);

const addBrand = async (req, res) => {
  try {
    const brand = await Brands(req.body);

    if (req.files["logo"]) {
      brand.logo = req.files["logo"][0].path.replace(/\\/g, "/");
    }
    if (req.files["image"]) {
      brand.image = req.files["image"][0].path.replace(/\\/g, "/");
    }

    await brand.save();

    res.status(200).json({ status: 200, brand });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.post("/addBrand", uploadLogic, addBrand);

const addUser = async (req, res) => {
  // const { email, password } = req.body;
  try {
    console.log(req.body);
    const user = await Users(req.body);

    await user.save();

    res.status(200).json({ status: 200, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.post("/addUser", addUser);

const checkAuth = async (req, res, next) => {
  const authHeadr = req.headers.authorization;
  const token = authHeadr && authHeadr.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return res.json({ status: 200 });
  } catch (error) {
    // console.error("Token verification error:", error);
    return res.json({ status: 401 });
  }
};
app.post("/checkAuth", checkAuth);

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ status: 401, message: "Invalid email" });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ status: 401, message: "Uncorrect Passowrd" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=1800; SameSite=Strict`
    );

    return res.status(200).json({ status: 200, message: "Success" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
app.post("/validateLogin", validateLogin);

const logout = async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ status: 200, message: "Logged Out" });
};
app.post("/logout", logout);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});
