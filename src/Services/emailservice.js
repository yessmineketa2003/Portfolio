import emailjs from "@emailjs/browser";

export const sendEmail = async (formData) => {
  try {
    await emailjs.send(
      "service_avrug5f",
      "template_vgf7e5c",
      formData,
      "KzAxD99GerzKVcdoK"
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
