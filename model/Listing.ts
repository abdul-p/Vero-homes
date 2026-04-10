import mongoose, {Schema, Document, Model} from "mongoose";


export interface IListing extends Document {
    title: string;
    description: string;
    type: "sale" | "rent" | "shortlet" | "land";
    price : number;
    location : {
        city: string;
        address: string;
        coordinates: {
            lat : number ;
            lng: number ;
        };
    };
    bedrooms?: number;
    bathrooms?: number;
    images: string[];
    agent: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
    updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      enum: ["sale", "rent", "shortlet", "land"],
      required: [true, "Listing type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        enum: ["Lagos", "Abuja", "Port Harcourt"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    images: {
      type: [String],
      default: [],
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Listing: Model<IListing> =
  mongoose.models.Listing ||
  mongoose.model<IListing>("Listing", ListingSchema);

export default Listing;