import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../../models/hotels"
import { verifyRole } from "../../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../../interfaces/types";
import { mockCloudinaryUpload } from "../../utils/mockServices";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const useMockCloudinary = process.env.MOCK_CLOUDINARY === 'true';

    if (useMockCloudinary) {
        const mockUrls = imageFiles.map(mockCloudinaryUpload);
        return mockUrls.map(m => m.url);
    }

    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

router.post("/add-hotel", verifyRole("admin"),
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("Price per night is required and must be a number"),
        body("facilities")
            .notEmpty()
            .isArray()
            .withMessage("Facilities are required")
    ],
    upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const imageUrls = await uploadImages(imageFiles);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.adminId = req.id as string;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/get-my-hotels", verifyRole("admin"), async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ adminId: req.id });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});

router.get("/get-hotel-by-id/:id", verifyRole("admin"), async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
        _id: id,
        adminId: req.id,
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});

router.put("/update-hotel-by-id/:hotelId", verifyRole("admin"), upload.array("imageFiles"), async (req: Request, res: Response) => {
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.hotelId,
                adminId: req.id,
            },
            updatedHotel,
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];

        await hotel.save();
        res.status(201).json(hotel);

        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

export default router;