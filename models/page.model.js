import { model, Schema } from "mongoose";

// Page schema
const pageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure unique page names
    },
    sections: [
      {
        type: Schema.Types.ObjectId, // Reference to section IDs
        ref: "ManasSectionSchema", // Reference to the common model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PageModel = model("ManasPage", pageSchema);

export default PageModel;
