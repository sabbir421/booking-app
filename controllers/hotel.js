import hotel from "../models/hotel";

export const createHotels = async (req, res) => {
  const newdHotel = new hotel(req.body);

  try {
    const savedHotel = await newdHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).res(error);
  }
};

export const updateHotel = async (req, res) => {
  const updateHotel = async (req, res, next) => {
    try {
      const updatedHotel = hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (error) {
      next(error);
    }
  };
};

export const deleteHotel = async (req, res, next) => {
  try {
    hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel deleted");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await hotel
      .find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotel.countDocuments({ type: "apartment" });
    const resortCount = await hotel.countDocuments({ type: "resort" });
    const villaCount = await hotel.countDocuments({ type: "villa" });
    const cabinCount = await hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
