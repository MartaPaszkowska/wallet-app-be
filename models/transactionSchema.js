import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Set description of transaction'],
    },
    category: {
      type: String,
      enum: [
        'Products',
        'Alcohol',
        'Entertainment',
        'Health',
        'Transport',
        'Housing',
        'Technique',
        'Communal, Communication',
        'Sports, Hobbies',
        'Education',
        'Other',
        'Salary',
        'Bonus',
      ],
      required: [true, 'Set category of transaction'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Set amount of transaction'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    date: {
      type: Date,
      default: Date.now,
      validate: {
        validator: (value) => !isNaN(new Date(value).getTime()),
        message: 'Invalid date format',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User ID is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model('transaction', transactionSchema, 'transactions');

export default Transaction;
