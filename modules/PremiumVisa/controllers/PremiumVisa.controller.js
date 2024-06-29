const PremiumVisaModel = require("../models/PremiumVisa");

const createPremiumVisa = async (req, res, next) => {
  try {
    console.log("here is the createAccount", req.body);
    const newVisaAccount = new PremiumVisaModel(req.body);
    await newVisaAccount.save();
    return res.status(200).json(newVisaAccount);
  } catch (error) {
    next(next);
  }
};

const ListPremiumVisa = async (req, res, next) => {
  try {
    const visaAccounts = await PremiumVisaModel.find();
    return res.status(200).json({ visaAccounts });
  } catch (error) {
    next(error);
  }
};

const GetPremiumVisa = async (req, res, next) => {
  try {
    const { premiumvisaId } = req.params;
    const visaAccount = await PremiumVisaModel.findById(premiumvisaId);
    return res.status(200).json({ visaAccount });
  } catch (error) {
    next(error);
  }
};

const UpdatePremiumVisa = async (req, res, next) => {
  try {
    const { premiumvisaId } = req.params;
    const { noOfApplicant, jurisdiction, incomeRevenue } = req.body;
    let visaAccount = await PremiumVisaModel.findById(premiumvisaId);
    if (!visaAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (noOfApplicant) {
      visaAccount.noOfApplicant = noOfApplicant;
    }
    if (jurisdiction) {
      visaAccount.jurisdiction = jurisdiction;
    }
    if (incomeRevenue) {
      visaAccount.incomeRevenue = incomeRevenue;
    }

    await visaAccount.save();
    return res.status(200).json({ visaAccount });
  } catch (error) {
    next(error);
  }
};

const DeletePremiumVisa = async (req, res, next) => {
  try {
    const { premiumvisaId } = req.params;
    const visaAccount = await PremiumVisaModel.findById(premiumvisaId);
    if (!visaAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    await PremiumVisaModel.deleteOne({ _id: premiumvisaId });
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPremiumVisa,
  ListPremiumVisa,
  GetPremiumVisa,
  DeletePremiumVisa,
  UpdatePremiumVisa,
};
