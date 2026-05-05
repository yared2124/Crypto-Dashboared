import { Alert } from "../models/Alert.model.js";

export const createAlert = async (req, res, next) => {
  try {
    const { cryptoId, targetPrice, direction } = req.body;
    const alertId = await Alert.create(
      req.user.id,
      cryptoId,
      targetPrice,
      direction,
    );
    res.status(201).json({ alertId, message: "Alert created" });
  } catch (err) {
    next(err);
  }
};

export const getUserAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.findByUser(req.user.id);
    res.json(alerts);
  } catch (err) {
    next(err);
  }
};

export const deleteAlert = async (req, res, next) => {
  try {
    const deleted = await Alert.deleteById(req.params.alertId, req.user.id);
    if (!deleted) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert deleted" });
  } catch (err) {
    next(err);
  }
};
