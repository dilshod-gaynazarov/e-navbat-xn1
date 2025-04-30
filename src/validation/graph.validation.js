import Joi from 'joi';

export const graphValidator = (data) => {
  const graph = Joi.object({
    date: Joi.date().required(),
    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required(),
    status: Joi.string().valid('busy', 'empty').required(),
    doctorId: Joi.string().required(),
  });
  return graph.validate(data);
};
