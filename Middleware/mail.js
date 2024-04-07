const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
       user: "boodyahmed825@gmail.com",
       pass:""
    },
});
  


async function confirmSignUp(email,name){
    let mailOptions = {
        from: "boodyahmed825@gmail.com",
        to:email,
        subject:"Sign up successfully",
        text: `Hello ${name}, \n\n Welcome to our platform! You have successfully signed up.  `
     }
     try {
        const info = await transporter.sendMail(mailOptions);
        // console.log({ message: 'Signup successful. Welcome email sent.' });
        return "succeeded";
      } catch (error) {
        // console.log({ error: 'Error sending welcome email.' ,error});
        return "error";
      }
}


module.exports = {
    confirmSignUp
}