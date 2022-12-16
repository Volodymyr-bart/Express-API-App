const express = require("express");

const router = express.Router();
const { BadRequest, NotFound, InternalServerError } = require("http-errors");

const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    throw new InternalServerError(`Server Error`);
    // next(error);
    // res.status(500).json({ status: "error", code: 500, message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      // const erorr = new Error(`Contact with id=${contactId} not found`);
      // erorr.status = 404;
      // throw createError(404, `Contact with id=${contactId} not found`);
      throw new NotFound(`Contact with id=${contactId} not found`);
      // res.status(404).json({ status: "error", code: 404, message: "Error" });
      // return;
    }
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    throw new InternalServerError(`Server Error`);
    // next(error);
    // res.status(500).json({ status: "error", code: 500, message: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    // contactSchema;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest("Missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    throw new InternalServerError(`Server Error`);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result }, message: "product delete" });
  } catch (error) {
    throw new InternalServerError(`Server Error`);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest("Invalid date");
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    throw new InternalServerError(`Server Error`);
  }
});

module.exports = router;
