import mongoose from "mongoose";
// import Transaction from './transactionSchema';
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }
    },
    accessToken: {
      type: String,
      default: null
    },
    refreshToken: {
      type: String,
      default: null
    },
    sid: {
      type: String,
      default: null
    },
    balance: {
      type: Number,
      default: 0
    },
    allIncome: {
      type: Number,
      default: 0
    },
    allExpense: {
      type: Number,
      default: 0
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction"
      }
    ]
  },
  {
    versionKey: false
  }
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema, "users");

export default User;
