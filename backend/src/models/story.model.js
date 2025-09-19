import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      image: String,
      text: String,
    },
    viewers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    // Just define the expiresAt field without the TTL here
    expiresAt: {
      type: Date,
      default: Date.now,
      // Remove the expires property from here
    },
  },
  { timestamps: true }
);

// Create TTL index for automatic deletion
storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // This line remains

const Story = mongoose.model("Story", storySchema);
export default Story;