const billingFormSchema = {
    accountNumber: { type: Number, required: true },
    billType: { type: String, required: true },
    serviceStartDate: { type: Date, required: true },
    serviceEndDate: { type: Date, required: true },
    billAmount: { type: Number, required: true },
    usageAmount: { type: Number, required: true },
    engineeringUnit: { type: String, required: true },
};

export default billingFormSchema;







// import mongoose from 'mongoose';

// let BillingFormModel;

// try {
//     BillingFormModel = mongoose.model('BillingForm');
// } catch (error) {
//     const billingFormSchema = new mongoose.Schema({
//         accountNumber: { type: Number, required: true },
//         billType: { type: String, required: true },
//         serviceStartDate: { type: Date, required: true },
//         serviceEndDate: { type: Date, required: true },
//         billAmount: { type: Number, required: true },
//         usageAmount: { type: Number, required: true },
//         engineeringUnit: { type: String, required: true },
//     });

//     BillingFormModel = mongoose.model('BillingForm', billingFormSchema);
// }

// export default BillingFormModel;
